import express from "express";
import { driver } from "./db.js";
import { assert, ethers } from "ethers";
import contractABI from "../../contracts/artifacts/contracts/ScholarGraph.sol/ScholarGraph.json" with{type : "json"};

const router = express.Router();

// === Setup Blockchain Connection ===
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // localhost:8545 or testnet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS, // set in .env
  contractABI.abi,
  wallet
);

// === Utility: Format Neo4j results ===
function formatResult(result) {
  return result.records.map(r => {
    let obj = {};
    r.keys.forEach((key, i) => {
      obj[key] = r._fields[i];
    });
    return obj;
  });
}

// === Get papers by author ===
router.get("/api/papers", async (req, res) => {
  const { author } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (a:Author {name: $author})-[:WROTE]->(p:Paper)
      OPTIONAL MATCH (p)-[:HAS_TOPIC]->(t:Topic)
      OPTIONAL MATCH (p)-[:USES]->(d:Dataset)
      RETURN p.title AS title, p.year AS year, p.doi AS doi, p.link AS link,
             collect(DISTINCT t.name) AS topics,
             collect(DISTINCT d.name) AS datasets
    `;
    const result = await session.run(query, { author });
    res.json(formatResult(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }  
});

// === Get papers by topic ===  
router.get("/api/papers/topic/:topic", async (req, res) => {  
  const { topic } = req.params;  
  const session = driver.session();  
  try {  
    const query = `  
      MATCH (p:Paper)-[:HAS_TOPIC]->(t:Topic {name: $topic})  
      RETURN p.title AS title, p.year AS year, p.doi AS doi, p.link AS link
    `; 
    const result = await session.run(query, { topic });  
    res.json(formatResult(result));  
  } catch (err) {  
    res.status(500).json({ error: err.message });  
  } finally {  
    await session.close();  
  }  
});

// === Get collaborations between institutions ===
router.get("/api/collaborations", async (req, res) => {  
  const session = driver.session();  
  try {  
    const query = `
      MATCH (i1:Institution)<-[:AFFILIATED_WITH]-(a1:Author)-[:WROTE]->(p:Paper)<-[:WROTE]-(a2:Author)-[:AFFILIATED_WITH]->(i2:Institution)
      WHERE i1 <> i2  
      RETURN DISTINCT i1.name AS institution1, i2.name AS institution2, p.title AS paper  
    `;  
    const result = await session.run(query);  
    res.json(formatResult(result));  
  } catch (err) {  
    res.status(500).json({ error: err.message });
  } finally {  
    await session.close();
  }  
});

// === Get datasets used in Blockchain papers ===
router.get("/api/datasets/blockchain", async (req, res) => { 
  const session = driver.session(); 
  try { 
    const query = `  
      MATCH (p:Paper)-[:HAS_TOPIC]->(t:Topic {name:"Blockchain"}), (p)-[:USES]->(d:Dataset)  
      RETURN DISTINCT p.title AS paper, d.name AS dataset, p.link AS link
    `; 
    const result = await session.run(query); 
    res.json(formatResult(result));
  } catch (err) { 
    res.status(500).json({ error: err.message });  
  } finally {  
    await session.close(); 
  }
});

// === Add new paper (Neo4j + Blockchain) ===
router.post("/api/papers", async (req, res) => {
  const { title, doi, year, author, institution, topic, dataset, link } = req.body;

  // Validate required fields
  if (!title || !doi || !year || !author || !institution || !topic) {
    return res.status(400).json({ error: "title, doi, year, author, institution, and topic are required" });
  }

  const session = driver.session();
  try {
    // Save to Neo4j
    const query = `
      MERGE (a:Author {name: $author})
      MERGE (i:Institution {name: $institution})
      MERGE (a)-[:AFFILIATED_WITH]->(i)
      MERGE (p:Paper {title: $title, doi: $doi, year: $year, link: $link})
      MERGE (a)-[:WROTE]->(p)
      MERGE (t:Topic {name: $topic})
      MERGE (p)-[:HAS_TOPIC]->(t)
      ${dataset ? "MERGE (d:Dataset {name: $dataset}) MERGE (p)-[:USES]->(d)" : ""}
      RETURN p.title AS title, p.doi AS doi, p.year AS year, p.link AS link
    `;
    const result = await session.run(query, {
      title,
      doi,
      year,
      author,
      institution,
      topic,
      dataset,
      link
    });

    // Log DOI hash to blockchain
    const doiHash = ethers.keccak256(ethers.toUtf8Bytes(doi));
    const tx = await contract.addPaper(doi, doiHash);
    await tx.wait();

    res.json({
      message: "Paper added to Neo4j + Blockchain ✅",
      paper: formatResult(result)[0],
      txHash: tx.hash,
      contractAddress: contract.target
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

export default router;

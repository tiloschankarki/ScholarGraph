import express from "express";
import { driver } from "./db.js";
import { ethers } from "ethers";
import contractABI from "../../contracts/artifacts/contracts/ScholarGraph.sol/ScholarGraph.json" with { type: "json" };

const router = express.Router();

// === Setup Blockchain Connection ===
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI.abi,
  wallet
);

// === Utility: Format Neo4j results ===
function formatResult(result) {
  return result.records.map((r) => {
    let obj = {};
    r.keys.forEach((key, i) => {
      obj[key] = r._fields[i];
    });
    return obj;
  });
}

// === Flexible search: Papers by Author ===
router.get("/api/papers", async (req, res) => {
  const { author } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (a:Author)-[:WROTE]->(p:Paper)
      WHERE toLower(a.name) CONTAINS toLower($author)
      OPTIONAL MATCH (p)-[:HAS_TOPIC]->(t:Topic)
      OPTIONAL MATCH (p)-[:USES]->(d:Dataset)
      OPTIONAL MATCH (p)-[:PUBLISHED_BY]->(pub:Publisher)
      RETURN p.title AS title, p.year AS year, p.doi AS doi, p.link AS link,
             collect(DISTINCT t.name) AS topics,
             collect(DISTINCT d.name) AS datasets,
             pub.name AS publisher
    `;
    const result = await session.run(query, { author });
    res.json(formatResult(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// === Get papers by "topic" (really searching titles for now) ===
router.get("/api/papers/topic/:topic", async (req, res) => {
    const { topic } = req.params;
    const session = driver.session();
    try {
      const query = `
        MATCH (p:Paper)
        WHERE toLower(p.title) CONTAINS toLower($topic)
        RETURN p.title AS title, p.year AS year, p.doi AS doi, p.link AS link
        LIMIT 50
      `;
      const result = await session.run(query, { topic });
      res.json(result.records.map(r => ({
        title: r.get("title"),
        year: r.get("year"),
        doi: r.get("doi"),
        link: r.get("link"),
      })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      await session.close();
    }
  });
  
  
  

// === Flexible search: Papers by Publisher ===
router.get("/api/papers/publisher/:publisher", async (req, res) => {
  const { publisher } = req.params;
  const session = driver.session();
  try {
    const query = `
      MATCH (p:Paper)-[:PUBLISHED_BY]->(pub:Publisher)
      WHERE toLower(pub.name) CONTAINS toLower($publisher)
      RETURN p.title AS title, p.year AS year, p.doi AS doi, p.link AS link,
             pub.name AS publisher
    `;
    const result = await session.run(query, { publisher });
    res.json(formatResult(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// === Collaborations between Institutions ===
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

// === Blockchain Dataset papers ===
router.get("/api/datasets/blockchain", async (req, res) => {
  const session = driver.session();
  try {
    const query = `
      MATCH (p:Paper)-[:HAS_TOPIC]->(t:Topic)
      WHERE toLower(t.name) = "blockchain"
      MATCH (p)-[:USES]->(d:Dataset)
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

// === Autocomplete: Authors ===
router.get("/api/suggest/authors", async (req, res) => {
  const { q } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (a:Author)
      WHERE toLower(a.name) CONTAINS toLower($q)
      RETURN DISTINCT a.name AS author
      LIMIT 10
    `;
    const result = await session.run(query, { q });
    res.json(result.records.map((r) => r.get("author")));
  } catch (err) {
    console.error("❌ Error in /api/suggest/authors:", err)
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// === Autocomplete: Topics ===
router.get("/api/suggest/topics", async (req, res) => {
  const { q } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (t:Topic)
      WHERE toLower(t.name) CONTAINS toLower($q)
      RETURN DISTINCT t.name AS topic
      LIMIT 10
    `;
    const result = await session.run(query, { q });
    res.json(result.records.map((r) => r.get("topic")));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});


// === Autocomplete: Publishers ===
router.get("/api/suggest/publishers", async (req, res) => {
  const { q } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (pub:Publisher)
      WHERE toLower(pub.name) CONTAINS toLower($q)
      RETURN DISTINCT pub.name AS publisher
      LIMIT 10
    `;
    const result = await session.run(query, { q });
    res.json(result.records.map((r) => r.get("publisher")));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

export default router;

import "dotenv/config";
import { ethers } from "ethers";
import neo4j from "neo4j-driver";
import contractABI from "../artifacts/contracts/ScholarGraph.sol/ScholarGraph.json" assert { type: "json" };

// === Setup provider & contract ===
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI.abi, wallet);

// === Setup Neo4j ===
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

async function verifyDOI(doi) {
  const session = driver.session();
  try {
    // ✅ Get DOI from Neo4j
    const result = await session.run(
      `MATCH (p:Paper {doi: $doi}) RETURN p.title AS title, p.doi AS doi LIMIT 1`,
      { doi }
    );

    if (result.records.length === 0) {
      console.log(`❌ DOI ${doi} not found in Neo4j`);
      return;
    }

    const title = result.records[0].get("title");

    // ✅ Compute hash locally
    const doiHash = ethers.keccak256(ethers.toUtf8Bytes(doi));

    // ✅ Fetch from blockchain
    const stored = await contract.getPaper(doi); // assumes ScholarGraph.sol has getPaper(string doi)

    if (!stored || stored.hash === ethers.ZeroHash) {
      console.log(`⚠️ DOI ${doi} not registered on-chain.`);
      return;
    }

    if (stored.hash === doiHash) {
      console.log(`✅ DOI verified! "${title}" matches on-chain record.`);
    } else {
      console.log(`⚠️ DOI hash mismatch for "${title}"! Possible tampering.`);
    }

  } catch (err) {
    console.error("❌ Verification error:", err.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

const doiToVerify = process.argv[2]; // pass as CLI arg
if (!doiToVerify) {
  console.log("Usage: npx hardhat run scripts/verifyDOI.js --network amoy <doi>");
  process.exit(1);
}

verifyDOI(doiToVerify);

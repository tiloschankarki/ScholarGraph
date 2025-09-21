import "dotenv/config";
import { ethers } from "ethers";
import neo4j from "neo4j-driver";
import contractABI from "../artifacts/contracts/ScholarGraph.sol/ScholarGraph.json" assert { type: "json" };

// === Setup blockchain ===
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI.abi, wallet);

// === Setup Neo4j ===
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

async function main() {
  const session = driver.session();
  try {
    // get DOIs from Neo4j
    const result = await session.run(`
      MATCH (p:Paper)
      RETURN p.doi AS doi
      LIMIT 200
    `);

    const dois = result.records.map(r => r.get("doi"));

    // pick only first 10 for blockchain
    const limited = dois.slice(0, 10);

    for (const doi of limited) {
      try {
        const doiHash = ethers.keccak256(ethers.toUtf8Bytes(doi));

        console.log(`⏳ Adding DOI to blockchain: ${doi}`);
        const tx = await contract.addPaper(doi, doiHash);
        await tx.wait();

        console.log(`✅ Added to blockchain: ${doi} | Tx: ${tx.hash}`);
      } catch (err) {
        console.log(`⚠️ Skipped ${doi}: ${err.message}`);
      }
    }
  } finally {
    await session.close();
    await driver.close();
  }
}

main().catch(err => console.error(err));

import hre from "hardhat";

async function main() {
  const { ethers } = hre;
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ScholarGraph = await ethers.getContractFactory("ScholarGraph");
  const sg = await ScholarGraph.attach(contractAddress);

  console.log("🔗 Using ScholarGraph at:", contractAddress);

  const doi = "10.1000/testdoi";
  const hash = ethers.keccak256(ethers.toUtf8Bytes(doi));

  const tx = await sg.addPaper(doi, hash);
  await tx.wait();
  console.log("✅ Paper added with hash:", hash);
  console.log("🔗 Transaction hash:", tx.hash);

  const paper = await sg.getPaper(doi);
  console.log("📄 Paper retrieved:", paper);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

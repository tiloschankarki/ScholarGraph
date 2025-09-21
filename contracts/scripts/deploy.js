export async function main() {
    const ScholarGraph = await hre.ethers.getContractFactory("ScholarGraph");
    const scholarGraph = await ScholarGraph.deploy();
    await scholarGraph.waitForDeployment();
  
    console.log("✅ ScholarGraph deployed at:", await scholarGraph.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
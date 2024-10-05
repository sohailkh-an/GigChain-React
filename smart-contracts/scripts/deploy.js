const hre = require("hardhat");

async function main() {
  const GigFactory = await hre.ethers.getContractFactory("GigFactory");
  console.log("Deploying GigFactory...");
  const gigFactory = await GigFactory.deploy();
  
  await gigFactory.waitForDeployment();
  
  const gigFactoryAddress = await gigFactory.getAddress();
  console.log("GigFactory deployed to:", gigFactoryAddress);

  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("Waiting for Etherscan verification...");
    await new Promise((resolve) => setTimeout(resolve, 60000)); 

    console.log("Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
      address: gigFactoryAddress,
      contract: "contracts/GigFactory.sol:GigFactory",
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });

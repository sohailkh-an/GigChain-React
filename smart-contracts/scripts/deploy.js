const hre = require("hardhat");

async function main() {
  const GigOrder = await hre.ethers.getContractFactory("GigOrder");
  console.log("Deploying GigOrder...");
  const gigOrder = await GigOrder.deploy();
  await gigOrder.waitForDeployment();
  console.log("GigOrder deployed to:", await gigOrder.getAddress());

  const GigFactory = await hre.ethers.getContractFactory("GigFactory");
  console.log("Deploying GigFactory...");
  const gigFactory = await GigFactory.deploy();
  await gigFactory.waitForDeployment();
  console.log("GigFactory deployed to:", await gigFactory.getAddress());

  console.log("Verifying contracts on Etherscan...");
  await hre.run("verify:verify", {
    address: await gigOrder.getAddress(),
    contract: "contracts/GigOrder.sol:GigOrder"
  });

  await hre.run("verify:verify", {
    address: await gigFactory.getAddress(),
    contract: "contracts/GigFactory.sol:GigFactory"
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
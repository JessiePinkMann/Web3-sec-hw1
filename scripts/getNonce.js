const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const nonce = await deployer.getTransactionCount();
  console.log("Current nonce:", nonce);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

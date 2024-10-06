const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners(); 

  if (!signers || signers.length < 2) {
    console.log("Signers not properly initialized. Ensure correct network configuration and private keys.");
    return;
  }

  const owner = signers[0];
  const addr1 = signers[1];

  console.log(`Owner address: ${owner.address}`);
  console.log(`Addr1 address: ${addr1.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

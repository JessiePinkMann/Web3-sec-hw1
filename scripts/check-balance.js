const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34"; 
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);

  const balance = await token.balanceOf(owner.address);
  console.log(`Owner address: ${owner.address}, Balance: ${balance.toString()} tokens`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

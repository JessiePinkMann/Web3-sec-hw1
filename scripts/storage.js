const hre = require("hardhat");

async function main() {
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34"; 
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);

  const owner = "0x5d4937daeE2599c101c5829489825EC7710Eb7D2"; 

  const balance = await token.balanceOf(owner);
  console.log(`Balance of ${owner}: ${balance.toString()} tokens`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});

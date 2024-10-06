const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34";  
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);  

  const tx = await token.mint(owner.address, 1000); 
  await tx.wait();  

  console.log(`Minted 1000 tokens to ${owner.address}`);  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

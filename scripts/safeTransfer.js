const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  // const contractAddress = "0x...";
  const token = await hre.ethers.getContractAt("MyTokenERC721", contractAddress);

  // const recipient = "0x...";
  const tokenId = 1;
  const tx = await token.safeTransferFrom(owner.address, recipient, tokenId);
  await tx.wait();
  console.log(`Safe transferred token with ID ${tokenId} to ${recipient}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

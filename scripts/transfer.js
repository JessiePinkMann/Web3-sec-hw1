const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34"; 
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);

  const recipient = "0xeb14f7c13894076398E2f37AbA0553104dF77888"; 
  const tx = await token.transfer(recipient, 500);
  await tx.wait();

  console.log(`Transferred 500 tokens to ${recipient}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

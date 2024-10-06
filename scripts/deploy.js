const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const MyTokenERC20 = await hre.ethers.getContractFactory("MyTokenERC20");
  const erc20 = await MyTokenERC20.deploy(deployer.address, options);
  await erc20.deployed();
  console.log("MyTokenERC20 deployed to:", erc20.address);

  const MyTokenERC721 = await hre.ethers.getContractFactory("MyTokenERC721");
  const erc721 = await MyTokenERC721.deploy("https://example.com/", options);
  await erc721.deployed();
  console.log("MyTokenERC721 deployed to:", erc721.address);

  const MyTokenERC1155 = await hre.ethers.getContractFactory("MyTokenERC1155");
  const erc1155 = await MyTokenERC1155.deploy(options);
  await erc1155.deployed();
  console.log("MyTokenERC1155 deployed to:", erc1155.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contracts:", error);
    process.exit(1);
  });

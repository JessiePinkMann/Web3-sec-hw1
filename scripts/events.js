const hre = require("hardhat");

async function main() {
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34";
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);

  const filter = token.filters.Transfer();
  const events = await token.queryFilter(filter);

  events.forEach((event) => {
    console.log(`From: ${event.args.from}, To: ${event.args.to}, Value: ${event.args.value.toString()}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

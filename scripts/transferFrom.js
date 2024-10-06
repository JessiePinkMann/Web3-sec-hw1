const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34";
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);

  // Шаг 1: Проверка текущего баланса
  const ownerBalance = await token.balanceOf(owner.address);
  console.log(`Owner balance: ${ownerBalance.toString()} tokens`);

  // Шаг 2: Одобрение addr1 на управление 1000 токенами
  const addr1 = "0x7710503290B4E874997e6aCb2B923F69003f49ed";
  const approveTx = await token.approve(addr1, 1000); 
  await approveTx.wait();
  console.log(`Approved addr1 (${addr1}) to spend 1000 tokens`);

  // Шаг 3: Проверка нового разрешения (allowance)
  const newAllowance = await token.allowance(owner.address, addr1);
  console.log(`New allowance for addr1: ${newAllowance.toString()} tokens`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

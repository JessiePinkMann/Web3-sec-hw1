const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();  // Получаем текущего пользователя
  const contractAddress = "0xd1635788f9e600e14ceB8a6C3ae7513a78c53b34";  // Адрес твоего контракта
  const token = await hre.ethers.getContractAt("MyTokenERC20", contractAddress);  // Инициализация контракта

  const tx = await token.mint(owner.address, 1000);  // Минтим 1000 токенов для владельца
  await tx.wait();  // Ожидаем завершения транзакции

  console.log(`Minted 1000 tokens to ${owner.address}`);  // Вывод результата
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

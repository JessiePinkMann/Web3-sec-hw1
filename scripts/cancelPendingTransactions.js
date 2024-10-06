const hre = require("hardhat");

async function cancelPendingTransactions() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Отмена зависших транзакций для аккаунта:", deployer.address);

  const pendingNonce = await deployer.getTransactionCount("pending");
  const latestNonce = await deployer.getTransactionCount("latest");

  console.log("Последний nonce:", latestNonce);
  console.log("Pending nonce:", pendingNonce);

  if (pendingNonce > latestNonce) {
    for (let nonceToReplace = latestNonce; nonceToReplace < pendingNonce; nonceToReplace++) {
      console.log(`Отмена транзакции с nonce ${nonceToReplace}`);

      const tx = {
        to: deployer.address,
        value: 0, 
        nonce: nonceToReplace,
        gasLimit: 21000, 
        maxFeePerGas: hre.ethers.utils.parseUnits('200', 'gwei'),
        maxPriorityFeePerGas: hre.ethers.utils.parseUnits('50', 'gwei'),
      };

      const txResponse = await deployer.sendTransaction(tx);
      console.log(`Отправлена транзакция для отмены с hash: ${txResponse.hash}`);
      await txResponse.wait();
      console.log(`Транзакция с nonce ${nonceToReplace} успешно отменена.`);
    }
  } else {
    console.log("Нет зависших транзакций для отмены.");
  }
}

cancelPendingTransactions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Ошибка при отмене зависших транзакций:", error);
    process.exit(1);
  });

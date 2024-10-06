require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/Hqn6SQ0uh2yLQMbJH_SOWCCvCKVobcMA`,
      accounts: [`0xc0a400a1487d95a8b33a91777cbcae6e0a75eae1d34afee7f59748386205c4e3`],
    },
  },
  etherscan: {
    apiKey: "MMF48B3QJIDG4T3WAS1PUBNBP67SBBBB5S"
  }
};

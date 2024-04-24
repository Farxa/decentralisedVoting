/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
const Web3 = require("web3");

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      provider: () => new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    },
  },
};

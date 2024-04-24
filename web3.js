const { Web3 } = require("web3");

// Connect to Ganache
const web3 = new Web3("http://localhost:7545");

module.exports = web3;

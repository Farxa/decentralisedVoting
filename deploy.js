const fs = require("fs");
const web3 = require("./web3");

// Read the compiled contract ABI and bytecode
const contractABI = JSON.parse(fs.readFileSync("Voting.abi", "utf8"));
const bytecode = "0x" + fs.readFileSync("Voting.bin", "utf8");

// Ganache account address to deploy the contract
const account = "0xF8f9ACD49177133155d29BDBF7E07FdDAbA160A7";
web3.eth.defaultAccount = account;

// Deploy the contract function
async function deployContract() {
  try {
    // Create a new contract instance
    const contract = new web3.eth.Contract(contractABI);

    // Deploy the contract
    const deployedContract = await contract
      .deploy({
        data: bytecode,
        arguments: [["Candidate1", "Candidate2"]],
      })
      .send({
        from: account,
        gas: 1500000,
        gasPrice: "20000000000",
      });

    console.log(
      "Contract deployed at address:",
      deployedContract.options.address
    );
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

deployContract();

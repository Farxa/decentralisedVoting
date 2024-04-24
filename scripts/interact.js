const { Web3 } = require("web3");
const Voting = require("../artifacts/contracts/Voting.sol/Voting.json");

async function main() {
  const web3 = new Web3("http://127.0.0.1:8545");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const voting = new web3.eth.Contract(Voting.abi, contractAddress);

  //   // Cast a vote
  //   const accounts = await web3.eth.getAccounts();
  //   await voting.methods.vote("Candidate 1").send({ from: accounts[0] });

  //   // Get the vote count for a candidate
  //   const voteCount = await voting.methods.votes("Candidate 1").call();
  //   console.log("Vote count for Candidate 1:", voteCount);

  // Get all accounts
  const accounts = await web3.eth.getAccounts();

  // Get the list of candidates
  const candidates = await voting.methods.candidates(0).call();
  console.log("Candidates:", candidates);

  // Cast votes from each account for each candidate
  for (const account of accounts) {
    for (const candidate of candidates) {
      try {
        await voting.methods.vote(candidate).send({ from: account });
        console.log(`Account ${account} voted for ${candidate}`);
      } catch (error) {
        console.error(
          `Error voting for ${candidate} from account ${account}:`,
          error.message
        );
      }
    }
  }

  // Get the vote count for each candidate
  for (const candidate of candidates) {
    try {
      const voteCount = await voting.methods.votes(candidate).call();
      console.log(`Vote count for ${candidate}: ${voteCount}`);
    } catch (error) {
      console.error(
        `Error getting vote count for ${candidate}:`,
        error.message
      );
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

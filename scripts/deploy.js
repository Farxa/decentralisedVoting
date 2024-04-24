const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];
  const voting = await Voting.deploy(candidates);

  await voting.deployed();

  console.log("Voting contract deployed to:", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

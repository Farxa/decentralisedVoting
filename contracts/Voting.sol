// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

// contract Voting {
//  // Store the list of candidates
//  string[] public candidates;
// // Store the vote count for each candidate
//  mapping(string => uint256) public votes;
// constructor(string[] memory _candidates) {
//  candidates = _candidates;
//  }
// function vote(string memory _candidate) public {
//  require(validCandidate(_candidate), "Invalid candidate");
//  votes[_candidate]++;
//  }
// function validCandidate(string memory _candidate) view public returns (bool) {
//  for (uint256 i = 0; i < candidates.length; i++) {
//  if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(_candidate))) {
//  return true;
//  }
//  }
//  return false;
//  }
// }

contract Voting {
    // Define events for vote casting and candidate registration
    event Voted(address indexed voter, string candidate);
    event CandidateRegistered(string candidate);

    // Store the list of candidates
    string[] public candidates;

    // Store the vote count for each candidate
    mapping(string => uint256) public votes;

    // Define constructor to initialize candidates array
    constructor(string[] memory _candidates) {
        candidates = _candidates;

        // Emit CandidateRegistered event for each candidate
        for (uint256 i = 0; i < _candidates.length; i++) {
            emit CandidateRegistered(_candidates[i]);
        }
    }

    // Define vote function to allow users to cast their votes
    function vote(string memory _candidate) public {
        require(validCandidate(_candidate), "Invalid candidate");
        votes[_candidate]++;

        // Emit Voted event upon successful vote
        emit Voted(msg.sender, _candidate);
    }

    // Define function to check if candidate is valid
    function validCandidate(string memory _candidate) view public returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(_candidate))) {
                return true;
            }
        }
        return false;
    }
}

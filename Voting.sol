// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

contract Voting {
    string[] public candidates;
    mapping(string => uint256) public votes;

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function vote(string memory _candidate) public {
        require(validCandidate(_candidate), "Invalid candidate");
        votes[_candidate]++;
    }

    function validCandidate(string memory _candidate) view public returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(_candidate))) {
                return true;
            }
        }
        return false;
    }
}

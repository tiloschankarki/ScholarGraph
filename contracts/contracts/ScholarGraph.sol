// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScholarGraph {
    event PaperAdded(address indexed contributor, string doi, bytes32 hash);

    struct Paper {
        string doi;
        bytes32 hash;
        address contributor;
    }

    mapping(string => Paper) public papers;

    function addPaper(string memory doi, bytes32 hash) public {
        require(papers[doi].contributor == address(0), "Paper already exists");

        papers[doi] = Paper({
            doi: doi,
            hash: hash,
            contributor: msg.sender
        });

        emit PaperAdded(msg.sender, doi, hash);
    }

    function getPaper(string memory doi) public view returns (Paper memory) {
        return papers[doi];
    }
}

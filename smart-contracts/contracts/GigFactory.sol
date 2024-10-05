// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Gig.sol";

contract GigFactory {
    address[] public gigs;

    event GigCreated(address indexed gigAddress);

    function createGig(
        string memory _title,
        string memory _description,
        uint256 _price,
        string memory _category
    ) external {
        Gig newGig = new Gig(
            _title,
            _description,
            _price,
            _category,
            msg.sender
        );
        gigs.push(address(newGig));
        emit GigCreated(address(newGig));
    }

    function getAllGigs() external view returns (address[] memory) {
        return gigs;
    }
}

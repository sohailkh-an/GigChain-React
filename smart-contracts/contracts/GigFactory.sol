// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./GigOrder.sol";

contract GigFactory {
    GigOrder[] public gigOrders;
    
    event GigOrderCreated(address gigOrderAddress, address creator);

    function createGigOrder() public {
        GigOrder newGigOrder = new GigOrder();
        gigOrders.push(newGigOrder);
        emit GigOrderCreated(address(newGigOrder), msg.sender);
    }

    function getGigOrders() public view returns (GigOrder[] memory) {
        return gigOrders;
    }
}
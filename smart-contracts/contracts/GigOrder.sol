// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GigOrder is ReentrancyGuard, Ownable {
    enum OrderStatus { Created, Paid, Completed, Cancelled }

    struct Order {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        OrderStatus status;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCounter;

    event OrderCreated(uint256 orderId, address buyer, address seller, uint256 amount);
    event OrderPaid(uint256 orderId);
    event OrderCompleted(uint256 orderId);
    event OrderCancelled(uint256 orderId);

    /**
     * @dev Constructor that initializes the Ownable contract with the deployer as the initial owner.
     */
    constructor() Ownable(msg.sender) {
        // more code will come here
    }

    function createOrder(address _seller) external payable returns (uint256) {
        require(msg.value > 0, "Payment required");
        orderCounter++;
        orders[orderCounter] = Order(orderCounter, msg.sender, _seller, msg.value, OrderStatus.Created);
        emit OrderCreated(orderCounter, msg.sender, _seller, msg.value);
        return orderCounter;
    }

    function payOrder(uint256 _orderId) external payable nonReentrant {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender, "Not the buyer");
        require(order.status == OrderStatus.Created, "Invalid order status");
        require(msg.value == order.amount, "Incorrect payment amount");

        order.status = OrderStatus.Paid;
        emit OrderPaid(_orderId);
    }

    function completeOrder(uint256 _orderId) external nonReentrant {
        Order storage order = orders[_orderId];
        require(order.seller == msg.sender, "Not the seller");
        require(order.status == OrderStatus.Paid, "Order not paid");

        order.status = OrderStatus.Completed;
        payable(order.seller).transfer(order.amount);
        emit OrderCompleted(_orderId);
    }

    function cancelOrder(uint256 _orderId) external nonReentrant {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender || order.seller == msg.sender, "Not authorized");
        require(order.status == OrderStatus.Created || order.status == OrderStatus.Paid, "Cannot cancel");

        if (order.status == OrderStatus.Paid) {
            payable(order.buyer).transfer(order.amount);
        }
        order.status = OrderStatus.Cancelled;
        emit OrderCancelled(_orderId);
    }
}
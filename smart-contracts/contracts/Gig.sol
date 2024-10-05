// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Gig {
    string public title;
    string public description;
    uint256 public price;
    string public category;
    address public serviceProvider;
    address public client;
    enum GigState { Open, InProgress, Completed, Cancelled }
    GigState public state;

    event GigAccepted(address indexed client);
    event GigCompleted();
    event GigCancelled();

    constructor(
        string memory _title,
        string memory _description,
        uint256 _price,
        string memory _category,
        address _serviceProvider
    ) {
        title = _title;
        description = _description;
        price = _price;
        category = _category;
        serviceProvider = _serviceProvider;
        state = GigState.Open;
    }

    function acceptGig() external payable {
        require(state == GigState.Open, "Gig is not available");
        require(msg.value == price, "Incorrect payment amount");
        client = msg.sender;
        state = GigState.InProgress;
        emit GigAccepted(client);
    }

    function completeGig() external {
        require(msg.sender == serviceProvider, "Only the service provider can complete the gig");
        require(state == GigState.InProgress, "Gig is not in progress");
        state = GigState.Completed;
        payable(serviceProvider).transfer(address(this).balance);
        emit GigCompleted();
    }

    function cancelGig() external {
        require(
            msg.sender == client || msg.sender == serviceProvider,
            "Only client or service provider can cancel the gig"
        );
        require(state == GigState.InProgress, "Gig is not in progress");
        state = GigState.Cancelled;
        payable(client).transfer(address(this).balance);
        emit GigCancelled();
    }
}

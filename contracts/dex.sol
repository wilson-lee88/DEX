// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 < 0.8.0;
pragma experimental ABIEncoderV2;

import "./wallet.sol";


contract Dex is Wallet {
    using SafeMath for uint256;

    enum Side {
        BUY,
        SELL   
    }
    
    struct Order {
        uint id;
        address trader;
        Side side;
        bytes32 ticker;
        uint amount;
        uint price;
    }

    uint public nextOrderID = 0;

    mapping(bytes32 => mapping(uint => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Side side) view public returns(Order[] memory) {
        return orderBook[ticker][uint(side)];
    }

    function createLimitOrder(Side side, bytes32 ticker, uint amount, uint price) public {
        if(side == Side.BUY) {
            require(balances[msg.sender]["ETH"] >= amount.mul(price));
        }
        else if(side == Side.SELL) {
            require(balances[msg.sender][ticker] >= amount);
        }
        Order[] storage orders = orderBook[ticker][uint(side)];
        orders.push(
            Order(nextOrderID, msg.sender, side, ticker, amount, price)
            );
        nextOrderID++;
        } 

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Test{
    uint private balance;
    address private owner;

    constructor(){
        owner=msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"You are not the Onwer of account");
        _;
    }
    function getBalance() public view onlyOwner returns(uint){
        return balance;
    } 
    function deposit(uint amount) public payable onlyOwner{
        balance+=amount;
    }
    function withdraw(uint amount) public payable onlyOwner{
        require(amount<=balance,"you dont have much balance");
        balance-=amount;
    }
}
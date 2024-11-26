// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title PESW Token
 * @author Pepe From Squid World
 * @notice Token is a token that can be used to buy and sell PESW tokens.
 */
contract Token is ERC20, Ownable {
    /**
     * @dev Contract constructor.
     */
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) Ownable(msg.sender){        
        _mint(address(msg.sender), initialSupply * (10 ** 18));
    }
}
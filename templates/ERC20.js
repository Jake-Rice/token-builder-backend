module.exports.code = (contractName) => {
    return (
`//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${contractName} is ERC20, ERC20Burnable, Ownable {
    uint8 public dec;
    
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, uint8 _decimals) ERC20(_name, _symbol) {
        dec = _decimals;
        _mint(owner(), _initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return dec;
    }
}`
    );
}


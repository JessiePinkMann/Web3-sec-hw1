// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ERC1155 токен с функцией покупки токенов и выводом средств
/// @notice Этот контракт реализует стандарт ERC1155 с покупкой нескольких токенов
contract MyTokenERC1155 is ERC1155, Ownable {
    uint256 public nftPrice = 0.02 ether;

    /// @notice Конструктор для установки базового URI для токенов
    constructor() ERC1155("https://my-erc1155-metadata.com/token/{id}.json") Ownable() {}

    /// @notice Функция покупки токенов за ETH
    /// @param id Идентификатор токена
    /// @param amount Количество покупаемых токенов
    function buyNFT(uint256 id, uint256 amount) public payable {
        require(msg.value >= nftPrice * amount, "Send enough ETH to buy NFTs");
        _mint(msg.sender, id, amount, "");
    }

    /// @notice Вывод накопленных средств владельцем контракта
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}

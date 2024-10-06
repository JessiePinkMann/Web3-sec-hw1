// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ERC721 токен с функцией покупки NFT и выводом средств
/// @notice Этот контракт реализует стандарт ERC721 с покупкой и отображением метаданных
contract MyTokenERC721 is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public nftPrice = 0.05 ether;
    string private baseTokenURI;

    /// @notice Конструктор для установки базового URI токенов и параметров контракта
    /// @param _baseTokenURI URI для метаданных токенов
    constructor(string memory _baseTokenURI) ERC721("MyNFT", "MNFT") Ownable() {
        baseTokenURI = _baseTokenURI;
    }

    /// @notice Функция покупки NFT за ETH
    function buyNFT() public payable {
        require(msg.value >= nftPrice, "Send enough ETH to buy NFT");
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    /// @notice Вывод накопленных средств владельцем контракта
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /// @notice Возвращает URI метаданных для указанного токена
    /// @param tokenId Идентификатор токена
    /// @return Строка с URI метаданных
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId), ".json"));
    }
}

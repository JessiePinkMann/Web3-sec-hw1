// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title ERC20 токен с функцией Permit и покупкой токенов
/// @notice Этот контракт реализует стандарт ERC20 с возможностью безгазовых транзакций
contract MyTokenERC20 is ERC20, Ownable, ERC20Permit {
    uint256 public tokenPrice = 0.001 ether;
    uint256 public transferFee = 1;

    /// @notice Конструктор для установки владельца и параметров токена
    /// @param initialOwner Адрес владельца токена
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable()
        ERC20Permit("MyToken")
    {}

    /// @notice Функция выпуска новых токенов (только для владельца)
    /// @param to Адрес получателя
    /// @param amount Количество токенов для выпуска
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice Функция покупки токенов за ETH
    function buyTokens() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint256 amountToBuy = msg.value / tokenPrice;
        _mint(msg.sender, amountToBuy);
    }

    /// @notice Вывод накопленных средств владельцем контракта
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /// @notice Перевод с удержанием комиссии в 1%
    /// @param recipient Адрес получателя
    /// @param amount Сумма для перевода
    /// @return Успешность транзакции
    function transferWithFee(address recipient, uint256 amount) public returns (bool) {
        uint256 fee = (amount * transferFee) / 100;
        uint256 amountAfterFee = amount - fee;

        _transfer(_msgSender(), recipient, amountAfterFee);
        _transfer(_msgSender(), owner(), fee);

        return true;
    }
}

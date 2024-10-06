const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyTokenERC20", function () {
  let Token, token, owner, addr1, addr2;
  let provider;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    provider = ethers.provider;
    Token = await ethers.getContractFactory("MyTokenERC20");
    token = await Token.deploy(owner.address);
  });

  it("Should allow owner to mint tokens", async function () {
    await token.mint(owner.address, 1000);
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(1000);
  });

  it("Should allow users to buy tokens", async function () {
    await token.connect(addr1).buyTokens({ value: ethers.utils.parseEther("1") });
    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.be.gt(0);
  });

  it("Should take a fee during transfer", async function () {
    await token.mint(owner.address, 1000);
    await token.transfer(addr1.address, 1000);
    await token.connect(addr1).transferWithFee(addr2.address, 500);
    const balanceAddr2 = await token.balanceOf(addr2.address);
    const balanceOwner = await token.balanceOf(owner.address);

    expect(balanceAddr2).to.equal(495);
    expect(balanceOwner).to.equal(5);
  });

  it("Should allow permit for gasless transfers", async function () {
    await token.mint(owner.address, 1000);

    const nonce = (await token.nonces(owner.address)).toNumber();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 минут от текущего времени

    const chainId = (await provider.getNetwork()).chainId;

    const domain = {
      name: "MyToken",
      version: "1",
      chainId: chainId,
      verifyingContract: token.address,
    };

    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const value = 500;

    const message = {
      owner: owner.address,
      spender: addr1.address,
      value: value,
      nonce: nonce,
      deadline: deadline,
    };

    // Подписываем данные
    const signature = await owner._signTypedData(domain, types, message);

    const { v, r, s } = ethers.utils.splitSignature(signature);

    await token.permit(owner.address, addr1.address, value, deadline, v, r, s);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, value);

    const balanceAddr2 = await token.balanceOf(addr2.address);
    expect(balanceAddr2).to.equal(value);
  });
});

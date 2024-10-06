const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyTokenERC721", function () {
  let Token, token, owner, addr1, addr2;
  
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MyTokenERC721");
    token = await Token.deploy("https://example.com/");
  });

  it("Should allow users to buy NFT", async function () {
    await token.connect(addr1).buyNFT({ value: ethers.utils.parseEther("0.05") });
    const ownerOfNFT = await token.ownerOf(0);
    expect(ownerOfNFT).to.equal(addr1.address);
  });

  it("Should revert if insufficient ETH is sent for NFT", async function () {
    await expect(token.connect(addr1).buyNFT({ value: ethers.utils.parseEther("0.01") }))
      .to.be.revertedWith("Send enough ETH to buy NFT");
  });

  it("Should allow owner to withdraw funds", async function () {
    await token.connect(addr1).buyNFT({ value: ethers.utils.parseEther("0.05") });
    const initialBalance = await ethers.provider.getBalance(owner.address);
    
    await token.connect(owner).withdraw();
    const finalBalance = await ethers.provider.getBalance(owner.address);
    
    expect(finalBalance).to.be.gt(initialBalance);
  });

  it("Should return correct token URI", async function () {
    await token.connect(addr1).buyNFT({ value: ethers.utils.parseEther("0.05") });
    const tokenURI = await token.tokenURI(0);
    expect(tokenURI).to.equal("https://example.com/0.json");
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyTokenERC1155", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MyTokenERC1155");
    token = await Token.deploy();
  });

  it("Should allow users to buy multiple tokens", async function () {
    await token.connect(addr1).buyNFT(1, 10, { value: ethers.utils.parseEther("0.2") });
    const balance = await token.balanceOf(addr1.address, 1);
    expect(balance).to.equal(10);
  });

  it("Should revert if insufficient ETH is sent for multiple tokens", async function () {
    await expect(token.connect(addr1).buyNFT(1, 10, { value: ethers.utils.parseEther("0.1") }))
      .to.be.revertedWith("Send enough ETH to buy NFTs");
  });

  it("Should allow owner to withdraw funds", async function () {
    await token.connect(addr1).buyNFT(1, 10, { value: ethers.utils.parseEther("0.2") });
    const initialBalance = await ethers.provider.getBalance(owner.address);

    await token.connect(owner).withdraw();
    const finalBalance = await ethers.provider.getBalance(owner.address);
    
    expect(finalBalance).to.be.gt(initialBalance);
  });

  it("Should return correct URI for token", async function () {
    const tokenId = 1;
    const expectedUri = `https://my-erc1155-metadata.com/token/${tokenId}.json`;
    
    const tokenURI = await token.uri(tokenId);
    const actualUri = tokenURI.replace("{id}", tokenId.toString());
  
    expect(actualUri).to.equal(expectedUri);
  });
  
});

const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const TokenModule = require("../ignition/modules/TokenModule");

describe("Token Contract", function () {

  const tokenName = "PEPE FROM SQUID WORLD";
  const tokenSymbol = "PESW";
  const initialSupply = 100000000000;

  async function deployCounterModuleFixture() {
    const {token} = await ignition.deploy(TokenModule, {
      parameters: {
        TokenModule: {
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          initialSupply: initialSupply,
        }
      }
    });
    const [owner, addr1, addr2, _] = await ethers.getSigners();
    return {token, owner, addr1, addr2, _};
  }

  it("Should have correct initial supply allocations", async function () {
    const {token, owner} = await loadFixture(deployCounterModuleFixture);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer 20 tokens from addr1 to onwer", async function () {
    const {token, owner, addr1} = await loadFixture(deployCounterModuleFixture);

    // addr1 transfers 20 tokens to addr2
    const transferAmount = ethers.parseUnits("20", 18);
    await token.connect(owner).transfer(addr1.address, transferAmount);

    // Check balances
    const addr1Balance = await token.balanceOf(addr1.address);

    expect(addr1Balance).to.equal(transferAmount);
  });
});

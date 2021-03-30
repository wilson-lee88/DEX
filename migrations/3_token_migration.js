const Link = artifacts.require("Link");
const Wallet = artifacts.require("Wallet");
const Dex = artifacts.require("Dex");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Link);
  await deployer.deploy(Wallet);
  await deployer.deploy(Dex);
  let wallet = await Wallet.deployed()
  let link = await Link.deployed()
  let dex = await Dex.deployed()
  await link.approve(dex.address, 500)
  wallet.addToken(web3.utils.fromUtf8("LINK"), link.address)
  await link.approve(wallet.address, 500)
  await wallet.deposit(100, web3.utils.fromUtf8("LINK"))
};

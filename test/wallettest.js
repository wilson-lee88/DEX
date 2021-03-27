const Dex = artifacts.require("Dex")
const Link = artifacts.require('Link')
const truffleAssert = require('truffle-assertions');

contract("Dex", accounts => {
    it("Should only be possible for owner to add token", async () => { 
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.passes(
            dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]})
        )
        await truffleAssert.reverts(
            dex.addToken(web3.utils.fromUtf8("AAVE"), link.address, {from: accounts[1]})
        )
    
    })
    it("should handle deposits correctly", async () => {
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await link.approve(dex.address, 500);
        await dex.deposit(100, web3.utils.fromUtf8("LINK"));
        await dex.balance(accounts[0], web3.utils.fromUtf8("LINK"));
        let balance = await dex.balances(account[0], web3.utils.fromUtf8("LINK"))
        assert.equal(balance.toNumber(), 100)
    })
})
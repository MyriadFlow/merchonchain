// imports
const { ethers, run, network } = require("hardhat")
// async main
async function main() {
    const accounts = await ethers.getSigners()
    const deplpoyer = accounts[0].address
    let pPrice = ethers.utils.parseEther("0.01")
    let sPrice = ethers.utils.parseEther("0.004")
    const ErebrusNftFactory = await ethers.getContractFactory("AccessMaster")
    console.log("Deploying contract...")

    const Erebrus = await ErebrusNftFactory.deploy()
    await Erebrus.deployed()
    console.log(`Deployed contract to: ${Erebrus.address}`)
    if (network.name != "hardhat") {
        console.log("Waiting for block confirmations...")
        await Erebrus.deployTransaction.wait(6)
        await verify(Erebrus.address, [])
    }
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

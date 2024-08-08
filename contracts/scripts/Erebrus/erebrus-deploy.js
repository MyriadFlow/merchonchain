// imports
const { ethers, run, network } = require("hardhat")
// async main
async function main() {
    const accounts = await ethers.getSigners()
    const deplpoyer = accounts[0].address
    let pPrice = ethers.utils.parseEther("0.01")
    let sPrice = ethers.utils.parseEther("0.004")
    const ErebrusNftFactory = await ethers.getContractFactory("ErebrusV2")
    console.log("Deploying contract...")

    //  string memory _name,
    //     string memory _symbol,
    //     string memory _initialURI,
    //     uint256 _publicSalePrice,
    //     uint256 _subscriptionRate,
    //     uint96 royaltyBasisPoint,
    //     address erebrusContract,
    //     address _registryAddr
    const Erebrus = await ErebrusNftFactory.deploy(
        "EREBRUS",
        "ERB",
        "www.xyz.com",
        pPrice,
        sPrice,
        30,
        "0xcA1DE631D9Cb2e64C863BF50b83D18249dFb7054",
        "0x4b4Fd104fb1f33a508300C1196cd5893f016F81c"
    )
    await Erebrus.deployed()
    console.log(`Deployed contract to: ${Erebrus.address}`)
    if (
        (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) ||
        (network.config.chainId == 80001 && process.env.POLYGONSCAN_API_KEY)
    ) {
        console.log("Waiting for block confirmations...")
        await Erebrus.deployTransaction.wait(6)
        await verify(Erebrus.address, [
            "EREBRUS",
            "ERBS",
            "ipfs://bafkreib7oqdtji6xhcsf3usbzt4mzefds7bs3ye2t3aedg2ssy6nyn36gq",
            pPrice,
            100,
            30,
            sPrice,
            500,
        ])
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

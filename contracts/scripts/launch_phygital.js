// imports
const { ethers, run, network } = require("hardhat")
// async main
async function main() {
    const accounts = await ethers.getSigners()
    const deplpoyer = accounts[0].address
    let pPrice = ethers.utils.parseEther("0.01")
    let sPrice = ethers.utils.parseEther("0.004")
    const PhygitalNftFactory = await ethers.getContractFactory("PhygitalAG")
    console.log("Deploying contract...")

    const Phygital = await PhygitalNftFactory.deploy(
        "Node Nomad",
        "NN",
        "0x3A29EA5Ee6AB0326D72b55837dD9fD45b7a867Dd",
        "0xc3fE1c3bCCE02d7A115Df2d4737137A15ff830F9",
        "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
        ["10000000000000000", 100, 300, 6],
        "ipfs://QmVyCim5cbK5mZb83LX32b4HMk5NNNZsfcAKpeKZGggVFW"
    )
    await Phygital.deployed()
    console.log(`Deployed Phygital contract to: ${Phygital.address}`)
    if (network.name != "hardhat") {
        console.log("Waiting for block confirmations...")
        await Phygital.deployTransaction.wait(6)
        await verify(Phygital.address, [
            "Node Nomad",
            "NN",
            "0x3A29EA5Ee6AB0326D72b55837dD9fD45b7a867Dd",
            "0xc3fE1c3bCCE02d7A115Df2d4737137A15ff830F9",
            "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
            ["10000000000000000", 100, 300, 6],
            "ipfs://QmVyCim5cbK5mZb83LX32b4HMk5NNNZsfcAKpeKZGggVFW",
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

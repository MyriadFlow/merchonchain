const { ethers, contract } = require("hardhat")
const fs = require("fs")
const { json } = require("node:stream/consumers")

async function main() {
    const accounts = await ethers.getSigners()

    const contractAddress = "0xcA1DE631D9Cb2e64C863BF50b83D18249dFb7054"
    const walletAddress = "0x7E22df1C08b46DC64B405F7c5436458620679DF0"

    /// fetching the abi
    const contractArtifact = await artifacts.readArtifact("ErebrusManager")
    const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
        accounts[0]
    )

    /// TO grant Operator Role
    const EREBRUS_ADMIN_ROLE = await contract.EREBRUS_ADMIN_ROLE()

    const transactionResponse = await contract.grantRole(
        EREBRUS_ADMIN_ROLE,
        walletAddress
    )

    const transactionReceipt = await transactionResponse.wait()

    if (transactionReceipt.status === 1) {
        console.log("Transaction successful")
    } else {
        console.log("Transaction failed")
    }

    const isAdmin = await contract.isOperator(walletAddress)
    console.log(
        `Is the Wallet Address ${walletAddress} is Operator :  ${isAdmin}`
    )
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

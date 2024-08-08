const { ethers, contract } = require("hardhat")
const fs = require("fs")

async function main() {
    const accounts = await ethers.getSigners()
    const contractAddress = " 0xcA1DE631D9Cb2e64C863BF50b83D18249dFb7054"
    /// fetching the abi
    const contractArtifact = await artifacts.readArtifact("ErebrusManager")
    let user_account = "0x7E22df1C08b46DC64B405F7c5436458620679DF0"

    const contract = new ethers.Contract(
        contractAddress,
        contractArtifact.abi,
        accounts[0]
    )
    const isAdmin = await contract.isOperator(user_account)
    
    console.log(
        `Is the Wallet Address ${user_account} is Operator :  ${isAdmin}`
    )
}
// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

import 'dotenv/config'
import { ethers } from 'ethers'
import fs from 'fs'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)

  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
  const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8')

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log('Deploying...')
  const contract = await contractFactory.deploy()
  console.log('Waiting 1 block to confirm...')
  await contract.deployTransaction.wait(1)
  console.log('Contract address:', contract.address)

  const favoriteNumber = await contract.retreive()
  console.log('Favorite number:', favoriteNumber.toString())

  const txResponse = await contract.store('7')
  await txResponse.wait(1)

  const updatedFavoriteNumber = await contract.retreive()
  console.log('Updated favorite number:', updatedFavoriteNumber.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

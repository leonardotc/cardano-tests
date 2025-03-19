import * as fs from 'fs'
// Please add this dependency using npm install node-cmd
// import cmd from 'node-cmd'

// Path to the cardano-cli binary or use the global one
const CARDANO_CLI_PATH = "cardano-cli"
// The testnet identifier number
const CARDANO_NETWORK_MAGIC = 1097911063
// The directory where we store our payment keys
// assuming our current directory context is $HOME/receive-ada-sample
const CARDANO_KEYS_DIR = "/home/leonardo/receive-ada-sample/keys"
// The total payment we expect in lovelace unit
const TOTAL_EXPECTED_LOVELACE = 1000000

// Read wallet address value from payment.addr file
const walletAddress = fs.readFileSync(`${CARDANO_KEYS_DIR}/payment.addr`).toString()

console.log('walletAddress', walletAddress)
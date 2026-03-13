import json
from web3 import Web3

RPC_URL = "https://rpc.sepolia.org"

w3 = Web3(Web3.HTTPProvider(RPC_URL))

CONTRACT_ADDRESS = Web3.to_checksum_address("0x4F320ea394b98200578E32e4Cb2b60845ddc5c35")

with open("blockchain/abi.json") as f:
    abi = json.load(f)

contract = w3.eth.contract(
    address=CONTRACT_ADDRESS,
    abi=abi
)
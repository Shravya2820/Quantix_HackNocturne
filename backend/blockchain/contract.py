from .config import w3, contract

def create_milestone(amount, private_key):

    account = w3.eth.account.from_key(private_key)

    tx = contract.functions.createMilestone(amount).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 300000,
        "gasPrice": w3.eth.gas_price
    })

    signed_tx = account.sign_transaction(tx)

    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    return tx_hash.hex()
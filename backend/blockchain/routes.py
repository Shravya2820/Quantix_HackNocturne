from flask import Blueprint, request, jsonify
from .contract import create_milestone

blockchain_bp = Blueprint("blockchain", __name__)

@blockchain_bp.route("/create-milestone", methods=["POST"])
def create_milestone_api():
    data = request.json

    amount = data["amount"]
    private_key = data["private_key"]

    tx_hash = create_milestone(amount, private_key)

    return jsonify({
        "transaction_hash": tx_hash
    })
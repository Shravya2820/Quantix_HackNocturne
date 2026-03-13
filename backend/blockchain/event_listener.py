import time
from .config import w3, contract
from config import supabase

print("Listening for blockchain events...")

def listen_events():

    milestone_created_filter = contract.events.MilestoneCreated.create_filter(
        from_block="latest"
    )

    payment_released_filter = contract.events.PaymentReleased.create_filter(
        from_block="latest"
    )
    project_filter = factory_contract.events.ProjectCreated.create_filter(
    from_block="latest"
    )
    while True:
        try:

            # Milestone Created
            for event in milestone_created_filter.get_new_entries():

                milestone_id = event["args"]["milestoneId"]
                amount = event["args"]["amount"]

                tx_hash = event["transactionHash"].hex()
                log_index = event["logIndex"]
                block_number = event["blockNumber"]

                print(f"Milestone created: {milestone_id}")

                try:
                    supabase.table("milestones").insert({
                        "milestone_id": milestone_id,
                        "amount": amount,
                        "status": "created",
                        "tx_hash": tx_hash,
                        "log_index": log_index,
                        "block_number": block_number
                    }).execute()

                except Exception:
                    print("Duplicate event ignored")

            # Payment Released
            for event in payment_released_filter.get_new_entries():

                milestone_id = event["args"]["milestoneId"]

                print(f"Payment released for milestone {milestone_id}")

                supabase.table("milestones").update({
                    "status": "paid"
                }).eq("milestone_id", milestone_id).execute()
            for event in project_filter.get_new_entries():

                escrow = event["args"]["escrowContract"]
                client = event["args"]["client"]
                freelancer = event["args"]["freelancer"]

                print("New project:", escrow)

                supabase.table("projects").insert({
                    "contract_address": escrow,
                    "client": client,
                    "freelancer": freelancer
                }).execute()
        except Exception as e:
            print("⚠ RPC error, reconnecting...", e)

        time.sleep(5)


if __name__ == "__main__":
    listen_events()
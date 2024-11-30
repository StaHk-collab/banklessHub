from flask import Blueprint, request, jsonify
from services.sms_service import send_sms

savings_blueprint = Blueprint("savings", __name__)

@savings_blueprint.route("/create", methods=["POST"])
def create_savings_account():
    """Creates a savings account and sends an SMS notification."""
    data = request.json
    user_id = data.get("user_id")
    initial_deposit = data.get("initial_deposit")
    phone_number = data.get("phone_number")

    # Send SMS notification
    message = f"Dear User {user_id}, your savings account has been created with an initial deposit of {initial_deposit}."
    sms_response = send_sms(phone_number, message)

    response = {
        "message": f"Savings account created for User {user_id} with deposit {initial_deposit}.",
        "sms_status": "Notification sent successfully" if sms_response.get("status") == "sent" else "Failed to send notification"
    }

    return jsonify(response)
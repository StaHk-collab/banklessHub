from flask import Blueprint, request, jsonify
from services.finance import apply_loan
from services.sms_service import send_sms

loan_blueprint = Blueprint("loan", __name__)

@loan_blueprint.route("/apply", methods=["POST"])
def apply_for_loan():
    """Processes a loan application and sends an SMS notification."""
    data = request.json
    user_id = data.get("user_id")
    loan_amount = data.get("loan_amount")
    tenure = data.get("tenure")
    phone_number = data.get("phone_number")

    # Call the loan service
    response = apply_loan(user_id, loan_amount, tenure)

    # Send SMS notification
    message = f"Dear User {user_id}, your loan of {loan_amount} has been approved for a tenure of {tenure} months."
    sms_response = send_sms(phone_number, message)

    if sms_response.get("status") == "sent":
        response["sms_status"] = "Notification sent successfully"
    else:
        response["sms_status"] = "Failed to send notification"

    return jsonify(response)
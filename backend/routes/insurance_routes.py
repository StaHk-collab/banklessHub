from flask import Blueprint, request, jsonify
from services.sms_service import send_sms

insurance_blueprint = Blueprint("insurance", __name__)

@insurance_blueprint.route("/enroll", methods=["POST"])
def enroll_insurance():
    """Enrolls a user in an insurance plan and sends an SMS notification."""
    data = request.json
    user_id = data.get("user_id")
    insurance_plan = data.get("insurance_plan")
    phone_number = data.get("phone_number")

    # Send SMS notification
    message = f"Dear User {user_id}, you have successfully enrolled in the {insurance_plan} insurance plan."
    sms_response = send_sms(phone_number, message)

    response = {
        "message": f"User {user_id} successfully enrolled in {insurance_plan} insurance plan.",
        "sms_status": "Notification sent successfully" if sms_response.get("status") == "sent" else "Failed to send notification"
    }

    return jsonify(response)
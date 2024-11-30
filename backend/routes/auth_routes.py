from flask import Blueprint, request, jsonify
from services.mosip import authenticate_user
from services.sms_service import send_sms
import random

auth_blueprint = Blueprint("auth", __name__)

# In-memory storage for OTPs
otp_storage = {}

@auth_blueprint.route("/send_otp", methods=["POST"])
def send_otp():
    """Sends an OTP to the user's registered mobile number."""
    data = request.json
    phone_number = data.get("phone_number")
    if not phone_number:
        return jsonify({"error": "Phone number is required"}), 400

    # Generate a random 6-digit OTP
    otp = str(random.randint(100000, 999999))

    # Save the OTP in memory (for production, use a database or caching system like Redis)
    otp_storage[phone_number] = otp

    # Send the OTP via SMS
    message = f"Your OTP for authentication is: {otp}"
    sms_response = send_sms(phone_number, message)

    if sms_response.get("status") == "sent":
        return jsonify({"message": "OTP sent successfully"})
    return jsonify({"error": "Failed to send OTP"}), 500

@auth_blueprint.route("/login", methods=["POST"])
def login():
    """Authenticates the user."""
    data = request.json

    # Check if OTP is provided and valid
    phone_number = data.get("phone_number")
    provided_otp = data.get("otp")
    if phone_number and provided_otp:
        stored_otp = otp_storage.get(phone_number)
        if stored_otp != provided_otp:
            return jsonify({"error": "Invalid or expired OTP"}), 401
        # OTP verified, proceed with MOSIP authentication
        del otp_storage[phone_number]  # Remove OTP after successful verification

    # Continue with MOSIP authentication
    misp_license_key = data.get("misp_license_key")
    auth_partner_id = data.get("auth_partner_id")
    partner_api_key = data.get("partner_api_key")
    individual_id = data.get("individual_id")
    individual_id_type = data.get("individual_id_type", "VID")  # Default is VID
    demographics = data.get("demographics", None)
    biometrics = data.get("biometrics", None)

    if not (misp_license_key and auth_partner_id and partner_api_key and individual_id):
        return jsonify({"error": "Missing required authentication fields"}), 400

    response = authenticate_user(
        misp_license_key=misp_license_key,
        auth_partner_id=auth_partner_id,
        partner_api_key=partner_api_key,
        individual_id=individual_id,
        individual_id_type=individual_id_type,
        otp=provided_otp,  # Pass OTP if it was validated
        demographics=demographics,
        biometrics=biometrics
    )

    if response.get("authStatus"):
        return jsonify({"message": "Authentication successful", "authToken": response.get("authToken")})
    return jsonify({"error": "Authentication failed", "details": response.get("errors")}), 401
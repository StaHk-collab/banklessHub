import requests
import hashlib
import base64
import datetime
from config import MOSIP_AUTH_URL

def generate_transaction_id():
    """Generate a unique transaction ID."""
    return f"txn-{datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}"

def authenticate_user(misp_license_key, auth_partner_id, partner_api_key, individual_id, individual_id_type="VID", otp=None, demographics=None, biometrics=None):
    """Authenticate a user using MOSIP APIs."""
    try:
        # Transaction and request metadata
        transaction_id = generate_transaction_id()
        request_time = datetime.datetime.utcnow().isoformat() + "Z"

        # Requested authentication types
        requested_auth = {
            "otp": otp is not None,
            "demo": demographics is not None,
            "bio": biometrics is not None
        }

        # Assemble request payload
        request_payload = {
            "id": "mosip.identity.auth",
            "version": "v1",
            "requestTime": request_time,
            "env": "Staging",  # Assuming the environment is Staging
            "domainUri": f"https://{MOSIP_AUTH_URL}",
            "transactionID": transaction_id,
            "requestedAuth": requested_auth,
            "consentObtained": True,
            "individualId": individual_id,
            "individualIdType": individual_id_type,
            "thumbprint": "<Public key thumbprint here>",
            "requestSessionKey": "<Encrypted Session Key>",
            "requestHMAC": "<HMAC>",
            "request": {
                "timestamp": request_time,
                "otp": otp,
                "demographics": demographics,
                "biometrics": biometrics
            }
        }

        # Generate headers
        headers = {
            "Authorization": "<Consent token here>",
            "Signature": "<Signature here>"
        }

        # URL for authentication request
        url = f"{MOSIP_AUTH_URL}/idauthentication/v1/auth/{misp_license_key}/{auth_partner_id}/{partner_api_key}"

        # Make the POST request to MOSIP
        response = requests.post(url, json=request_payload, headers=headers)
        response_data = response.json()

        # Return MOSIP response
        return response_data.get("response", {})

    except Exception as e:
        return {"error": str(e)}
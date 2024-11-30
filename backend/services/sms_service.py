from twilio.rest import Client
from config import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def send_sms(phone_number, message):
    """Sends an SMS to the provided phone number."""
    try:
        response = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return {"status": "sent", "message_sid": response.sid}
    except Exception as e:
        return {"error": str(e)}
from dotenv import load_dotenv # type: ignore
import os

# Load environment variables from .env file
load_dotenv()

# MOSIP API Config
MOSIP_AUTH_URL = os.getenv("MOSIP_AUTH_URL")

# Twilio Config
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
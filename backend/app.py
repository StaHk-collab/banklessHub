from flask import Flask
from flask_cors import CORS # type: ignore
from routes.auth_routes import auth_blueprint
from routes.loan_routes import loan_blueprint
from routes.insurance_routes import insurance_blueprint
from routes.savings_routes import savings_blueprint

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_blueprint, url_prefix="/auth")
app.register_blueprint(loan_blueprint, url_prefix="/loans")
app.register_blueprint(insurance_blueprint, url_prefix="/insurance")
app.register_blueprint(savings_blueprint, url_prefix="/savings")

if __name__ == "__main__":
    app.run(debug=True)
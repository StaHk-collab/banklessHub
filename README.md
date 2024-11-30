## BanklessHub

BanklessHub is a modern micro-finance platform aimed at underbanked communities, providing seamless access to financial services such as loans, insurance, and savings accounts. The platform ensures secure operations and user-friendly interactions through a feature-rich dashboard and robust backend.

## Features

### Core Functionalities

- User Authentication: Secure login with personalized greetings.
- Loans: Apply for flexible loans with ease.
- Insurance: Enroll in reliable insurance plans.
- Savings: Open savings accounts to manage your finances.

### User Interface

- Interactive dashboard with a responsive design.
- Profile management with a dropdown menu for logout.
- Intuitive navigation across features.

### Backend Services

- RESTful API using Flask for business logic.
- SMS notifications powered by Twilio.
- SQLite database for lightweight and efficient data storage.

## Tech Stack

### Frontend

- React.js: For dynamic user interface and navigation.
- Bootstrap: For responsive design and styling.

### Backend

- Flask: REST API development with Python.
- Twilio: Integration for SMS notifications.

### Database

- SQLite: Simple and effective data storage.

## Project Structure
```
├── frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.js
│   │   │   ├── Dashboard.js
|   |   |   ├── Insurance.js
|   |   |   ├── Loans.js
|   |   |   ├── Savings.js
|   |   ├── images/
|   |   |   ├── profile-pic.png
|   |   |   ├── login-background.png
|   |   |   ├── loan-placeholder.png
|   |   |   ├── insurance-placeholder.png
|   |   |   ├── savings-placeholder.png
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── financeService.js
│   │   ├── App.js
│   │   ├── index.js
|   |   ├── custom.css
|   |   ├── index.css
│   ├── package.json
│   ├── .env
├── backend/
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── insurance_routes.py
|   |   ├── loan_routes.py
|   |   ├── savings_routes.py
│   ├── services/
│   │   ├── sms_service.py
│   │   ├── mosip.py
|   |   ├── finance.py
|   ├── test/
|   |   ├── test_app.py
|   ├── .env
│   ├── app.py
│   ├── config.py
|   ├── models.py
│   ├── requirements.txt
├── README.md
```

## Installation

### Prerequisites

- Node.js: Install from Node.js official website.
- Python 3.8+: Ensure Python is installed and added to PATH.
- SQLite: For the database backend.

## Steps

### Backend

Navigate to the backend directory:
```
cd backend
```

### Install dependencies:
```
pip install -r requirements.txt
```

### Set up environment variables in config.py (e.g., Twilio credentials).

Run the backend server:
```
python app.py
```

### Frontend

Navigate to the frontend directory:
```
cd frontend
```

### Install dependencies:
```
npm install
```

Start the frontend server:
```
npm start
```

### Usage

Open the application in your browser:
```
http://localhost:3000
```

- Log in with your username and password.
- Navigate through the dashboard to:
  - Apply for loans.
  - Enroll in insurance plans.
  - Create savings accounts.

## API Endpoints

### Authentication

- POST /auth/login: Authenticate users.

### Financial Services

- POST /loans/apply: Apply for a loan.
- POST /insurance/enroll: Enroll in an insurance plan.
- POST /savings/create: Create a savings account.

## Testing

1. Navigate to the backend directory.
2. Run tests using pytest:

    ```
    python -m pytest test/
    ```

### Future Enhancements

- File Uploads: Allow users to upload documents for loan and insurance applications.
- Admin Panel: Add admin functionalities to monitor and approve applications.
- Multi-language Support: Provide the application in multiple languages.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
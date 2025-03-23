# social-media-app

[![License](https://img.shields.io/badge/license/MIT-blue.svg)](LICENSE)

## Table of Contents

* [Description](#description)
* [Technologies Used](#technologies-used)
    * [Frontend](#frontend)
    * [Backend](#backend)
    * [Database](#database)
* [Installation](#installation)
    * [Prerequisites](#prerequisites)
    * [Frontend Setup](#frontend-setup)
    * [Backend Setup](#backend-setup)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## Description

**social-media-app** is a platform designed for university students to connect and share valuable experiences. Junior students can learn from the insights of seniors regarding various departments, internships, course selections, and other aspects of university life. This application aims to foster a supportive community where students can exchange knowledge and navigate their academic journeys more effectively.

## Technologies Used

This project utilizes the following technologies:

### Frontend

* React
* React DOM
* Chakra UI (for UI components)
* Vite (for frontend development)
* Axios (for making HTTP requests)

### Backend

* Django
* Django REST Framework (for building the API)
* Simple JWT (for JSON Web Token authentication)
* CORS Headers (for handling Cross-Origin Resource Sharing)
* Pillow (for image processing)
* dotenv (for managing environment variables)

### Database

* MySQL

## Installation

Here's how to get the **social-media-app** up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

* **For Backend (Django):**
    * Python 3.x
    * pip (Python package installer)
    * MySQL Server
* **For Frontend (React):**
    * Node.js (with npm or yarn)

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd social-media-app/frontend
    ```
2.  Install dependencies:
    ```bash
    npm install  # or yarn install
    ```
3.  [If you have environment variables for the frontend, e.g., API endpoint:]
    Create a `.env` file in the frontend directory and add your environment variables. For example:
    ```
    VITE_API_BASE_URL=http://localhost:8000/api/
    ```

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd social-media-app/backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    (Make sure you have a `requirements.txt` file listing your backend dependencies. If not, you can generate one using `pip freeze > requirements.txt` after installing the required packages.)
3.  Create a `.env` file in the backend directory and add your environment variables, such as database connection details:
    ```
    DATABASE_ENGINE=django.db.backends.mysql
    DATABASE_NAME=your_database_name
    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    SECRET_KEY=your_django_secret_key
    # Add other environment variables as needed
    ```
4.  Set up the MySQL database:
    * Create a database named `your_database_name` (or your preferred name) in your MySQL server.
5.  Run database migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
6.  Create a superuser (optional, for admin access):
    ```bash
    python manage.py createsuperuser
    ```

## Usage

Here's how to run the **social-media-app**:

1.  **Start the Backend (Django):**
    ```bash
    cd social-media-app/backend
    python manage.py runserver
    ```
    The backend will typically run on `http://localhost:8000`.

2.  **Start the Frontend (React):**
    ```bash
    cd social-media-app/frontend
    npm run dev  # or yarn dev
    ```
    The frontend will typically run on `http://localhost:5173` (or a port specified by Vite).

3.  Open your browser and navigate to the frontend URL (usually `http://localhost:3000`). You should now be able to register, log in, and start sharing experiences!

## Contributing

If you'd like to contribute to the **social-media-app**, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a pull request.

## License

This project is licensed under the [MIT] License - see the [LICENSE](LICENSE) file for details.


## Contact

[Elias Mebrahtom] - [ellamebrahtom1995@gmail.com] - [Optional:https://github.com/14elias]

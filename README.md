
# Document Viewer Application

This is a full-stack application that allows users to upload, view, and manage documents with assessment metadata. The application consists of a frontend built with ReactJS and NextJS, and a backend built with Python and FastAPI.

# Live demo
https://frontdoc.hsingh.site/projects

## Table of Contents

- [Document Viewer Application](#document-viewer-application)
- [Live demo](#live-demo)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
  - [Seeding the Database](#seeding-the-database)
    - [Seeding Without Docker](#seeding-without-docker)
    - [Seeding With Docker](#seeding-with-docker)
  - [Running with Docker](#running-with-docker)

## Features

- Upload documents and generate random assessments.
- View document assessments.
- Manage projects and documents.
- Pagination and metadata visualization.

## Technologies Used

- **Frontend:** NextJS, Tailwind CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Prerequisites

- **Node.js** (version 19 or higher)
- **Python** (version 3.12 or higher)
- **PostgreSQL** (version 16 or higher)
- **Docker** and **Docker Compose** (for containerized setup)

## Installation

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/siinghd/document-viewer.git
   cd document-viewer/backend
   ```

2. Create and activate a virtual environment:

   ```sh
   python3.12 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the dependencies:

   ```sh
   pip install -r requirements.txt  # pip3 install -r requirements.txt
   ```

4. Set up the environment variables:

   Create a `.env` file in the `backend` directory with the following content:

   ```sh
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app  # replace this
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   DEBUG=True
   ```

5. Run the database migrations:

   ```sh
   alembic upgrade head
   ```

6. Seed the database:

   ```sh
   python3.12 seed.py
   ```

7. Start the backend server:

   ```sh
   uvicorn app.main:app --host 127.0.0.1  --port 5001 --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../frontend
   ```

2. Install the dependencies:

   ```sh
   yarn install  #  pnpm i
   ```

3. Set up the environment variables:

   Create a `.env` file in the `frontend` directory with the following content:

   ```sh
   NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/api

   # For Docker, uncomment this and comment the first one
   # NEXT_PUBLIC_API_URL=http://backend:5001/api 

   NEXT_PUBLIC_API_URL_CLIENT=http://127.0.0.1:5001/api 
   ```

4. Start the frontend development server:

   ```sh
   npm run dev  # or any pack manager
   ```

## Running the Application

- The backend will be running on `http://localhost:5001`.
- The frontend will be running on `http://localhost:3000`.

## Seeding the Database

### Seeding Without Docker

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Run the seed script:

   ```sh
   python3.12 seed.py  # python3 seed.py
   ```

### Seeding With Docker

1. Ensure the `docker-compose.yml` file contains the necessary configurations.

2. Build and start the containers:

   ```sh
   docker-compose up --build
   ```

3. Run the seed script inside the backend container:

   ```sh
   docker-compose exec backend python seed.py  # run this is in new terminal window
   ```

## Running with Docker

1. Clone the repository:

   ```sh
   git clone https://github.com/siinghd/document-viewer.git
   cd document-viewer
   ```

2. Modify  the `ENV VARS` in docker compose file  for the backend:

   ```sh
   DATABASE_URL=postgresql://postgres:postgres@db:5432/app 
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   DEBUG=False
   ```

3. Create the `.env` file for the frontend:

   ```sh
   cat > frontend/.env <<EOL
   # NEXT_PUBLIC_API_URL=http://backend:5001/api

   # Uncomment this line and comment the first one for local development
   NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/api 

   NEXT_PUBLIC_API_URL_CLIENT=http://127.0.0.1:5001/api
   EOL
   ```

4. Ensure the `docker-compose.yml` file contains the necessary configurations.

5. Build and start the containers:

   ```sh
   docker-compose up --build
   ```

   This command will:
   - Build the Docker images for the backend and frontend.
   - Start the PostgreSQL, backend, and frontend services.
   - Run database migrations.

6. Access the application:

   - Backend: `http://localhost:5001`
   - Frontend: `http://localhost:3000`


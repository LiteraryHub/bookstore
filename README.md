# LiteraryHub - Bookstore README

Welcome to the LiteraryHub bookstore repository. This document provides detailed instructions on setting up and running the backend code for the LiteraryHub platform, built using Node.js, Express, and MongoDB. The backend handles server-side logic and database connections, enabling functionalities such as user authentication, book ratings, and managing book information. This platform is designed for book enthusiasts and provides a seamless experience for users to interact with books and other users. 

## Overview

The LiteraryHub platform is designed for book enthusiasts, offering features like user authentication, book ratings, and management of book details. This repository, `bookstore`, contains all the necessary server-side code and database configurations. For the frontend code, visit the [swe-frontend](https://github.com/LiteraryHub/swe-frontend) repository.

## Getting Started

Follow these steps to get a local copy of the project up and running for development and testing.

### Prerequisites

Ensure you have the following software installed on your local machine:

- Node.js
- MongoDB
- NPM

### Installing

1. Clone the repository to your local machine:

```sh
git clone https://github.com/literaryhub/bookstore.git
```

2. Navigate to the project directory:

```sh
cd bookstore
```

3. Install all dependencies:

```sh
npm install
```

### Database Setup

The application uses MongoDB as its database. Set up a MongoDB instance and provide the connection string in your environment variables.

Create a `.env` file in the root directory of the project and add the following:

```sh
DB_CONNECTION_STRING=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Running the Application

To start the server, run:

```sh
npm start
```

The server will start on port 3000 or the port specified in your environment variables.

## Docker Setup

### Creating the Docker Image

Use Docker to build the image from the current code:

```sh
docker build -t literaryhub_bookstore_image:latest .
```

### Pushing the Docker Image to Docker Hub

After creating the image locally, push it to Docker Hub:

```bash
docker tag literaryhub_bookstore_image:latest literaryhub/bookstore:latest
docker push literaryhub/bookstore:latest
```

### Running the Docker Image Locally

**Disclaimer:** The host `0.0.0.0` specified in the Dockerfile does not accept connections locally. Modify the host to `127.0.0.1` for local testing, but avoid submitting this change as it might break the deployment process.

Create a Docker container and run the image:

```sh
sudo docker run -d -p 300:3001 literaryhub_bookstore_image:latest
```

To list all containers:

```sh
docker ps -a
```

To list only running containers, omit the `-a` parameter.

To see the logs for a container:

```sh
docker logs <container_id>
```

To stop/start a container:

```sh
docker start <container_id>
sudo docker stop <container_id>
```

**Note:** You cannot reuse the same container name multiple times, even if running the same image.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

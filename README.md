# README

## Requirements

- Node.js
- PostgreSQL

## Requirements

- Clone the repository and navigate to the project directory.
- Run `npm install` to install the necessary dependencies.
- Create a PostgreSQL database and update the database configuration in the `config/config.json` file.
- Run `node server.js` to start the server. The server will be running on port `5000`.

## Assumptions

- The PostgreSQL server is running on the default port (5432).
- You have a PostgreSQL user with the necessary permissions to create and modify tables in the database.

## Additional Information

- The server uses the express framework and the sequelize ORM to interact with the PostgreSQL database.
- The endpoints for the server are defined in the routes directory.
- The database models are defined in the models directory.

### Docker Setup

This project includes a `Dockerfile` and `docker-compose.yml` for running the application with PostgreSQL.

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
2. Access the application at `http://localhost:5000`.

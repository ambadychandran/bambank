# README

## Requirements

- Node.js
- MySQL

## Requirements

- Clone the repository and navigate to the project directory.
- Run `npm install` to install the necessary dependencies.
- Create a MySQL database and update the database configuration in the `config/config.json` file.
- Run ` node server.js` to start the server. The server will be running on `  port 5000. `

## Assumptions

- The MySQL server is running on the default port (3306).
- You have a MySQL user with the necessary permissions to create and modify tables in the database.

## Additional Information

- The server uses the express framework and the sequelize ORM to interact with the MySQL database.
- The endpoints for the server are defined in the routes directory.
- The database models are defined in the models directory.

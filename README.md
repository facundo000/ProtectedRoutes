# Protected Routes API

This API is designed for rapid implementation of protected routes and a dashboard where each user's record will be kept.

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/protected-routes-api.git
```

2. Install dependencies:
```
cd protected-routes-api
npm install
```

3. Set up the environment variables:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables to the `.env` file:
     ```
     DB_HOST=your-database-host
     DB_PORT=your-database-port
     DB_NAME=your-database-name
     DB_USERNAME=your-database-username
     DB_PASSWORD=your-database-password
     ```

4. Start the development server:
```
npm run start:dev
```

The API will be available at `http://localhost:3000/protected-routes/v1`.

## Usage

The API provides the following endpoints:

### Swagger Documentation
The API documentation is available at `http://localhost:3000/api`.

### Authentication
The API uses JWT-based authentication. You can use the `/auth/login` endpoint to obtain an access token, which should be included in the `Authorization` header for subsequent requests.

### Protected Routes
The API has several protected routes that can only be accessed by users with the appropriate roles. The roles are defined in the `UsersModule`.

## API

The API provides the following endpoints:

### Authentication
- `POST /auth/login`: Authenticate a user and obtain an access token.

### Users
- `GET /users`: Get a list of all users.
- `GET /users/:id`: Get a specific user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user.

### Roles
- `GET /roles`: Get a list of all roles.
- `GET /roles/:id`: Get a specific role by ID.
- `POST /roles`: Create a new role.
- `PUT /roles/:id`: Update an existing role.
- `DELETE /roles/:id`: Delete a role.

### Protected Routes
- `GET /protected-routes/dashboard`: Get the dashboard data.
- `POST /protected-routes/create-record`: Create a new record.
- `PUT /protected-routes/update-record/:id`: Update an existing record.
- `DELETE /protected-routes/delete-record/:id`: Delete a record.

For more detailed information about the API, please refer to the Swagger documentation at `http://localhost:3000/api`.
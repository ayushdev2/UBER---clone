# API Documentation

## POST /users/register

This endpoint registers a new user in the system.

### Description

- Validates the incoming data using express-validator.
- Hashes the user's password before storing it.
- Creates a new user record.
- Generates and returns a JSON Web Token (JWT) along with the user data upon a successful registration.

### Request

- **Method:** POST
- **Endpoint:** `/users/register`
- **Headers:**  
  `Content-Type: application/json`

- **Body:**  
  The request body should be in JSON format with the following structure:

  ```json
  {
    "fullname": {
      "firstname": "John", // required, minimum 3 characters long
      "lastname": "Doe" // optional, minimum 3 characters if provided
    },
    "email": "john.doe@example.com", // required, valid email format, 5-50 characters long
    "password": "securePassword" // required, minimum 6 characters long
  }
  ```

### Response

- **Success (201 Created):**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      // User details as returned by the system
    }
  }
  ```

- **Error (400 Bad Request):**

  Returned when input validation fails. The response includes an `errors` array with details about each validation issue.

  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "Field name",
        "location": "body"
      }
      // ...additional errors if applicable
    ]
  }
  ```

### Status Codes

- **201:** User successfully registered.
- **400:** Input validation failed or required fields are missing.

### Additional Notes

- Ensure the `JWT_SECRET` environment variable is configured correctly for JWT generation.
- The password is securely hashed before storing in the database.
- First name is required, last name is optional.
- Email must be unique and valid.

---

## POST /users/login

This endpoint authenticates a user and returns a JWT token.

### Description

- Validates the incoming data using express-validator.
- Checks if the user exists and the password matches.
- Returns a JWT token and user details on successful login.

### Request

- **Method:** POST
- **Endpoint:** `/users/login`
- **Headers:**  
  `Content-Type: application/json`

- **Body:**  
  The request body should be in JSON format with the following structure:

  ```json
  {
    "email": "john.doe@example.com", // required, valid email format
    "password": "securePassword" // required
  }
  ```

### Response

- **Success (200 OK):**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      // User details as returned by the system
    }
  }
  ```

- **Error (400 Bad Request):**

  Returned when input validation fails.

  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "Field name",
        "location": "body"
      }
      // ...additional errors if applicable
    ]
  }
  ```

- **Error (401 Unauthorized):**

  Returned when email or password is incorrect.

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Status Codes

- **200:** User successfully logged in.
- **400:** Input validation failed.
- **401:** Invalid email or password.

### Additional Notes

- Ensure the `JWT_SECRET` environment variable is configured correctly for JWT generation.
- Password is compared

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
- Password is compared using bcrypt, ensuring security.

---

## GET /users/profile

This endpoint returns the authenticated user's profile information.

### Description

- Requires a valid JWT token (sent via cookie or `Authorization` header).
- Returns the user data associated with the token.

### Request

- **Method:** GET
- **Endpoint:** `/users/profile`
- **Headers:**  
  `Authorization: Bearer <JWT_TOKEN>`  
  or  
  Cookie: `token=<JWT_TOKEN>`

### Response

- **Success (200 OK):**

  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```

- **Error (401 Unauthorized):**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes

- **200:** User profile returned.
- **401:** Invalid or missing authentication token.

---

## GET /users/logout

This endpoint logs out the authenticated user.

### Description

- Requires a valid JWT token (sent via cookie or `Authorization` header).
- Blacklists the token so it cannot be used again.
- Clears the authentication cookie.

### Request

- **Method:** GET
- **Endpoint:** `/users/logout`
- **Headers:**  
  `Authorization: Bearer <JWT_TOKEN>`  
  or  
  Cookie: `token=<JWT_TOKEN>`

### Response

- **Success (200 OK):**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- **Error (401 Unauthorized):**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes

- **200:** User logged out successfully.
- **401:** Invalid or missing authentication token.

### Additional Notes

- Ensure the `JWT_SECRET` environment variable is configured correctly for JWT generation.
- Logging out invalidates the token, enhancing security.

---

## POST /captains/register

This endpoint registers a new captain (driver) in the system.

### Description

- Validates incoming data using express-validator.
- Hashes the captain's password before storing it.
- Stores captain and vehicle details in the database.
- Returns a JWT token and captain details on success.

### Request

- **Method:** POST
- **Endpoint:** `/captains/register`
- **Headers:**  
  `Content-Type: application/json`

- **Body:**  
  The request body should be in JSON format with the following structure:

  ```json
  {
    "fullname": {
      "firstname": "Jane", // required, minimum 3 characters
      "lastname": "Smith" // required, minimum 3 characters
    },
    "email": "jane.smith@example.com", // required, valid email format
    "password": "securePassword", // required, minimum 6 characters
    "vehicle": {
      "color": "Red", // required
      "plate": "ABC123", // required, unique
      "capacity": 4, // required, minimum 1
      "vehicleType": "car" // required, one of: car, motorcycle, auto
    }
  }
  ```

### Response

- **Success (201 Created):**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

- **Error (400 Bad Request):**

  Returned when input validation fails or required fields are missing.

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

- **201:** Captain successfully registered.
- **400:** Input validation failed or required fields are missing.

### Additional Notes

- Password is securely hashed before storing.
- Email and vehicle plate must be unique.
- Vehicle type must be one of: car, motorcycle, auto.
- Ensure the `JWT_SECRET` environment variable is configured for JWT generation.

---

## POST /captains/login

This endpoint authenticates a captain and returns a JWT token.

### Description

- Validates the incoming data using express-validator.
- Checks if the captain exists and the password matches.
- Returns a JWT token and captain details on successful login.

### Request

- **Method:** POST
- **Endpoint:** `/captains/login`
- **Headers:**  
  `Content-Type: application/json`

- **Body:**  
  ```json
  {
    "email": "jane.smith@example.com", // required, valid email format
    "password": "securePassword" // required
  }
  ```

### Response

- **Success (200 OK):**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "captain": {
      // Captain details as returned by the system
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

- **200:** Captain successfully logged in.
- **400:** Input validation failed.
- **401:** Invalid email or password.

---

## GET /captains/profile

This endpoint returns the authenticated captain's profile information.

### Description

- Requires a valid JWT token (sent via cookie or `Authorization` header).
- Returns the captain data associated with the token.

### Request

- **Method:** GET
- **Endpoint:** `/captains/profile`
- **Headers:**  
  `Authorization: Bearer <JWT_TOKEN>`  
  or  
  Cookie: `token=<JWT_TOKEN>`

### Response

- **Success (200 OK):**

  ```json
  {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // other captain fields
  }
  ```

- **Error (401 Unauthorized):**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes

- **200:** Captain profile returned.
- **401:** Invalid or missing authentication token.

---

## GET /captains/logout

This endpoint logs out the authenticated captain.

### Description

- Requires a valid JWT token (sent via cookie or `Authorization` header).
- Blacklists the token so it cannot be used again.
- Clears the authentication cookie.

### Request

- **Method:** GET
- **Endpoint:** `/captains/logout`
- **Headers:**  
  `Authorization: Bearer <JWT_TOKEN>`  
  or  
  Cookie: `token=<JWT_TOKEN>`

### Response

- **Success (200 OK):**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- **Error (401 Unauthorized):**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes

- **200:** Captain logged out successfully.
- **401:** Invalid or missing authentication token.

### Additional Notes

- Ensure the `JWT_SECRET` environment variable is configured for JWT generation.
- Logging out invalidates the token, enhancing security.

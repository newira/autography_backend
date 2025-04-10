# autography_backend

## Routes

### 1. **Register with Email and Password**
- **Endpoint:** `/user/register_with_mail_password`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "data": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

### 1. **Sign in with Email and Password**
- **Endpoint:** `/user/sign_in_with_gmail_password`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged in successfully!",
    "data": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
# 🚀 Cypress Test Automation – 2025
### Comprehensive Cypress Test Automation Mastery for year 2025 and beyond

---

## 📘 User API Documentation
**📄Overview**

***This API allows full user management:***
- ✅ Register
- ✅ Login
- ✅ Retrieve All Users
- ✅ Retrieve specific user
- ✅ Update
- ✅ Partial Update
- ✅ Delete

**🔐 Static token used for authentication (for testing purposes).**

---
### **🌐 API Base URL**
```bash
http://localhost:3000/api/users
```
---

### **🔁 Endpoints**

#### **🆕 1. Register a New User**
**Endpoint**: `/register`  
**📍Method**: `POST`  

**Description**: Registers a new user with a hashed password.  

##### **📤Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
#### **✅Response Body & Status 201 Created:**
```json
{
  "message": "User registered",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```
#### **⚠️400 Bad Request:**
```json
{
  "message": "All fields required"
}
```
#### **⚠️400 Bad Request:**
```json
{
  "message": "Email already exists"
}
```
#### **🔐2. Login a registered user**
**Endpoint**: `/login`  
**📍Method**: `POST`

**Description**: Logs in a user and return a static token for testing purposes.

##### **📤Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```
#### **✅Response Body and Status 200 OK:**
```json
{
  "token": "STATIC_TOKEN_123"
}
```
#### **⚠️Response Body and Status 400 Bad Request:**
```json
{
  "message": "User not found"
}
```
#### **❌Response Body and Status 401 Unauthorized:**
```json
{
  "message": "Invalid Password"
}
```
#### **👥3. Get All Users - the endpoint is the API Base URL**
**Endpoint**: `/`  
**📍Method**: `GET`

**Description**: Retrieves a list of all users, excluding their passwords.

#### **✅Response Body and Status 200 OK:**
```json
[
  {
    "id": "number",
    "name": "string",
    "email": "string"
  }
]
```
#### **🔍4. Get User by ID**
**Endpoint**: `/:id`  
**📍Method**: `GET`

**Description**: Retrieves a user by their ID, excluding their password.

#### **✅Response Body and Status 200 OK:**
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```
#### **❌Response Body and Status 404 Not Found:**
```json
{
  "message": "User not found"
}
```

#### **📝5. Update User by ID**
**Endpoint**: `/:id`  
**📍Method**: `PUT`

**Description**: Updates a user's details including their password (hashed).

#### **📤Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
#### **✅Response Body and Status 200 OK:**
```json
{
  "message": "User updated",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```
#### **⚠️Response Body and Status 400 Bad Request:**
```json
{
  "message": "All fields required"
}
```
#### **❌Response Body and Status 404 Not Found:**
```json
{
  "message": "User not found"
}
```

#### **✏️ 6. Partially Update User by ID**
**Endpoint**: `/:id`  
**📍Method**: `PATCH`  

**Description**: Partially updates a user's details. If the password is included, it will be hashed.  

##### **📤Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
#### **✅Response Body and Status 200 OK:**
**Note: The message will be based on the update that you request. (ex. If you partially update the name, the message will be Successfully updated the name)*
```json
{
  "message": "Successfully updated the name, email", 
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```
##### **📤Request Body - Changing of Password**
```json
{
  "password": "string"
}
```
#### **✅Response Body and Status 200 OK:**
```json
{
  "message": "Successfully updated the password", 
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```
#### **⚠️Response Body and Status 400 Bad Request:**
```json
{
  "message": "No fields were updated"
}
```
#### **❌Response Body and Status 404 Not Found:**
```json
{
  "message": "User not found"
}
```

#### **❌Response Body and Status 500 Internal Server Error:**
```json
{
  "message": "Internal Server Error"
}
```

---

#### **🗑️ 7. Delete User by ID**
**Endpoint**: `/:id`  
**📍Method**: `DELETE`  

**Description**: Deletes a user by their ID.  

#### **✅Response Body and Status 200 OK:**
```json
{
  "message": "User deleted"
}
```
#### **❌Response Body and Status 404 Not Found:**
```json
{
  "message": "User not found"
}
```
#### **❌Response Body and Status 500 Internal Server Error:**
```json
{
  "message": "Internal Server Error"
}
```
---

### **🔐 Authentication**
- The `Authorization` header is required for certain endpoints (e.g., `GET /:id`, `PATCH /:id`, `DELETE /:id`).
- Example:
  ```
  Authorization: Bearer STATIC_TOKEN_123
  ```

---

### **⚙️ Error Handling**
- **400 Bad Request**: Returned when required fields are missing or invalid.
- **404 Not Found**: Returned when a resource (e.g., user) is not found.
- **500 Internal Server Error**: Returned when an unexpected error occurs on the server.

---

### **🛠️ Testing Notes**
- Use tools like **Postman** or **Cypress** to test the API endpoints.
- Ensure the `STATIC_TOKEN_123` is used for testing authentication.
- Use unique values for `email` when testing the `POST /register` endpoint to avoid conflicts.
- Test the `PATCH` endpoint with different combinations of fields (`name`, `email`, `password`) to ensure all updates are handled correctly.

---

**📌File an issue in the GitHub Repository if you encounter problem during API Testing**
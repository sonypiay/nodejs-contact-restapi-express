# User API Spec

## Register User API
Endpoint: POST /api/users/register

Request Body:
```json
{
    "username": "sonypiay",
    "password": "rahasia",
    "name": "Sony Darmawan"
}
```

Response Body Success:
```json
{
    "data": {
        "username": "sonypiay",
        "name": "Sony Darmawan"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username already registered"
}
```

## Login User API
Endpoint: POST /api/users/login

Request Body:
```json
{
    "username": "sonypiay",
    "password": "rahasia"
}
```

Response Body Success:
```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:
```json
{
    "errors": "Invalid username or password"
}
```

## Update User API
Endpoint: PATCH /api/users/current

Header:
- Authorization: Basic Token

Request Body:
```json
{
    "username": "sonypiay", // optional
    "password": "new password" // optional
}
```

Response Body Success:
```json
{
    "data": {
        "username": "sonypiay",
        "name": "Sony Darmawan Update"
    }
}
```

Response Body Error:
```json
{
    "errors": "Name length max 100"
}
```

## Get User API
Endpoint: GET /api/users/current

Header:
- Authorization: Basic Token

Response Body Success:
```json
{
    "data": {
        "username": "sonypiay",
        "name": "Sony Darmawan"
    }
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

Header:
- Authorization: Basic Token

Response Body Success:
```json
{
    "data": "OK"
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```
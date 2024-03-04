# Contact API Spec

## Create Contact API
Endpoint: POST /api/contacts

Header:
- Authorization: Basic Token

Request Body:
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "123"
}
```

Response Body Success:
```json
{
    "data": {
        "id": "1",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "phone_number": "123"
    }
}
```

Response Body Error:
```json
{
    "errors": "Please enter a valid email address"
}
```

## Update Contact API
Endpoint: PUT /api/contacts/:id

Header
- Authorization: Basic Token

Request Body:
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "123"
}
```

Response Body Success:
```json
{
    "data": {
        "id": "1",
        "firstname": "John Edited",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "phone_number": "123"
    }
}
```

Response Body Error:
```json
{
    "errors": "Please enter a valid email address"
}
```

## Get Contact API
Endpoint: GET /api/contacts/:id

Header:
- Authorization: Basic Token

Response Body Success:
```json
{
    "data": {
        "id": "1",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "phone_number": "123"
    }
}
```

Response Body Error:
```json
{
    "errors": "Data not found"
}
```

## Search Contact API
Endpoint: GET /api/contacts

Header:
- Authorization: Basic Token

Query Params:
- name: search by firstname or lastname, optional
- email: search by email, optional
- phone: search by phone number, optional
- page: number of page, default 1
- rows: rows per page, default 10

Response Body Success:
```json
{
    "data": [
        {
            "id": "1",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john.doe@example.com",
            "phone_number": "123"
        },
        {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "jane.doe@example.com",
            "phone_number": "456"
        }
    ],
    "pagination": {
        "current_page": 1,
        "total_page": 2,
        "total_item": 20
    }
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

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
    "errors": "Data not found"
}
```
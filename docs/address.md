# Address API Spec

## Create Address API
Endpoint: POST /api/contacts/:contactId/address

Headers:
- Authorization: Basic Token

Request Body
```json
{
    "street": "Jalanin aja dulu",
    "city": "Tarakarta",
    "province": "DKI Tarakarta",
    "country": "Bumi Datar",
    "postal_code": "6969"
}
```

Response Body Success
```json
{
    "data": {
        "id": 1,
        "street": "Jalanin aja dulu",
        "city": "Tarakarta",
        "province": "DKI Tarakarta",
        "country": "Bumi Datar",
        "postal_code": "6969"
    }
}
```

Response Body Error
```json
{
    "errors": "Street is required"
}
```

## Update Address API
Endpoint: PUT /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: Basic Token

Request Body
```json
{
    "street": "Jalanin aja dulu",
    "city": "Tarakarta",
    "province": "DKI Tarakarta",
    "country": "Bumi Datar",
    "postal_code": "6969"
}
```

Response Body Success
```json
{
    "data": {
        "id": 1,
        "street": "Jalanin aja dulu updated",
        "city": "Tarakarta",
        "province": "DKI Tarakarta",
        "country": "Bumi Datar",
        "postal_code": "6969"
    }
}
```

Response Body Error
```json
{
    "errors": "Contact not found"
}
```

## Remove Address API
Endpoint: GET /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: Basic Token

Response Body Success
```json
{
    "data": {
        "id": 1,
        "street": "Jalanin aja dulu updated",
        "city": "Tarakarta",
        "province": "DKI Tarakarta",
        "country": "Bumi Datar",
        "postal_code": "6969"
    }
}
```

Response Body Error
```json
{
    "errors": "Address not found"
}
```

## List Address API
Endpoint: GET /api/contacts/:contactId/address

Headers:
- Authorization: Basic Token

Response Body Success
```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalanin aja dulu",
            "city": "Tarakarta",
            "province": "DKI Tarakarta",
            "country": "Bumi Datar",
            "postal_code": "6969"
        },
        {
            "id": 2,
            "street": "Jalanin aja dulu",
            "city": "Tarakarta",
            "province": "DKI Tarakarta",
            "country": "Bumi Datar",
            "postal_code": "6969"
        }
    ],
    "pagination": {
        "current_page": 1,
        "total_page": 2,
        "total_data": 20
    }
}
```

Response Body Error
```json
{
    "errors": "Data not found"
}
```

## Remove Address API
Endpoint: DELETE /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: Basic Token

Response Body Success
```json
{
    "data": "OK"
}
```

Response Body Error
```json
{
    "errors": "Address not found"
}
```
# API Endpoints

1. [Auth API Endpoints](#1-auth-api-endpoints)
2. [Media API Endpoints](#2-media-api-endpoints)
3. [Testing/Mock only API Endpoints](#3-testingmock-only-api-endpoints)

> [!NOTE]
> Click on text to expand details.

## 1. Auth API Endpoints

<details>

<summary>User Registration</summary>

**_Endpoint_**: POST /auth/register

**_Description_**: Register a new member in the AML system.

**_Headers_**:

- `Content-Type`: application/json

**_Request Body_**:

```json
{
    "email": "user@example.com",
    "password": "Password123"
}
```

***Response***:

- **Status**: 201 Created
- **Content-Type**: text/html
- **Body**:

```
Successfully Registered
```

</details>

<details>

<summary>User Login</summary>

**_Endpoint_**: POST /auth/login

**_Description_**: Log in to the system.

**_Headers_**:

- `Content-Type`: application/json

**_Request Body_**:

```json
{
    "email": "Administrator",
    "password": "admin123"
}
```

***_Response_***:

- **Status**: 200 OK
- **Body**:

```json
{
  "user": {
    "id": 5,
    "email": "Administrator",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJBZG1pbmlzdHJhdG9yIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM1MTY1ODA2LCJleHAiOjE3MzUxNjc2MDZ9.r6_NvkmavKD_Qdof3_8y5fWT_2V-5di0BNInhDRT6po"
}
```

</details>


## 2. Media API Endpoints

<details>

<summary>Get All Media</summary>

**_Endpoint_**: GET /media/all

**_Description_**: Get all media stored in the system.

***_Response_***:

- **Status**: 200 OK
- **Body**:

```json
[
  {
    "mediaID": 1,
    "mediaName": "The Great Gatsby",
    "creator": "F. Scott Fitzgerald",
    "publisher": "Scribner",
    "year": 1925,
    "typeID": 1
  },
  {
    "mediaID": 2,
    "mediaName": "The Hobbit",
    "creator": "J.R.R. Tolkien",
    "publisher": "Houghton Mifflin",
    "year": 1937,
    "typeID": 1
  },
  // more media ...
]
```

</details>

<details>

<summary>Media Search</summary>

**_Endpoint_**: POST /media/search [^1]

**_Description_**: Search specific media list in the system.

**_Headers_**:

- `Content-Type`: application/json

**_Request Body_**:

```json
{
    "value": "d",
    "isAdvanced": true,
    "searchBy": "all",
    "mediaTypes": {
        "all": false,
        "book": true,
        "periodical": false,
        "multimedia": true
    }
}
```

***_Response_***:

- **Status**: 200 OK
- **Body**:

```json
[
  {
    "mediaID": 1,
    "mediaName": "The Great Gatsby",
    "creator": "F. Scott Fitzgerald",
    "publisher": "Scribner",
    "year": 1925,
    "mediaType": "book"
  },
  {
    "mediaID": 4,
    "mediaName": "The Catcher in the Rye",
    "creator": "J.D. Salinger",
    "publisher": "Little, Brown and Co.",
    "year": 1951,
    "mediaType": "book"
  },
  // more media ...
]
```

</details>

## 3. Testing/Mock only API Endpoints

<details>

<summary>Check Token </summary>

**_Endpoint_**: POST /auth/token

**_Description_**: To check token from frontend.

</details>

<details>

<summary>Auth/Admin/Memeber access (For mocking access)</summary>

**_List of APIs_**:

<pre>
  <b>Endpoint</b>: GET /auth/access
  <b>Description</b>: Any role-restricted access to the system.
</pre>

<pre>
  <b>Endpoint</b>: GET /admin/access
  <b>Description</b>: Admin role-restricted access to the system.
</pre>

<pre>
  <b>Endpoint</b>: GET /member/access
  <b>Description</b>: Member role-restricted access to the system.
</pre>

**_Headers_**:

- `Authorization`: Bearer [token] (required)

***_Response_***:

- **Status**: 200 OK
- **Body**:

```json
{
  "accountID": 5,
  "email": "Administrator",
  "password": "$2a$10$eSHkTPbxVIxZB6ae8cq2BO4YMxkLStFRVIWNBpSZ3pSckhdO2AeXq",
  "roleID": 2
}
```

</details>

[^1]: For simplicity & short URL in prototype. May migrate to GET method in actual development.

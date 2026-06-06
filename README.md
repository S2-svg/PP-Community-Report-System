# PP-Community-Report-System

Backend API for the Phnom Penh Community Reporting System.

## Run locally

```bash
npm install
npm run dev
```

Create a `.env` from `.env.example`, import `pp_crs_db.sql` into MySQL, then start the API.

## API Endpoints

Base URL:

```txt
http://localhost:3000
```

Protected endpoints require this header:

```txt
Authorization: Bearer <token>
```

### Health

| Method | Endpoint  | Access | Description                    |
| ------ | --------- | ------ | ------------------------------ |
| GET    | `/health` | Public | Check that the API is running. |

### Auth

| Method | Endpoint                    | Access        | Description                             |
| ------ | --------------------------- | ------------- | --------------------------------------- |
| POST   | `/api/auth/register         | Public        | Start registration.                     |
| POST   | `/api/auth/login`           | Public        | Login and receive a JWT token.          |
| PATCH  | `/api/auth/change-password` | Authenticated | Change current user's password.         |
| POST   | `/api/auth/logout`          | Authenticated | Logout current user.                    |

Register body:

```json
{
  "fullName": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123",
  "phoneNumber": "012345678"
}
```

Verify OTP body:

```json
{
  "tempUserId": 1,
  "otpCode": "123456"
}
```

Login body:

```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```

Change password body:

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

### Users

| Method | Endpoint                   | Access        | Description                    |
| ------ | -------------------------- | ------------- | ------------------------------ |
| GET    | `/api/user/profile`        | Authenticated | Get current user's profile.    |
| PATCH  | `/api/user/profile`        | Authenticated | Update current user's profile. |
| GET    | `/api/user/users`          | Admin         | Get all users.                 |
| PATCH  | `/api/user/users/:id/role` | Admin         | Update a user's role.          |
| DELETE | `/api/user/users/:id`      | Admin         | Delete a user.                 |

Update profile body:

```json
{
  "fullName": "Updated User",
  "username": "updateduser",
  "phoneNumber": "012345678",
  "profileImage": "/uploads/profile.png",
  "gender": "Male",
  "dateOfBirth": "2000-01-01",
  "address": "Phnom Penh",
  "bio": "Community reporter"
}
```

Update role body:

```json
{
  "role": "Admin"
}
```

Role can be `Citizen` or `Admin`.

### Categories

| Method | Endpoint              | Access | Description             |
| ------ | --------------------- | ------ | ----------------------- |
| GET    | `/api/categories`     | Public | Get all categories.     |
| GET    | `/api/categories/:id` | Public | Get one category by ID. |
| POST   | `/api/categories`     | Admin  | Create a category.      |
| PUT    | `/api/categories/:id` | Admin  | Update a category.      |
| DELETE | `/api/categories/:id` | Admin  | Delete a category.      |

Create or update category body:

```json
{
  "categoryName": "Road Damage",
  "description": "Broken road or pothole",
  "imageUrl": "/uploads/road.png"
}
```

### Reports

| Method | Endpoint                              | Access        | Description                                         |
| ------ | ------------------------------------- | ------------- | --------------------------------------------------- |
| GET    | `/api/reports`                        | Authenticated | Get all reports.                                    |
| POST   | `/api/reports`                        | Authenticated | Create a report with optional image uploads.        |
| GET    | `/api/reports/search?q=keyword`       | Authenticated | Search reports by title, description, or location.  |
| GET    | `/api/reports/users/:userId`          | Authenticated | Get reports by user ID.                             |
| GET    | `/api/reports/categories/:categoryId` | Authenticated | Get reports by category ID.                         |
| GET    | `/api/reports/statuses/:status`       | Authenticated | Get reports by status ID or status name.            |
| GET    | `/api/reports/:id/timeline`           | Authenticated | Get status change timeline for a report.            |
| GET    | `/api/reports/:id`                    | Authenticated | Get one report by ID.                               |
| PUT    | `/api/reports/:id`                    | Authenticated | Update a report.                                    |
| PATCH  | `/api/reports/:id/status`             | Admin         | Update a report status and create a timeline entry. |
| DELETE | `/api/reports/:id`                    | Authenticated | Delete a report.                                    |

Create report uses `multipart/form-data`:

```txt
categoryId: 1
title: Broken street light
description: The street light is not working at night
location: Street 123, Phnom Penh
images: <file> optional, max 5 files
```

Update report body:

```json
{
  "categoryId": 1,
  "title": "Updated report title",
  "description": "Updated report description",
  "location": "Updated location"
}
```

Update report status body:

```json
{
  "statusId": 2,
  "note": "Assigned to field team"
}
```

### Notifications

| Method | Endpoint             | Access        | Description                                                                   |
| ------ | -------------------- | ------------- | ----------------------------------------------------------------------------- |
| GET    | `/api/notifications` | Authenticated | Get notifications. Admin gets all notifications; citizens get only their own. |

### Dashboard

| Method | Endpoint                          | Access | Description                      |
| ------ | --------------------------------- | ------ | -------------------------------- |
| GET    | `/api/dashboard/report-summary`   | Admin  | Get report summary statistics.   |
| GET    | `/api/dashboard/user-summary`     | Admin  | Get user summary statistics.     |
| GET    | `/api/dashboard/category-summary` | Admin  | Get category summary statistics. |

### Static Uploads

| Method | Endpoint             | Access | Description            |
| ------ | -------------------- | ------ | ---------------------- |
| GET    | `/uploads/:filename` | Public | View an uploaded file. |

Example:

```txt
GET /uploads/1780390197232-798549433.jfif
```

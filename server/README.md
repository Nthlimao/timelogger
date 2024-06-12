# Timelogger API ⏲️

## Overview

**Timelogger** API/Backend, responsible for the entire data management process and for providing the essential functionalities for the application.

The application consists of a time manager for projects, where it is possible to manage projects and their respective tasks. The system offers JWT authentication for security and CRUD functionalities.

## Architecture

The **Timelogger** application was developed using an architecture based on the **MVC** (Model-View-Controller) standard. Diagram of the system's architecture is shown below.

![API-diagram](../readme-assets/diagram-api.png)

## Getting Started

### Requirements

- **.NET Core 8.0**: To run the server you will need .NET Core 8.0. To download and install, follow the instructions in the documentation: [Microsoft .NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).

### Preparing the environment

To prepare the environment and run the application, follow the instructions below:

1. Clone the repository.
2. Make sure you have the .NET 8 installed on your machine.
3. Navigate to the `/server` directory of the project.

### Running the application

1. Open the terminal in the `/server` directory of the project.
2. Run the command `dotnet restore` to restore nuget packages.

```powershell
  dotnet restore
```

3. Then, run the command `dotnet build` to build the solution.

```powershell
  dotnet build
```

4. Navigate to the `Timelogger.Api` directory: `cd /Timelogger.Api/`.

```powershell
  cd /Timelogger.Api/
```

5. Then, run the command `dotnet run` to starts the server.

```powershell
  dotnet run
```

### Acessing the application

After the application is running, it will available at http://localhost:3001.

## Testing

After prepare the environment (following the steps above), follow the instructions below:

1. Navigate to the `Timelogger.Api` directory: `cd /Timelogger.Api.Tests/`.

```powershell
  cd /Timelogger.Api.Tests/
```

Then, run the command `dotnet test` to run the tests.

```powershell
  dotnet test
```

## API Endpoits

Let's now go through the existing **endpoints** on our API.

> [!NOTE]
> Bearer token authentication is used for all requests. The token is inserted in the `Authorization` header.

### Auth

#### **POST** Login - `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request**

```json
{
  "email": "example@email.com",
  "password": "password"
}
```

**Response**

```json
{
  "token": "token"
}
```

### User

#### **GET** Details - `/api/users/details`

Returns the user details.

**Response**

```json
{
  "name": "User Name",
  "email": "example@email.com",
  "role": 1
}
```

#### **GET** Customers - `/api/users/customers`

Returns the list of existing customers on the platform, so that the Freelancer can link them to the Project.

**Response**

```json
{
  "name": "User Name",
  "email": "example@email.com",
  "role": 1
}
```

### Project

#### **GET** Projects - `/api/projects?sortDirection=desc&sortBy=Id&page=1&limit=10`

Returns a paginated list of the User's Projects, whether Customer or Freelancer.

As it is a _paginated list_, you can define the number of items per page and the page number via query, as well as sorting in ascending or descending order.

**Params**

- **sortDirection**: Sort direction: "asc" or "desc" (default value: "asc")
- **sortBy**: Sort By Column: ["Id", "Name", Deadline"] (Default value: "Id")
- **page**: Page Number (Default and Min. value: 1)
- **limit**: Number of items per Page (Default and Min. value: 10)

**Response**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Project Name",
      "deadline": "2025-06-30T00:00:00",
      "freelancerId": 1,
      "customerId": 1,
      "totalTimeSpent": 0,
      "status": 0,
      "customer": "Customer"
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 1,
  "totalItems": 1,
  "columns": [
    {
      "id": "name",
      "header": "Name",
      "hasSort": true
    },
    {
      "id": "deadline",
      "header": "Deadline",
      "hasSort": true
    },
    {
      "id": "totalTimeSpent",
      "header": "TotalTimeSpent",
      "hasSort": false
    },
    {
      "id": "customer",
      "header": "Customer",
      "hasSort": false
    }
  ]
}
```

#### **GET** Project - `/api/projects/:id`

Returns the details of the selected Project.

**Response**

```json
{
  "id": 1,
  "name": "Project Name",
  "deadline": "2024-07-15T00:00:00",
  "freelancerId": 1,
  "customerId": 1,
  "totalTimeSpent": 93600000, // milliseconds
  "status": 2,
  "customer": "Customer"
}
```

#### **POST** Create Project - `/api/projects/`

Create a new Project. Returns a OK.

**Request**

```json
{
  "name": "Project",
  "customerId": 1,
  "deadline": "12/06/2024",
  "status": 1
}
```

**Response**

HTTP CODE 200 OK

#### **PUT** Update Project - `/api/projects/:id`

Update the indicated, `:id`, Project. Returns a _OK_.

**Request**

```json
{
  "name": "Project",
  "customerId": 1,
  "deadline": "12/06/2024",
  "status": 1
}
```

**Response**

HTTP CODE 200 OK

#### **DELETE** Delete Project - `/api/projects/:id`

Delete the indicated, `:id`, Project. Returns a _No Content_.

**Response**

HTTP CODE 204 NO CONTENT

### Task

#### **GET** Projects - `/api/tasks/:projectId/all?sortDirection=desc&sortBy=Id&page=1&limit=10`

Returns a paginated list of the User's Projects (`:projectId`) Tasks, whether Customer or Freelancer.

As it is a _paginated list_, you can define the number of items per page and the page number via query, as well as sorting in ascending or descending order. You can also filter items by _Category_ and _Type_.

**Params**

- **sortDirection**: Sort direction: "asc" or "desc" (default value: "asc")
- **sortBy**: Sort By Column: ["Id", "Name", Deadline"] (Default value: "Id")
- **page**: Page Number (Default and Min. value: 1)
- **limit**: Number of items per Page (Default and Min. value: 10)
- **filterBy**: filter By Column: ["Category", "Type"]
- **filterId**: Filter Id: Id of the Category or Type selected for filtering.

**Response**

```json
{
  "items": [
    {
      "id": 10,
      "title": "Task Title",
      "timeSpent": 10800000,
      "projectId": 1,
      "userId": 1,
      "category": {
        "id": 1,
        "name": "Task Category"
      },
      "type": {
        "id": 1,
        "name": "Task Type",
        "icon": "icon"
      },
      "status": 1
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 1,
  "totalItems": 1,
  "columns": [
    {
      "id": "title",
      "header": "Title",
      "hasSort": true
    },
    {
      "id": "statusName",
      "header": "Status",
      "hasSort": false
    },
    {
      "id": "categoryName",
      "header": "Category",
      "hasSort": false
    },
    {
      "id": "typeName",
      "header": "Type",
      "hasSort": false
    },
    {
      "id": "timeSpent",
      "header": "TimeSpent",
      "hasSort": true
    }
  ]
}
```

#### **GET** Taks - `/api/tasks/:id`

Returns the details of the selected Task.

**Response**

```json
{
  "id": 1,
  "title": "Task Name",
  "timeSpent": 7200000, // milliseconds
  "projectId": 1,
  "userId": 1,
  "category": {
    "id": 1,
    "name": "Task Category"
  },
  "type": {
    "id": 1,
    "name": "Task Type",
    "icon": "icon"
  },
  "status": 0
}
```

#### **POST** Create Task - `/api/tasks/`

Create a new Task. Returns a OK.

**Request**

```json
{
  "title": "Task",
  "timeSpent": 100000,
  "projectId": 1,
  "taskCategoryId": 1,
  "taskTypeId": 1
}
```

**Response**

HTTP CODE 200 OK

#### **PUT** Update Task - `/api/tasks/:id`

Update the indicated, `:id`, Task. Returns a _OK_.

**Request**

```json
{
  "title": "Task",
  "timeSpent": 100000,
  "projectId": 1,
  "taskCategoryId": 1,
  "taskTypeId": 1
}
```

**Response**

HTTP CODE 200 OK

#### **DELETE** Delete Task - `/api/tasks/:id`

Delete the indicated, `:id`, Task. Returns a _No Content_.

**Response**

HTTP CODE 204 NO CONTENT

### Task Category

#### **GET** Task Categories - `/api/taskcategories/`

Returns a list of the tasks categories.

**Response**

```json
[
  {
    "id": 1,
    "name": "Requirements"
  },
  {
    "id": 2,
    "name": "Design"
  },
  {
    "id": 3,
    "name": "Planning"
  }
]
```

### Task Type

#### **GET** Task Types - `/api/tasktypes/`

Returns a list of the tasks type.

**Response**

```json
[
  {
    "id": 1,
    "name": "Story",
    "icon": "user"
  },
  {
    "id": 2,
    "name": "Task",
    "icon": "user"
  },
  {
    "id": 3,
    "name": "Feature",
    "icon": "user"
  },
  {
    "id": 4,
    "name": "Issue",
    "icon": "user"
  }
]
```

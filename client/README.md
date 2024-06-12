# Timelogger ⏲️

## Overview

Timelogger is a front-end (FE) application that simplifies the management of projects and their respective activities. With its main focus on accounting for the time dedicated to each task, Timelogger offers users a view of the project's progress and productivity.

### Main Features

- **Projects List**: An overview of all the user's projects with a paginated interface that lets you navigate between projects.
- **Task Management**: View the details of each task within a project. View all the activities in a project in an organized and paginated way, with the option of sorting by relevant columns, such as title or time spent.
- **Time Tracking**: Timelogger allows you to record the time spent on each activity (in minutes), giving you an overview of time spent.

## Getting Started

### Requirements

- **Node**: To run the client _"server"_ you will need node version `>=20.11`. To download and install, follow the instructions in the documentation: [Node.JS Package Manager](https://nodejs.org/en/download/package-manager). And also included the `npm` which will also be required.

### Preparing the environment

To prepare the environment and run the application, follow the instructions below:

1. Clone the repository.
2. Make sure you have the node `>=20.11` installed on your machine.
3. Navigate to the `/client` directory of the project.

### Running the application

1. Open the terminal in the `/client` directory of the project.
2. Run the command `npm install` to install the packages/dependencies.

```bash
  npm install
```

3. The, run the command `npm run start` to starts the server.

```bash
  npm run start
```

### Acessing the application

After the application is running, it will available at http://localhost:3000.

## Using the application

To access the authenticated areas you need to log in to the application, but we don't have a registration area, so here are some available credentials.

### Available Credentials

| Email                 | Password   | Role       |
| --------------------- | ---------- | ---------- |
| free001@email.com     | freelancer | Freelancer |
| free002@email.com     | freelancer | Freelancer |
| customer001@email.com | customer1  | Customer   |
| customer002@email.com | customer2  | Customer   |

## Testing

After prepare the environment (following the steps above), run the command `npm run test` to run the tests.

```bash
  npm run test
```

# Momentum - Progress Tracking Web Application

## Overview

**Momentum** is a web application designed for companies to manage employees and their delegated tasks. It allows companies to track progress, assign tasks, and monitor the status of various projects and activities within the organization. The app provides an intuitive interface for managing tasks, assigning employees, and tracking the completion of each task.

This project is built with _React_ and uses API authentication with bearer tokens for security and user management. The app is powered by **Vite** for fast builds and development.

## Features

- **Task Management**: Add, edit, and track tasks assigned to employees.
- **Employee Management**: Manage employee information and assign tasks to specific employees.
- **Task Status**: View tasks by status (To Do, In Progress, Ready for Testing, Completed).
- **Filters**: Filter tasks by department, priority, and employee.
- **Authentication**: Secure access with bearer token authentication for sensitive operations.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/GBaga/Project-33-RedBerry-Momentum/momentum.git
   Navigate to the project folder:
   ```

cd momentum
Install dependencies:

npm install
Run the development server:

npm start
This will start the application on http://localhost:1573.

Technologies Used
React: Front-end framework for building the user interface.
Vite: A fast build tool and development server for React projects.
React Query: For efficient data fetching and state management.
Axios: For making HTTP requests to the API.
CSS: For styling the components and layouts.
Bearer Token Authentication: For securing API requests.
API Endpoints
The app interacts with the following endpoints:

/tasks: Fetches all tasks and task details.
/departments: Fetches all departments for filtering.
/priorities: Fetches available task priorities for filtering.
/employees: Fetches the list of employees for assignment to tasks.
Environment Variables
You need to set up the following environment variables:

REACT_APP_API_URL: The base URL for your API.
Folder Structure
The project folder is organized as follows:

/src
/components # Reusable components (e.g., TaskCard, Loader)
/config # API configurations (Axios setup)
/pages # Pages of the app (e.g., TaskList, EmployeeManagement)

## Progress and To-Do

### Completed:

- Task listing, creation, and assignment.
- Employee filtering and task filtering by department, priority, and employee.
- Task status updates and progress tracking.

### To-Do:

- User authentication (login/logout).
- Additional features for task management (e.g., due date, notifications).
- Improve error handling for failed API requests.
- Add tests for components and API functions.

## Contributing

We welcome contributions! If you'd like to contribute to the project, please fork the repository and submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to:

- **Email**: g.bagauri@yahoo.com
- **GitHub**: https://github.com/GBaga

## API Reference

#### Get all items

# Server with only NodeJS

A pure Node.js HTTP server implementation for the DevFull NodeJS course without external dependencies.

## Description

This project demonstrates how to build a web server using only Node.js native modules (no Express or other frameworks). It implements a modular architecture with routing for user operations and file downloads.

## Installation

Clone the repository:

```bash
git clone https://github.com/cursosdevfull/NodeJS-_Group21.git
cd NodeJS-_Group21
```

No external dependencies are required as the project only uses built-in Node.js modules.

## Usage

Start the server:

```bash
node index.js
```

The server will run on port 3000. You can access the following endpoints:

## API Endpoints

### User Endpoints
- `GET /user` - Get all users
- `POST /user` - Create a new user
- `GET /user/detail` - Get detailed information about a user
- `GET /user/video` - Stream a video file

### File Endpoints
- `GET /download` - Download a PDF file

## Testing

The project includes a `request.http` file with sample requests that can be used with REST client extensions in your editor.

## Project Structure

```
NodeJS-_Group21/
├── app.js                 # Main application logic and route handling
├── index.js               # Server initialization
├── package.json           # Project metadata
├── README.md              # Project documentation
├── request.http           # HTTP requests for testing
├── .gitignore             # Git ignore configuration
└── modules/               # Application modules
    ├── core/              # Core functionality
    │   └── errors/        
    │       └── not-found.js  # 404 error handler
    ├── file/              # File operations module
    │   ├── file.js        # File download functionality
    │   └── routes.js      # File routes definition
    └── user/              # User module
        ├── routes.js      # User routes definition
        └── user.js        # User operations implementation
```

Note: Video (*.mp4) and PDF (*.pdf) files are excluded from the above structure as they are listed in .gitignore.

## Architecture

The application follows a modular architecture:
- Each feature is organized into its own module directory
- Modules contain both functionality implementation and route definitions
- Routes from different modules are combined in the main app.js
- Error handling is centralized with the NotFound module

## License

ISC

## Repository

[GitHub Repository](https://github.com/cursosdevfull/NodeJS-_Group21)
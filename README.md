# Video Chat Application Frontend

This project is a frontend application for a random video chat service, built using React. The application allows users to register, log in, and start a video chat with random users filtered by gender. The backend service is built with Node.js, Express, and WebRTC for real-time video communication.

## Features

- User Registration
- User Login
- Random Video Chat
- Gender Filter (Male, Female, Both)

## Technologies Used

- React
- Axios for HTTP requests
- Socket.io-client for WebRTC signaling
- HTML5 Video for media streams

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```sh
git clone <repository-url>

Navigate to the project directory:

cd video-chat-frontend
Install the dependencies:

npm install
Running the Application
Start the development server:
npm start
The application will start on http://localhost:3000.

Project Structure
src/components/Auth: Contains the components for user registration and login.
src/components/Chat: Contains the component for the video chat functionality.
src/components/App.js: The main application component.
src/index.js: The entry point of the application.
Configuration
The frontend is configured to proxy API requests to http://localhost:5000. Ensure your backend server is running on this port or change the proxy setting in the package.json file.

"proxy": "http://localhost:5000"

Notes
The backend service should handle user authentication and WebRTC signaling. Ensure the backend is set up and running correctly before starting the frontend. Here is the repository for your reference
https://github.com/schy-dev/random-video-chat-backend
This project assumes the backend is built as described in the backend repository.

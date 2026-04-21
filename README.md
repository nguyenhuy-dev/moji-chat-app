# Moji Chat App

A full-stack chat application built with modern web technologies, featuring real-time messaging, user authentication, and a responsive UI.

## Features

- **Real-time Messaging:** Chat instantly with friends.
- **User Authentication:** Secure login and registration using JWT and bcrypt.
- **Dynamic User Profiles:** Customizable avatars and profiles.
- **Responsive UI:** Built with TailwindCSS v4 and Radix UI components (Shadcn UI) for a seamless experience on all devices.
- **State Management:** Fast and predictable state management using Zustand.
- **API Documentation:** Integrated Swagger UI for backend API reference.

## Tech Stack

### Frontend
- **Framework:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4
- **UI Components:** Shadcn UI (Radix UI), Lucide React Icons
- **State Management:** Zustand
- **Routing:** React Router
- **Forms & Validation:** React Hook Form, Zod
- **Notifications:** Sonner
- **Testing/Linting:** ESLint

### Backend
- **Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **Documentation:** Swagger UI

## Prerequisites

Ensure you have the following installed to run the application locally:
- Node.js (v18+ recommended)
- MongoDB

## Installation and Setup

### 1. Clone the Repository
```bash
git clone <repository_url>
cd moji-chat-app
```

### 2. Backend Setup
Navigate into the `backend` directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Set up your environment variables:
- Create a `.env` file based on `.env.sample`.
- Ensure it contains your `MONGO_URI`, `JWT_SECRET`, etc.

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate into the `frontend` directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## Available Scripts

### Frontend Scripts (`/frontend`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the Vite project for production.
- `npm run lint`: Runs ESLint for code formatting checks.
- `npm run preview`: Previews the built production app locally.

### Backend Scripts (`/backend`)
- `npm run dev`: Runs the backend on nodemon for hot-reloading during development.
- `npm start`: Starts the standard Node server.

## License
ISC

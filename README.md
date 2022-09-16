# Description

A task web application made on top of MongoDB, Express, React and Node stack.

## Key Features

1. Sign in/Sign up/Sign out
2. User authentication using **`jwt token`**
3. Perform **CRUD** operations on tasks
4. Authenticated routes for users with **`admin`** role
5. Delete users
6. Toggle user roles

## Tools Used

#### Front-end

- [React](https://reactjs.org/) (Front-end JS UI Library)
- [TypeScript](https://www.typescriptlang.org/) (Static Typing)
- [React Redux](https://react-redux.js.org/) (React bindings for Redux)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- [React Query](https://react-query.tanstack.com/) (Data Synchronization)
- [Material UI](https://mui.com/) (UI Component Library)
- [React Router v6](https://reactrouter.com/docs/en/v6) (Client/Server side Routing)
- [Vite](https://vitejs.dev/guide) (Build Tool)

#### Back-end

- [Express](https://expressjs.com/) (Node.js Framework)
- [TypeScript](https://www.typescriptlang.org/) (Static Typing)
- [Mongoose](https://mongoosejs.com/) (Object Modeling for MongoDB)
- [JSON Web Token](https://jwt.io/) (User Authentication)
- [Joi](https://github.com/hapijs/joi#readme) (Schema/Data Validator)

## Installation

### 1. Clone this repository.

```bash
git clone https://github.com/seancaleb/note-it-mern.git <YOUR_PROJECT_NAME>
```

- Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.

### 2. Setting up the client

- Move to client directory: `cd client`.

- Run `yarn install` in order to install the necessary dependencies.

- Create a `.env` file on the root directory
```bash
// Put the local server URL here (ex. http://localhost:3000)
// This is where your server is running
// Note:
// 1. The default PORT specified in .env.example in the server directory is 3000
// 2. Make sure there is no trailing slash (/) at the end of the url


VITE_DEV_URL = YOUR_LOCAL_SERVER_URL 
```

### 3. Setting up the server
> Before setting up the server make sure you have MongoDB and MongoDB Compass installed on your machine. You can install it [here](https://mongodb.com/try/download/community). You can check this [video](https://www.youtube.com/watch?v=3wqzr-GJoS0) for a brief guide on how to do the step-by-step process of installation.

- Move to server directory: `cd server`.

- Run `yarn install` in order to install the necessary dependencies.
tmo
- Create a `.env` file on the root directory and copy the values from __.env.example__.

- Only fill up the `MONGO_PATH` and `JWT_SECRET` fields with their appropriate values.
```bash
// Note: You can find your local mongo URI path inside of MongoDB Compass
MONGO_PATH = YOUR_LOCAL_MONGO_PATH  
JWT_SECRET = YOUR_JWT_SECRET
```

### 4. Run the project
- Run the client locally
```bash
yarn dev
```

- Run the server locally
```bash
yarn dev
```

# Expense Tracker

A full-stack expense-tracking application for recording income and expenses, reviewing balances, and viewing monthly category summaries. Every account has its own protected transactions and profile.

See our project here:
### https://expenses-tracker-lime-seven.vercel.app/

## Features

- Create an account, sign in, and sign out with JWT-based authentication
- Add income and expense transactions with category, amount, date, and optional notes
- View total income, expenses, and available balance
- Filter transaction history by type, category, and date range
- Delete transactions
- View this month's or last month's category breakdown
- Update the signed-in user's display name
- Amounts are displayed in Nepalese rupees (NPR)

## Tech stack

- **Client:** React, Vite, React Router, React Hook Form, Axios
- **Server:** Node.js, Express, Mongoose, JSON Web Tokens
- **Database:** MongoDB

## Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/) 20.19 or later
- npm (included with Node.js)
- A MongoDB database, either local MongoDB or a MongoDB Atlas cluster

## Project structure

```text
Expenses_Tracker/
├── client-side/
│   └── Expenses-Tracker/   # React + Vite application
└── server-side/            # Express + MongoDB API
```

## Installation and local setup

1. Clone the repository and enter the project folder.

   ```bash
   git clone <your-repository-url>
   cd Expenses_Tracker
   ```

2. Install the server dependencies.

   ```bash
   cd server-side
   npm install
   ```

3. Create `server-side/.env` and add your MongoDB connection string and a strong JWT secret.

   ```env
   CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster-url>/expense-tracker
   JWT_SECRET=replace-this-with-a-long-random-secret
   PORT=5067
   ```

   `PORT` is optional; the API uses `5067` when it is not set. Do not commit this file or expose its values.

4. Start the API server.

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5067`.

5. In a second terminal, install the client dependencies.

   ```bash
   cd client-side/Expenses-Tracker
   npm install
   ```

6. Create `client-side/Expenses-Tracker/.env` for the client API URL.

   ```env
   VITE_API_URL=http://localhost:5067/api
   ```

   This variable is optional for local development because the client already falls back to this URL. Set it when using a deployed API.

7. Start the client.

   ```bash
   npm run dev
   ```

   Open the URL printed by Vite, normally `http://localhost:5173`.

## Available scripts

| Location | Command | Description |
| --- | --- | --- |
| `server-side` | `npm run dev` | Starts the Express server in watch mode. |
| `server-side` | `npm start` | Starts the Express server. |
| `client-side/Expenses-Tracker` | `npm run dev` | Starts the Vite development server. |
| `client-side/Expenses-Tracker` | `npm run build` | Creates a production client build in `dist/`. |
| `client-side/Expenses-Tracker` | `npm run preview` | Serves the production build locally. |
| `client-side/Expenses-Tracker` | `npm run lint` | Runs ESLint. |

## API overview

All transaction routes require an `Authorization: Bearer <token>` header. A token is returned after a successful login.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account. |
| `POST` | `/api/auth/login` | Sign in and receive a JWT. |
| `GET` | `/api/auth/me` | Get the current user's profile. |
| `PUT` | `/api/auth/me` | Update the current user's name. |
| `GET` | `/api/transactions` | Get the current user's transactions. |
| `GET` | `/api/transactions/balance` | Get income, expenses, and balance totals. |
| `POST` | `/api/transactions` | Create a transaction. |
| `PUT` | `/api/transactions/:id` | Update a transaction. |
| `DELETE` | `/api/transactions/:id` | Delete a transaction. |

## Deployment notes

- Set `VITE_API_URL` to the deployed API URL, including `/api`, before building the client.
- Add the deployed client URL to the `origin` list in `server-side/server.js` so browser requests are allowed by CORS.
- Configure `CONNECTION_STRING` and `JWT_SECRET` as server-side environment variables in your hosting provider.
- Run `npm run build` in `client-side/Expenses-Tracker` and deploy the resulting `dist` folder to a static hosting service.

## Security notes

- Keep `.env` files private. They are ignored by Git in this project.
- Use a long, unique `JWT_SECRET` in every environment.
- The API derives the signed-in user from the JWT, so users can only access their own transactions.

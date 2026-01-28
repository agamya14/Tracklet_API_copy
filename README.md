TrackLet API 🚀

TrackLet is a backend service for managing subscriptions and sending automated renewal reminders.
It allows users to track active subscriptions and uses event-driven workflows to schedule reminder notifications before renewal dates.

This project focuses on clean backend architecture, workflow scheduling, and real-world async handling using modern tools.

✨ Features

User authentication (signup & login)

Subscription management (create, fetch, track status)

Automatic renewal reminders (7, 5, 2, 1 days before renewal)

Event-driven workflows using Upstash QStash

MongoDB persistence with Mongoose

Environment-based configuration for development & production

🛠️ Tech Stack

Node.js – Runtime

Express.js – API framework

MongoDB + Mongoose – Database & ODM

Upstash QStash / Workflow – Background jobs & reminders

Day.js – Date handling

JWT – Authentication

Nodemon – Development workflow

📂 Project Structure
TrackLet/
│
├── controllers/        # Request handlers
├── models/             # Mongoose schemas
├── routes/             # API routes
├── workflows/          # Upstash workflow handlers
├── middleware/         # Auth & error handling
├── config/             # Database & third-party configs
├── app.js              # Express app setup
├── server.js           # Server entry point
└── README.md

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5500
NODE_ENV=development

DB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1y

SERVER_URL=http://localhost:5500

QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token


⚠️ .env files are ignored via .gitignore and should never be committed.

▶️ Running the Project Locally
1️⃣ Install dependencies
npm install

2️⃣ Start the server
npm run dev


The API will run at:

http://localhost:5500

🔁 Workflow & Reminders (How it works)

A user creates an active subscription with a future renewal date.

A workflow is triggered via Upstash QStash.

The workflow:

Fetches the subscription

Calculates reminder dates

Sleeps until each reminder point

Triggers reminder logs/events

Expired or inactive subscriptions are ignored automatically.

This ensures reminders are reliable, async, and retry-safe.

🧪 Local Workflow Testing

Run the QStash dev server:

npx @upstash/qstash-cli dev


Then publish a message to your workflow endpoint using curl.exe (Windows):

curl.exe -X POST "http://127.0.0.1:8080/v2/publish/http%3A%2F%2Flocalhost%3A5500%2Fapi%2Fv1%2Fworkflows%2Fsubscription%2Freminder" `
  -H "Authorization: Bearer YOUR_QSTASH_TOKEN" `
  -H "Content-Type: application/json" `
  -d "{ \"subscriptionId\": \"<SUBSCRIPTION_ID>\" }"

📌 Status Handling

active → reminders scheduled

expired → workflow exits early

Past renewal dates → workflow stops safely

🚧 Future Improvements

Email / notification integration

Subscription analytics & insights

User-defined reminder schedules

Configuring and extending new API routes

Production QStash deployment

Admin dashboard

👤 Author

Built by Shashwat Tiwari, focusing on backend architecture, workflow orchestration, and solving real-world subscription management problems.

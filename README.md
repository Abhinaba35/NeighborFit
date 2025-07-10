# 🌆 NeighborFit

**NeighborFit** is a modern web platform to help you explore and evaluate Indian cities 🏙️ based on safety 🛡️, education 🎓, health 🏥, transport 🚌, entertainment 🎉, and more. Users can leave reviews ✍️ and admins can manage cities through a dashboard 🧑‍💼.

---

## 🔗 Live Links

- 🚀 **Frontend (Vercel):** [https://neighbor-fit-three.vercel.app/](https://neighbor-fit-three.vercel.app/)
- 🛠️ **Backend (Render):** [https://neighborfit-vu7z.onrender.com](https://neighborfit-vu7z.onrender.com)
- 🧑‍💻 **GitHub Repo:** [https://github.com/Abhinaba35/NeighborFit](https://github.com/Abhinaba35/NeighborFit)

---

## ✨ Features

- 🔐 JWT Authentication (Login/Register)
- 🌇 Explore Indian Cities with ratings
- 📄 Detailed city info by section (Safety, Transport, etc.)
- 💬 Review system for logged-in users
- 🧑‍💼 Admin panel to add/manage cities
- 🧠 AI Chatbot (Coming Soon!)
- 🖼️ Cloudinary image upload (Coming Soon)

---

## 🧰 Tech Stack

**Frontend:**
- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🧭 React Router DOM
- 📡 Axios

**Backend:**
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT Auth + bcrypt

**Deployment:**
- ⚙️ Vercel (Frontend)
- ⚙️ Render (Backend)

---

## 🏗️ Folder Structure

NeighborFit/
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Login, Register, Explore, Admin
│ ├── utils/ # Auth utils (setAuthInfo, isLoggedIn)
│ └── App.jsx
│
├── server/ # Express backend
│ ├── models/ # Mongoose schemas (User, City, Review)
│ ├── routes/ # API routes
│ ├── controllers/ # Logic handlers
│ ├── middleware/ # Auth middleware
│ └── index.js
└── README.md


---

## ⚙️ Getting Started

### 🧩 Prerequisites

- Node.js v16+
- MongoDB or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 🚀 Installation

#### 1. Clone Repository

```bash
git clone https://github.com/Abhinaba35/NeighborFit.git
cd NeighborFit
2. Install Dependencies
Backend:

cd server
npm install
Frontend:

cd ../client
npm install
🔐 Environment Variables
Create a .env file in the server/ folder:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Create a .env file in the client/ folder:

VITE_API_BASE_URL=https://neighborfit-vu7z.onrender.com/api
▶️ Run Locally
Start Backend:

cd server
npm run dev
Start Frontend:

cd client
npm run dev
Visit http://localhost:5173

🔐 Admin Access
When registering, you can select the admin role.

🧑‍💼 Admins are redirected to /admin

👥 Users are redirected to /explore

🧠 Coming Soon
🤖 AI-based chatbot to recommend cities

🖼️ Image uploads with Cloudinary

🔎 Search and filters for cities

👍 Review likes/upvotes

🙋‍♂️ Author
Made with 💛 by Abhinaba Das

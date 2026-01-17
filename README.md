# Smart Control Hub 🔌📡

A local web-based smart control dashboard that scans devices connected to a Wi‑Fi network and displays them in a modern UI.

## 🚀 Features (Version 1)
- Scan local Wi‑Fi network
- Detect connected devices (IP & MAC)
- Backend API using Node.js & Express
- Modern dark-mode frontend dashboard
- Manual network scan button

## 🛠 Tech Stack
- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript
- Networking: System ARP scan (Linux)
- Tools: VS Code, Nodemon

## 📂 Project Structure



smart-control-hub/
├── backend/
├── frontend/
└── README.md


## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev

Frontend

Open frontend/index.html in your browser
(or use Live Server)

🧠 Future Plans

Device type detection

Smart LED control

Bluetooth scanning

Mobile app version

👤 Author

Lemi Wambui
Diploma in ICT


This README alone already makes you look **serious**.

---

# STEP C: Initialize Git (VS Code friendly)

## Option 1: Using VS Code UI (Recommended)

1. Click **Source Control icon** (left sidebar ⎇)
2. Click **“Initialize Repository”**
3. VS Code will start tracking files

---

## Option 2: Minimal terminal (also OK)

In VS Code terminal (inside `smart-control-hub`):

```bash
git init
git add .
git commit -m "Initial commit: Smart Control Hub v1"


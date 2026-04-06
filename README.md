# 🌉 Volunteer Bridge Frontend

A modern web application that connects volunteers, project managers, and donors to collaborate on impactful community projects.

Volunteer Bridge provides a seamless platform for managing tasks, tracking project progress, submitting reports, receiving notifications, and supporting initiatives through donations.

---

## 🔗 Live Demo

- Frontend: https://your-vercel-link.vercel.app
- Backend API: https://volunteer-bridge-3.onrender.com

---

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Projects Page
![Projects](./screenshots/projects.png)

### Task Management
![Tasks](./screenshots/tasks.png)

### Notifications
![Notifications](./screenshots/notifications.png)

### Donations
![Donations](./screenshots/donations.png)

> 📌 *Tip: Create a `screenshots/` folder and drop images inside.*

---

## ✨ Features

### 👤 Authentication
- Secure login & registration
- JWT-based authentication
- Persistent sessions

### 📁 Project Management
- View all available projects
- Inspect project details
- Track progress

### ✅ Task Management
- View assigned tasks
- Update task status (`pending`, `in_progress`, `done`)
- Track deadlines and estimated hours

### 📊 Reports
- Submit reports
- View reports by project or user

### 🔔 Notifications
- Real-time task assignment notifications
- Mark notifications as read
- Stay updated on activities

### 💰 Donations
- Support projects financially
- Multiple payment methods:
  - Card (local + international)
  - Bank transfer
  - Cash
- Linked to reports for transparency

### 👤 Profile Management
- Create and update volunteer profiles
- Manage availability and skills

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔔 Sonner (toast notifications)
- 🎯 Lucide React (icons)

### State & Data
- Axios (API communication)
- React Hooks

### Routing
- React Router DOM

### Backend (Integration)
- Node.js + Express
- Sequelize ORM
- PostgreSQL (Render)
- JWT Authentication

---

## 📂 Project Structure

```bash
src/
├── components/        # Reusable UI components
├── layouts/           # Layout wrappers
├── pages/             # Application pages
├── services/          # API logic (Axios)
├── hooks/             # Custom hooks
├── lib/               # Utilities/helpers
├── App.tsx
└── main.tsx
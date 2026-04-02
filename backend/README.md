# 🏥 MediCampus — Campus Medical Management System

## Project Overview
MediCampus is a role-based medical management system for college campuses that manages 
student health records, medicine inventory, and staff operations.

## How This Matches the Finance Dashboard

### 1. User and Role Management ✅
The system implements three distinct roles:
- **Admin**: Full system access (equivalent to finance admin)
- **Staff (Doctor)**: Can manage student records and medicine inventory (equivalent to analyst)
- **Student**: Read-only access to personal records (equivalent to viewer)

### 2. Medical Records Management (Equivalent to Financial Records) ✅
Instead of financial transactions, the system manages:
- **Medicine Inventory**: Stock levels, categories, expiry dates
- **Student Medicine Records**: Which medicines were given, quantity, date, reason
- **Operations**: Create, Read, Update, Delete records with proper authorization

### 3. Dashboard Summary APIs ✅
The system provides role-based dashboard endpoints:
- **Admin Dashboard**: Overall campus health metrics, inventory status
- **Staff Dashboard**: Today's visits, medicine consumption, low stock alerts
- **Student Dashboard**: Personal visit history, medicines consumed

### 4. Access Control Logic ✅
Role-based access control implemented via middleware:

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Templating | EJS |
| Email Service | Nodemailer |
| Styling | CSS Modules |

---

## 📁 Project Structure

```
MediCampus/
│
├── backend/
│   ├── Routes/
│   │   ├── user.js                # Authentication & user management
│   │   ├── facility.js            # Facility management
│   │   ├── medicine.js            # Medicine inventory
│   │   ├── nearByHospital.js      # Nearby hospital lookup
│   │   ├── notification.js        # Notification system
│   │   ├── gallary.js             # Gallery/media management
│   │   └── history.js             # Medical history records
│   ├── connection.js              # MongoDB connection setup
│   ├── index.js                   # App entry point
│   └── .env                       # Environment variables

## ⚙️ API Endpoints

| Base Route | Description |
|---|---|
| `/api/auth` | User authentication & registration |
| `/api/facility` | Facility management |
| `/api/medicine` | Medicine inventory |
| `/api/hospital` | Nearby hospital data |
| `/api/notification` | Notifications |
| `/api/gallary` | Gallery/media |
| `/api/history` | Patient medical history |

---

## 🔧 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas URI)
- npm

---

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
EMAIL=your_email@example.com
EMAIL_PASSWORD=your_email_password
MONGODB_URL=your_mongodb_connection_string
```

Start the backend server:

```bash
# Development
npm run dev

# Production
npm start
```

Backend runs at: `http://localhost:4000`

---



## ✨ Features

- **Role-Based Access Control** — Separate dashboards and permissions for Admin, Staff, and Students
- **Student Record Management** — Staff can view, add, and update student medical records
- **Medicine Inventory** — Track stock levels, additions, and consumption of medicines
- **Email-Based Onboarding** — Secure password delivery to new users via Nodemailer
- **Medical History** — Full digitized records of student visits and treatments
- **Nearby Hospital Lookup** — Quick access to hospitals near the campus
- **Notification System** — In-app alerts and updates for relevant users
- **Gallery Module** — Upload and manage medical-related media
- **~40% Paperwork Reduction** — Digitization of manual dispensary processes

---

## 🔐 Security

- JWT-based authentication and authorization
- HTTP-only cookies via `cookie-parser`
- CORS restricted to trusted frontend origin (`http://localhost:5173`)
- Role-based route protection for sensitive endpoints
- Secure email-based password delivery for onboarding

---

## 📬 Contact

For issues or contributions, open a pull request or raise an issue on the repository.

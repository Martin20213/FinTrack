# 💰 FinTrack — Personal Wealth Tracker

A modern, full-stack personal finance application built with **Laravel 11** and **React + TypeScript**. Track your accounts, balances, and portfolio allocation in one clean dashboard.

---

## ✨ Features

- 📊 **Wealth dashboard** — total net worth, type breakdown, portfolio ratio bar
- 🏦 **Account management** — add, edit, and delete accounts (CRUD)
- 🗂️ **Account types** — folyószámla, befektetés, megtakarítás, készpénz, egyéb
- 📈 **Portfolio allocation** — percentage breakdown by account and type
- 💾 **Persistent storage** — all data saved to MySQL via Laravel Eloquent
- 🌙 **Dark UI** — clean dark theme with cyan accent

---

## 📸 Screenshots

<img width="1516" height="692" alt="fintrack_kezdolap" src="https://github.com/user-attachments/assets/61b2fb55-330e-429e-b7df-285df0cdb994" />

<img width="1534" height="680" alt="fintrack_szamlak" src="https://github.com/user-attachments/assets/c08a4d57-6f61-4ce5-92c4-5d768a489fcb" />


---
## 🛠️ Tech Stack

### Backend
| Tech | Role |
|------|------|
| Laravel 11 | REST API framework |
| Eloquent ORM | Database layer |
| API Resources | JSON response transformation |
| MySQL | Database |

### Frontend
| Tech | Role |
|------|------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool / dev server |
| TanStack Query | Server state management |
| Axios | HTTP client |
| React Router | Client-side routing |

---

## 📁 Project Structure

```
fintrack/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── AccountController.php
│   │   │   └── Resources/
│   │   │       └── AccountResource.php
│   │   └── Models/
│   │       └── Account.php
│   ├── database/
│   │   └── migrations/
│   └── routes/
│       └── api.php
│
└── frontend/                 # React + TypeScript
    └── src/
        ├── api/              # Axios API calls
        ├── components/       # Reusable UI components
        ├── hooks/            # React Query hooks
        ├── pages/            # Route-level pages
        └── types/            # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- PHP 8.2+
- Composer
- Node.js 18+
- npm
- MySQL

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Martin20213/fintrack.git
cd fintrack
```

---

### 2️⃣ Backend setup (Laravel)

```bash
cd backend-api
```

**Install dependencies:**
```bash
composer install
```

**Create the environment file:**
```bash
cp .env.example .env
```

**Generate application key:**
```bash
php artisan key:generate
```

**Configure your database** — open `.env` and set your MySQL credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fintrack
DB_USERNAME=root
DB_PASSWORD=your_password
```

**Run migrations:**
```bash
php artisan migrate
```

**Start the backend server:**
```bash
php artisan serve
```

> The API will be available at `http://localhost:8000`

---

### 3️⃣ Frontend setup (React)

Open a **new terminal**, then:

```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the dev server:**
```bash
npm run dev
```

> The app will be available at `http://localhost:5173`

---

### ✅ You're all set!

Open `http://localhost:5173` in your browser. Both servers need to be running simultaneously.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000/api |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/accounts` | List all accounts + summary |
| `POST` | `/api/accounts` | Create a new account |
| `PUT` | `/api/accounts/{id}` | Update an account |
| `DELETE` | `/api/accounts/{id}` | Delete an account |

### Example response — `GET /api/accounts`

```json
{
  "accounts": [
    {
      "id": 1,
      "name": "OTP folyószámla",
      "type": "folyószámla",
      "balance": 450000.00,
      "note": null
    }
  ],
  "summary": {
    "total": 450000.00,
    "by_type": {
      "folyószámla": {
        "total": 450000.00,
        "count": 1,
        "percentage": 100.0
      }
    }
  }
}
```

---

## 🏗️ Architecture

This project follows a **decoupled API + SPA** architecture:

```
React SPA (port 5173)
      │
      │  HTTP / JSON
      ▼
Laravel API (port 8000)
      │
      │  Eloquent ORM
      ▼
   MySQL DB
```

The frontend is completely independent from the backend — any other client (mobile app, Postman, etc.) can consume the same API.

### Frontend data flow

```
types/     ← TypeScript interfaces (what does the data look like?)
api/       ← Axios calls (how do we fetch it?)
hooks/     ← React Query (how do we manage state?)
pages/     ← TSX rendering (how do we display it?)
```

---

## 📄 License

MIT — feel free to use this project for learning or as a portfolio piece.

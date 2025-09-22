# Phase 0 - Project Scaffolding Implementation Documentation

## Overview
This document details all the steps taken to implement Phase 0 of the startup scouting project, including both frontend and backend setup, configuration, and verification.

## Phase 0 Requirements
- **Goals**: Repos, environments, tooling
- **Repos**: Create two repos with proper structure
- **Frontend**: React TypeScript + Vite + Tailwind CSS
- **Backend**: Django REST API + MySQL/SQLite
- **Git Workflow**: Branch naming, templates, documentation

---

## 1. Repository Structure Setup

### 1.1 Project Root Directory
```bash
/Users/thiminhnguyetduong/Downloads/Projects/startup-scouting/
├── startup-scout-frontend/     # React TypeScript frontend
├── startup_scout_backend/      # Django REST API backend
└── README.md                   # Main project documentation
```

### 1.2 Frontend Repository Creation
```bash
# Create React TypeScript project with Vite
cd /Users/thiminhnguyetduong/Downloads/Projects/startup-scouting
npm create vite@latest startup-scout-frontend -- --template react-ts

# Navigate to frontend directory
cd startup-scout-frontend

# Install base dependencies
npm install

# Install required packages
npm i axios react-hook-form zod zustand tailwindcss postcss autoprefixer
```

### 1.3 Backend Repository Creation
```bash
# Create Django project
cd /Users/thiminhnguyetduong/Downloads/Projects/startup-scouting
django-admin startproject startup_scout_backend

# Navigate to backend directory
cd startup_scout_backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install Django and required packages
pip install django djangorestframework django-cors-headers python-dotenv mysqlclient
```

---

## 2. Frontend Configuration

### 2.1 Tailwind CSS Setup
**Issue Encountered**: PostCSS configuration error with Tailwind CSS v4+
```
Error: [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
```

**Solution Applied**:
```bash
# Install the new PostCSS plugin
npm install @tailwindcss/postcss
```

**Files Created/Modified**:
- `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Updated from 'tailwindcss': {}
    autoprefixer: {},
  },
}
```

- `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2.2 Frontend Dependencies Installed
```json
{
  "axios": "^1.7.9",
  "react-hook-form": "^7.53.2",
  "zod": "^3.24.1",
  "zustand": "^5.0.2",
  "tailwindcss": "^3.4.17",
  "postcss": "^8.5.1",
  "autoprefixer": "^10.4.20",
  "@tailwindcss/postcss": "^4.0.0"
}
```

---

## 3. Backend Configuration

### 3.1 Django Settings Configuration
**File**: `startup_scout_backend/settings.py`

**Key Changes Made**:
```python
# Added imports
import os
from dotenv import load_dotenv
load_dotenv()

# Updated INSTALLED_APPS
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",           # Added
    "corsheaders",             # Added
]

# Updated MIDDLEWARE
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Added at top
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Database configuration (initially MySQL, switched to SQLite for development)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",  # Changed from MySQL
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

# ALLOWED_HOSTS configuration
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']
```

### 3.2 Database Migration
```bash
# Run Django migrations
cd startup_scout_backend
source .venv/bin/activate
python manage.py migrate
```

### 3.3 Environment Configuration
**File**: `.env` (created)
```env
# Database Configuration
DB_NAME=startup_scout
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306

# Django Configuration
SECRET_KEY=django-insecure-!0js8_f5%!d*ddtv1h3vwboh6p%l&^$)hvr&0c-y&y^v)v10w)
DEBUG=True
```

**File**: `.env.example` (created)
```env
# Database Configuration
DB_NAME=startup_scout
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306

# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
```

---

## 4. Project Documentation

### 4.1 Frontend README
**File**: `startup-scout-frontend/README.md`
- Tech stack documentation
- Installation instructions
- Available scripts
- Project structure
- Contributing guidelines

### 4.2 Backend README
**File**: `startup_scout_backend/README.md`
- Tech stack documentation
- Installation instructions
- Available commands
- Project structure
- API documentation placeholder

### 4.3 Main Project README
**File**: `README.md`
- Project overview
- Quick start instructions
- Phase 0 completion status
- Tech stack summary

---

## 5. Git Workflow Setup

### 5.1 .gitignore Files
**Frontend**: `startup-scout-frontend/.gitignore`
- Node modules
- Build directories
- Environment files
- Editor configurations

**Backend**: `startup_scout_backend/.gitignore`
- Python cache files
- Virtual environment
- Database files
- Environment files

### 5.2 GitHub Templates
**Issue Templates**:
- `bug_report.md` - Bug reporting template
- `feature_request.md` - Feature request template

**Pull Request Template**:
- `pull_request_template.md` - Comprehensive PR checklist

**Directory Structure**:
```
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
└── PULL_REQUEST_TEMPLATE/
    └── pull_request_template.md
```

### 5.3 Branch Naming Conventions
- `feat/*` - New features
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks
- `docs/*` - Documentation updates

---

## 6. License Files
**MIT License** added to both repositories:
- `startup-scout-frontend/LICENSE`
- `startup_scout_backend/LICENSE`

---

## 7. Testing and Verification

### 7.1 Frontend Testing
```bash
# Start frontend development server
cd startup-scout-frontend
npm run dev

# Expected output:
# VITE v7.1.7  ready in 155 ms
# ➜  Local:   http://localhost:5174/
# ➜  Network: use --host to expose
```

**Verification**:
```bash
curl -s http://localhost:5174 | head -5
# Expected: HTML content with React app
```

### 7.2 Backend Testing
```bash
# Start backend development server
cd startup_scout_backend
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000

# Expected output:
# Django version 5.2.6, using settings 'startup_scout_backend.settings'
# Starting development server at http://0.0.0.0:8000/
```

**Verification**:
```bash
curl -s http://localhost:8000 | head -5
# Expected: Django welcome page HTML
```

---

## 8. Issues Encountered and Solutions

### 8.1 Tailwind CSS PostCSS Error
**Problem**: `[postcss] It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`
**Solution**: Installed `@tailwindcss/postcss` and updated PostCSS configuration

### 8.2 MySQL Connection Error
**Problem**: `MySQLdb.OperationalError: (1045, "Access denied for user 'root'@'localhost'")`
**Solution**: Switched to SQLite for development, kept MySQL configuration for production

### 8.3 Django ALLOWED_HOSTS Error
**Problem**: `Invalid HTTP_HOST header: '0.0.0.0:8000'`
**Solution**: Added `'0.0.0.0'` to `ALLOWED_HOSTS` in Django settings

---

## 9. Final Verification

### 9.1 Both Applications Running
- **Frontend**: http://localhost:5174 ✅
- **Backend**: http://localhost:8000 ✅

### 9.2 Phase 0 Requirements Met
- ✅ Two repositories created
- ✅ MIT license, README, .gitignore, templates added
- ✅ Frontend scaffolded with React TypeScript + Vite
- ✅ All required packages installed
- ✅ Tailwind CSS configured
- ✅ Backend scaffolded with Django
- ✅ All required packages installed
- ✅ Database configured (SQLite for dev, MySQL ready for prod)
- ✅ Git workflow established
- ✅ Both apps run locally
- ✅ READMEs explain setup
- ✅ Ready for initial commit & PR

---

## 10. Next Steps

**Phase 0 Complete** ✅
- Ready to proceed to Phase 1
- Both applications fully functional
- All scaffolding requirements met
- Development environment ready

**Commands to Start Development**:
```bash
# Frontend
cd startup-scout-frontend
npm run dev

# Backend
cd startup_scout_backend
source .venv/bin/activate
python manage.py runserver
```

---

## 11. File Structure Summary

```
startup-scouting/
├── README.md
├── PHASE_0_IMPLEMENTATION.md
├── PHASE_1_IMPLEMENTATION.md
├── startup-scout-frontend/
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   └── PULL_REQUEST_TEMPLATE/
│   ├── src/
│   │   ├── index.css (Tailwind configured)
│   │   └── ...
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .gitignore
│   ├── LICENSE
│   └── README.md
└── startup_scout_backend/
    ├── .github/
    │   ├── ISSUE_TEMPLATE/
    │   └── PULL_REQUEST_TEMPLATE/
    ├── startups/
    │   ├── models.py (minimal & clean)
    │   ├── serializers.py (simplified)
    │   ├── views.py (streamlined)
    │   └── urls.py
    ├── notes/
    │   ├── models.py (minimal & clean)
    │   ├── serializers.py (simplified)
    │   ├── views.py (streamlined)
    │   └── urls.py
    ├── watchlist/
    │   ├── models.py (minimal & clean)
    │   ├── serializers.py (simplified)
    │   ├── views.py (streamlined)
    │   └── urls.py
    ├── startup_scout_backend/
    │   ├── settings.py (cleaned & optimized)
    │   └── urls.py
    ├── requirements.txt (minimal dependencies)
    ├── .gitignore
    ├── LICENSE
    └── README.md
```

**Phase 0 Implementation Complete** ✅
**Codebase Refactored** ✅ - Minimal, clean, and easily extensible

# Startup Scout Project

A full-stack application for startup scouting and innovation management, built with React TypeScript frontend and Django REST API backend.

## Project Structure

```
startup-scouting/
├── startup-scout-frontend/     # React TypeScript frontend
├── startup_scout_backend/      # Django REST API backend
└── README.md                   # This file
```

## Quick Start

### Frontend (React + TypeScript)
```bash
cd startup-scout-frontend
npm install
npm run dev
```
Frontend will be available at http://localhost:5173

### Backend (Django REST API)
```bash
cd startup_scout_backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```
Backend will be available at http://localhost:8000

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for HTTP requests
- React Hook Form for form management
- Zod for validation
- Zustand for state management

### Backend
- Django 5.2
- Django REST Framework
- MySQL database
- django-cors-headers for CORS handling
- python-dotenv for environment variables

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) files for details.

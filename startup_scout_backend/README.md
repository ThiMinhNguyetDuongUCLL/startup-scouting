# Startup Scout Backend

A Django REST API backend for startup scouting and innovation management.

## Tech Stack

- **Django 5.2** - Web framework
- **Django REST Framework** - API framework
- **MySQL** - Database
- **django-cors-headers** - CORS handling
- **python-dotenv** - Environment variables

## Getting Started

### Prerequisites

- Python 3.8 or higher
- MySQL 8.0 or higher
- pip

### Installation

1. Clone the repository
2. Create and activate virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Configure your database settings in `.env`

6. Run migrations:
   ```bash
   python manage.py migrate
   ```

7. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

8. Start the development server:
   ```bash
   python manage.py runserver
   ```

9. Open [http://localhost:8000](http://localhost:8000) in your browser

### Available Commands

- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py shell` - Open Django shell

## Project Structure

```
startup_scout_backend/
├── manage.py
├── startup_scout_backend/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/              # Django apps
├── requirements.txt
├── .env.example
└── README.md
```

## API Documentation

The API documentation will be available at `/api/docs/` once implemented.

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

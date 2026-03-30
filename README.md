# ⬡ TaskFlow

A minimal, stylish task manager built with Python Flask.

## Features
- Add, complete, and delete tasks
- Filter by All / Active / Done
- Clean dark UI with smooth animations
- REST API powered by Flask

## Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the app
python app.py

# 3. Open in browser
http://localhost:5000
```

## Project Structure
```
webapp/
├── app.py               # Flask backend & REST API
├── requirements.txt     # Python dependencies
├── templates/
│   └── index.html       # Main HTML page
└── static/
    ├── css/style.css    # Styling
    └── js/main.js       # Frontend logic
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Toggle done |
| DELETE | /api/tasks/:id | Delete task |

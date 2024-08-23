# youtube-nano
Tiny version of YouTube with video uploads, likes, comments, and search.

## Installation and Setup
1. Ensure you have Angular installed
```
npm install -g @angular/cli
```

2. Ensure you have Python 3.10 and create a virtual environment
```
python -m venv venv
```

For Linux:
```
source venv/bin/activate 
```

For Windows:
```
venv\Scripts\activate.bat
```
3. **Ensure you have a `.env` file containing environment variables.**



4. Start the Django server
```
python manage.py runserver --settings youtubenano.settings.development
```
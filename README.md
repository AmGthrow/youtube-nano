# youtube-nano
Tiny version of YouTube with video uploads, likes, comments, and search.

## Key Features
This video shows off how the app works and it's core features
- Video uploads
- Sign-in and Login
- Read/write permissions based on currently signed in user
- Pre-processing videos to apply an ASCII filter

https://drive.google.com/file/d/1fkdqvWwnx-4pKxEsvrg08oKVYxvjVqSb/view?usp=sharing
## Devlog
This video talks about my development process while building the app, the decisions I had to make and the problems I encountered, etc.

https://drive.google.com/file/d/1-H18HzhDkvczqgBZ6dnJVYiPd7FBKAqX/view?usp=sharing


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

Install dependencies:
```
pip install -r requirements/base.txt -r requirements/development.txt
```
3. **Ensure you have a `.env` file containing environment variables.** See `.sample.env` for the variables you'll need to set.

4. Ensure that you have Postgres installed and setup your Postgres database.
```
createdb youtube-nano
```

5. Install the repository's pre-commit hooks.
```
pre-commit install
```

6. Run the initial database migrations
```
python manage.py migrate
```

7. Start the Django server
```
python manage.py runserver --settings youtubenano.settings.development
```

## Docker (OPTIONAL)
Start the Docker daemon and build the Docker image.
```
docker build .
```

Once the image has been built, you can spin up the container.
```
docker compose -f docker-compose-dev.yml up
```

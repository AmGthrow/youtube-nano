# Pull base image
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY ./requirements/base.txt /app/requirements/base.txt
COPY ./requirements/development.txt /app/requirements/development.txt
RUN pip install --no-cache-dir -r /app/requirements/base.txt -r /app/requirements/development.txt

# Copy project
COPY . /app/
# Set work directory
WORKDIR /app/

FROM python:3.11.4-slim-buster


# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the Work Directory

WORKDIR /app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "qr_code_generator.wsgi:application"]
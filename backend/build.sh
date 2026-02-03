#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn whitenoise

python manage.py collectstatic --no-input
python manage.py migrate
python seed.py

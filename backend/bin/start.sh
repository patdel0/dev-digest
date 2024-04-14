#!/bin/bash

service cron start
python manage.py migrate
exec uvicorn config.asgi:application --host 0.0.0.0 --port 7860

#!/bin/bash

# Handle database commands
python manage.py migrate
python manage.py seed_sources

# Set up the cron job
service cron start
mkdir -p /app/logs
echo "0 3 * * * /usr/local/bin/python /app/manage.py daily_update_articles_db >> /app/logs/cron.log 2>&1" | crontab -

exec uvicorn config.asgi:application --host 0.0.0.0 --port 7860

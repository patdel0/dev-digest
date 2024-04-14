FROM python:3.8-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libc6-dev cron

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

# Run migrations
RUN python3 manage.py migrate

EXPOSE 7860

CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "7860"]

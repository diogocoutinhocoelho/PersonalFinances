#! /usr/bin/env bash

python manage.py migrate
if [ "$ENV" = "dev" ]; then
  python manage.py runserver 0.0.0.0:8000
elif [ "$ENV" = "dev-debug" ]; then
  pip install debugpy -t /tmp
  python3 /tmp/debugpy --wait-for-client --listen 0.0.0.0:5678 manage.py runserver 0.0.0.0:8000
else 
  gunicorn core.wsgi:application -w "4" --threads="$AMOUNT_THREADS" -b 0.0.0.0:8000 --timeout "$TIMEOUT"
fi

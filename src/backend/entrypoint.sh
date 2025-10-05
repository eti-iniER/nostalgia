#!/bin/bash

set -o errexit

set -o pipefail

set -o nounset

cd /app/nostalgia

uv run python manage.py collectstatic --noinput
uv run python manage.py migrate

NUM_WORKERS=${GUNICORN_WORKERS:-1}

exec uv run gunicorn nostalgia.wsgi --bind 0.0.0.0:8000 --workers $NUM_WORKERS

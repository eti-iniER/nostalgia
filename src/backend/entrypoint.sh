#!/bin/bash

set -o errexit

set -o pipefail

set -o nounset

uv run python /app/manage.py collectstatic --noinput
uv run python /app/manage.py migrate

NUM_WORKERS=${GUNICORN_WORKERS:-1}

exec uv run gunicorn eventvisionary.wsgi --bind 0.0.0.0:8000 --chdir=/app --workers $NUM_WORKERS

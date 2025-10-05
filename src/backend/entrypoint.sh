#!/bin/bash

set -o errexit

set -o pipefail

set -o nounset

uv run python nostalgia/manage.py collectstatic --noinput
uv run python nostalgia/manage.py migrate

NUM_WORKERS=${GUNICORN_WORKERS:-1}

exec uv run gunicorn nostalgia.nostalgia.wsgi --bind 0.0.0.0:8000 --workers $NUM_WORKERS

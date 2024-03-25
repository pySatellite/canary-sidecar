#!/bin/sh

nohup /bin/bash -c "json-server -p 7963 -w compose/api/data/interface.json" &

nohup /bin/bash -c "uvicorn src.canary_sidecar.main:app --host 0.0.0.0 --port 8864 --reload" &

nginx -g "daemon off;"
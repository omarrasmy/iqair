#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
port="$2"

shift 2

echo "⏳ Waiting for $host:$port..."

until nc -z "$host" "$port"; do
  sleep 1
done

echo "✅ $host:$port is available — continuing..."
exec "$@"
# This script waits for a service to be available before executing the next command.
# It uses `nc` (netcat) to check if the specified host and port are
# reachable. If not, it sleeps for 1 second and checks again until the service is available.
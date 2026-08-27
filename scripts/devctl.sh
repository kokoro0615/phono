#!/usr/bin/env bash
# Restart the Next dev server for pixel measurement runs.
#
# Turbopack's CSS chunk is not always rebuilt for edits deep in globals.css, and
# HMR cannot reach this environment, so measurements need a clean server.
set -u

PORT="${PORT:-3300}"
LOG="${LOG:-/tmp/phono-dev-${PORT}.log}"
cd "$(dirname "$0")/.."

stop() {
  local pids
  pids=$(ss -ltnpH "sport = :${PORT}" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | sort -u)
  if [ -n "$pids" ]; then
    kill $pids 2>/dev/null
    for _ in $(seq 1 20); do
      ss -ltnH "sport = :${PORT}" 2>/dev/null | grep -q . || break
      sleep 0.5
    done
  fi
}

wait_up() {
  for _ in $(seq 1 90); do
    if [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 "http://127.0.0.1:${PORT}/")" = "200" ]; then
      echo "dev server up on ${PORT}"
      return 0
    fi
    sleep 2
  done
  echo "dev server did not come up; see ${LOG}" >&2
  tail -20 "$LOG" >&2
  return 1
}

case "${1:-restart}" in
  stop) stop ;;
  start)
    PORT="$PORT" nohup npm run dev >"$LOG" 2>&1 &
    wait_up
    ;;
  restart)
    stop
    rm -rf .next
    PORT="$PORT" nohup npm run dev >"$LOG" 2>&1 &
    wait_up
    ;;
  *) echo "usage: devctl.sh [start|stop|restart]" >&2; exit 2 ;;
esac

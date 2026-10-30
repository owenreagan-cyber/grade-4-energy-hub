#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/web"
for cmd in python3 cloudflared qrencode curl; do
  command -v "$cmd" >/dev/null || { echo "Missing $cmd. Install cloudflared and qrencode with Homebrew."; exit 1; }
done
printf "\nChecking web files...\n"
for x in index.html sw.js manifest.webmanifest icon.svg; do test -s "$x" || { echo "Missing $x";exit 1; }; done
RUN_DIR=$(mktemp -d)
SERVER_PID=""
TUNNEL_PID=""
cleanup(){ [ -n "$TUNNEL_PID" ] && kill "$TUNNEL_PID" 2>/dev/null || :; [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || :; }
trap cleanup EXIT INT TERM
python3 -m http.server 8765 --bind 127.0.0.1 >"$RUN_DIR/server.log" 2>&1 &
SERVER_PID=$!
sleep 1
curl --fail --silent http://127.0.0.1:8765/index.html >/dev/null || { echo "Local HTTP server failed or port 8765 already in use.";exit 1; }
cloudflared tunnel --url http://127.0.0.1:8765 --no-autoupdate >"$RUN_DIR/tunnel.log" 2>&1 &
TUNNEL_PID=$!
URL=""
for n in $(seq 1 40); do
 URL=$(grep -Eo 'https://[a-z0-9-]+\.trycloudflare\.com' "$RUN_DIR/tunnel.log" | head -1 || true)
 [ -n "$URL" ] && break
 sleep 1
done
if [ -z "$URL" ]; then echo "Cloudflare tunnel did not provide HTTPS URL."; cat "$RUN_DIR/tunnel.log"; exit 1;fi
URL="$URL/index.html"
OUT="$(dirname "$PWD")/install-energy-elixir-qr.png"
qrencode -o "$OUT" -s 12 -m 3 "$URL"
echo ""
echo "INSTALL ADDRESS: $URL"
echo "QR PNG: $OUT"
echo "Open the QR image and scan it from each iPad with the Camera app."
echo "On each iPad Safari choose Share > Add to Home Screen."
echo "Keep this Terminal running until four iPads have been installed and tested."
echo "To finish, press Ctrl+C after testing with Airplane Mode."
while kill -0 "$TUNNEL_PID" 2>/dev/null; do sleep 2;done
echo "Tunnel stopped."

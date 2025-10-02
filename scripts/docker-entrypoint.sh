#!/usr/bin/env sh
set -e

# Provide window.APP_CONFIG to the frontend at runtime (so you can change CDN without rebuilding)
: "${CDN_BASE_URL:=}"
printf 'window.APP_CONFIG=%s;' "{\"CDN_BASE_URL\":\"${CDN_BASE_URL}\"}" > /srv/app-config.js

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile

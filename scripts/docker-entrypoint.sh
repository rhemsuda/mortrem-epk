#!/usr/bin/env sh
set -euo pipefail
: "${CDN_BASE_URL:=}"
: "${DOMAIN:=epk.mortrem.band}"
: "${EMAIL:=mortremofficial@gmail.com}"

mkdir -p /srv/js
printf 'window.APP_CONFIG={CDN_BASE_URL:"%s"};\n' "${CDN_BASE_URL:-}" > /srv/js/config.js

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile

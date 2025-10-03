#!/usr/bin/env sh
set -euo pipefail
: "${CDN_BASE_URL:=}"
: "${DOMAIN:=epk.mortrem.band}"
: "${EMAIL:=mortremofficial@gmail.com}"

mkdir -p /srv/www
cat >/srv/www/app-config.js <<EOF
window.APP_CONFIG = { CDN_BASE_URL: "${CDN_BASE_URL}" };
EOF

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile

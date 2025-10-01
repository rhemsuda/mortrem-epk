#!/usr/bin/env sh
set -e

# Generate a tiny runtime config file used by index.html before elm.js loads.
# It exposes window.APP_CONFIG.CDN_BASE_URL so Elm can receive it as a flag.
cat > /usr/share/nginx/html/js/config.js <<EOF
window.APP_CONFIG = {
  CDN_BASE_URL: "${CDN_BASE_URL:-}"
};
EOF

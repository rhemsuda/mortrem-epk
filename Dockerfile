FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json elm.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine
WORKDIR /srv

COPY --from=build /app/public /srv/

COPY Caddyfile /etc/caddy/Caddyfile
COPY scripts/docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV XDG_CONFIG_HOME=/config
ENV DOMAIN=epk.mortrem.band
ENV EMAIL=mortremofficial@gmail.com
ENV CND_BASE_URL=""

EXPOSE 80 443
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

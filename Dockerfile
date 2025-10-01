FROM node:20-alpine AS build

RUN npm i -g elm@0.19.1-5 elm-json@0.2.13

RUN adduser -D app
USER app
WORKDIR /app

COPY --chown=app:app elm.json ./
COPY --chown=app:app src ./src
COPY --chown=app:app public ./public

RUN elm make src/Main.elm --optimize --output=public/elm.js


FROM nginx:1.27-alpine

COPY --from=build /app/public /usr/share/nginx/html

COPY scripts/40-gen-config.sh /docker-entrypoint.d/40-gen-config.sh
RUN chmod +x /docker-entrypoint.d/40-gen-config.sh

EXPOSE 80

ENV CDN_BASE_URL="https://mortrem-epk.nyc3.cdn.digitaloceanspaces.com"

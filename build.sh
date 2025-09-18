rm -rf dist && mkdir -p dist

elm make src/Main.elm --optimize --output=dist/elm.js

cp -r public/* dist/
cp -r assets dist/assets

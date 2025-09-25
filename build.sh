#!/usr/bin/env sh

# make fresh output dir
rm -rf dist && mkdir -p dist

# compile elm
elm make src/Main.elm --optimize --output=dist/elm.js

# copy your static site files
cp -r public/* dist/
cp -r assets dist/assets

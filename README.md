# mortrem-epk

### To run HTTP server:
`$ python3 -m http.server 8888`


### To encode MP4 files:
`$ ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4`

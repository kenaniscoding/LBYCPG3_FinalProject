@echo off

start cmd /k "python -m http.server 8010"
start cmd /k "node run.js"
start cmd /k "cd article5-app && npm start"

exit

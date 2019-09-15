#!/bin/sh
SERVERLOCATION=localhost:5000/client_hook
GITUEMAIL=$(git config --global user.email)
GITACTION=$(basename $0)
GAME_ID=$(basename "$PWD")
ACTIONTIME=$(date)
JSON_FMT='{"email":"%s","action":"%s","date":"%s", "game_id":"%s"}\n'
PAYLOAD=$(printf "$JSON_FMT" "$GITUEMAIL" "$GITACTION" "$(date "+%Y-%m-%d %H:%M:%S")" "$GAME_ID")
curl $SERVERLOCATION -H "Content-Type: application/json" -s -d "$PAYLOAD" > /dev/null

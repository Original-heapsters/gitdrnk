# Pre-Commit
```shell
#!/bin/sh
SERVERLOCATION=localhost:5000/client_hook
GITUEMAIL=$(git config --global user.email)
GITACTION="pre-commit"
GAME_ID=$(basename "$PWD")
ACTIONTIME=$(date)
JSON_FMT='{"email":"%s","action":"%s","date":"%s", "game_id":"%s"}\n'
PAYLOAD=$(printf "$JSON_FMT" "$GITUEMAIL" "$GITACTION" "$(date "+%Y-%m-%d %H:%M:%S")" "$GAME_ID")
curl $SERVERLOCATION -H "Content-Type: application/json" -d "$PAYLOAD"
```

# Post-Commit
```shell
#!/bin/sh
SERVERLOCATION=localhost:5000/client_hook
GITUEMAIL=$(git config --global user.email)
GITACTION="post-commit"
GAME_ID=$(basename "$PWD")
ACTIONTIME=$(date)
JSON_FMT='{"email":"%s","action":"%s","date":"%s", "game_id":"%s"}\n'
PAYLOAD=$(printf "$JSON_FMT" "$GITUEMAIL" "$GITACTION" "$(date "+%Y-%m-%d %H:%M:%S")" "$GAME_ID")
curl $SERVERLOCATION -H "Content-Type: application/json" -d "$PAYLOAD"
```

# Prepare-Commit-Msg
```shell
#!/bin/sh
SERVERLOCATION=localhost:5000/client_hook
GITUNAME=$(git config --global user.name)
GITACTION="prepare-commit-msg"
ACTIONTIME=$(date)
JSON_FMT='{"username":"%s","action":"%s","date":"%s"}\n'
PAYLOAD=$(printf "$JSON_FMT" "$GITUNAME" "$GITACTION" "$(date "+%Y-%m-%d %H:%M:%S")")
curl $SERVERLOCATION -H "Content-Type: application/json" -d "$PAYLOAD"
```

# Commit-Msg
```shell
#!/bin/sh
SERVERLOCATION=localhost:5000/client_hook
GITUNAME=$(git config --global user.name)
GITACTION="commit-msg"
ACTIONTIME=$(date)
JSON_FMT='{"username":"%s","action":"%s","date":"%s"}\n'
PAYLOAD=$(printf "$JSON_FMT" "$GITUNAME" "$GITACTION" "$(date "+%Y-%m-%d %H:%M:%S")")
curl $SERVERLOCATION -H "Content-Type: application/json" -d "$PAYLOAD"
```

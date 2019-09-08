#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push originalheapsters/gitdrnk_flask:0.0.0$TRAVIS_BUILD_NUMBER

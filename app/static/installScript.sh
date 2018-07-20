IP="localhost:8181"
echo "curl $IP/precommit" > .git/hooks/pre-commit
echo "curl $IP/precommitmsg" > .git/hooks/pre-commit-msg
echo "curl $IP/commitmsg" > .git/hooks/commit-msg
echo "curl $IP/postcommit" > .git/hooks/post-commit
echo "curl $IP/postrewrite" > .git/hooks/post-rewrite
echo "curl $IP/postcheckout" > .git/hooks/post-checkout
echo "curl $IP/postmerge" > .git/hooks/post-merge
echo "curl $IP/prepush" > .git/hooks/pre-push
echo "curl $IP/postrecieve" > .git/hooks/post-recieve

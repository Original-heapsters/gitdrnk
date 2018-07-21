IP="localhost:8181"
echo "#!/bin/sh" > .git/hooks/pre-commit
echo "#!/bin/sh" > .git/hooks/pre-commit-msg
echo "#!/bin/sh" > .git/hooks/commit-msg
echo "#!/bin/sh" > .git/hooks/post-commit
echo "#!/bin/sh" > .git/hooks/post-rewrite
echo "#!/bin/sh" > .git/hooks/post-checkout
echo "#!/bin/sh" > .git/hooks/post-merge
echo "#!/bin/sh" > .git/hooks/pre-push
echo "#!/bin/sh" > .git/hooks/post-recieve

echo "curl $IP/precommit/$USER" >> .git/hooks/pre-commit
echo "curl $IP/precommitmsg/$USER" >> .git/hooks/pre-commit-msg
echo "curl $IP/commitmsg/$USER" >> .git/hooks/commit-msg
echo "curl $IP/postcommit/$USER" >> .git/hooks/post-commit
echo "curl $IP/postrewrite/$USER" >> .git/hooks/post-rewrite
echo "curl $IP/postcheckout/$USER" >> .git/hooks/post-checkout
echo "curl $IP/postmerge/$USER" >> .git/hooks/post-merge
echo "curl $IP/prepush/$USER" >> .git/hooks/pre-push
echo "curl $IP/postrecieve/$USER" >> .git/hooks/post-recieve
sudo chmod +x .git/hooks/*

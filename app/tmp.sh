HOST="127.0.0.1"
USERNAME="Russell"
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/pre-commit
echo "curl $HOST/violation?user=$USERNAME&offense=pre-commit" >> .git/hooks/pre-commit
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/pre-commit-msg
echo "curl $HOST/violation?user=$USERNAME&offense=pre-commit-msg" >> .git/hooks/pre-commit-msg
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/commit-msg
echo "curl $HOST/violation?user=$USERNAME&offense=commit-msg" >> .git/hooks/commit-msg
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/post-commit
echo "curl $HOST/violation?user=$USERNAME&offense=post-commit" >> .git/hooks/post-commit
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/post-rewrite
echo "curl $HOST/violation?user=$USERNAME&offense=post-rewrite" >> .git/hooks/post-rewrite
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/post-checkout
echo "curl $HOST/violation?user=$USERNAME&offense=post-checkout" >> .git/hooks/post-checkout
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/post-merge
echo "curl $HOST/violation?user=$USERNAME&offense=post-merge" >> .git/hooks/post-merge
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/pre-push
echo "curl $HOST/violation?user=$USERNAME&offense=pre-push" >> .git/hooks/pre-push
echo "# !C:/Program\ Files/Git/usr/bin/sh.exe" > .git/hooks/pre-auto-gc
echo "curl $HOST/violation?user=$USERNAME&offense=pre-auto-gc" >> .git/hooks/pre-auto-gc

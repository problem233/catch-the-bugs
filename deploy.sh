#!/bin/bash
set -euo pipefail

echo 'building...'
npm run build

readonly remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
readonly remote=${remote_branch%%/*}
readonly remote_url=$(git remote get-url $remote)
pushd dist
  echo 'initializing git repo...'
  git init
  git checkout -b gh-pages
  echo 'committing and pushing...'
  git add *
  git commit -m "update gh-pages"
  git push -f $remote_url gh-pages
popd

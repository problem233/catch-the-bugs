#!/bin/bash
set -euo pipefail

echo 'cleaning...'
npm run clean

echo 'initializing git repo...'
mkdir dist
pushd dist
  git init
  git checkout -b gh-pages
popd

echo 'building...'
npm run build

echo 'committing and pushing...'
readonly remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
readonly remote=${remote_branch%%/*}
readonly remote_url=$(git remote get-url $remote)
pushd dist
  git add *
  git commit -m "update gh-pages"
  git push -f $remote_url gh-pages
popd

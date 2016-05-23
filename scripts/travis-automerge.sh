#!/bin/bash -e

: "${GITHUB_SECRET_TOKEN?}" "${TRAVIS_REPO_SLUG?}"

# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)
git clone "https://github.com/$TRAVIS_REPO_SLUG" "$repo_temp"

# shellcheck disable=SC2164
cd "$repo_temp"

printf 'Checking out %s\n' "$TRAVIS_BRANCH" >&2
git checkout "$TRAVIS_BRANCH"

git config user.name "Travis CI"
git config user.email travis@ci.com

printf 'Merging %s\n' "$BRANCH" >&2
git merge --no-ff --no-edit origin/"$BRANCH"

push_uri="https://$GITHUB_SECRET_TOKEN@github.com/$TRAVIS_REPO_SLUG"

printf 'Pushing to %s\n' "$TRAVIS_BRANCH" >&2
git push "$push_uri" "$TRAVIS_BRANCH" >/dev/null 2>&1

printf 'Deleting branch %s\n' "$BRANCH" >&2
git push "$push_uri" :"$BRANCH" >/dev/null 2>&1

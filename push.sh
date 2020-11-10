#!/bin/sh

if [ "$TRAVIS_BRANCH" != 'dev' ]; then 
    exit 0;
fi

setup_git() {
  git config --global user.email 'travis@travis-ci.org'
  git config --global user.name 'Travis CI'
}

push_changes() {
  echo '***** Remove remote origin *****'
  git remote rm origin

  echo '***** Adding origin as remote *****'
  git remote add origin "https://${GH_TOKEN}@github.com/Sjovir/AFP-E20.git" > /dev/null 2>&1

  echo '***** Fetching *****'
  git fetch

  echo '***** Checking Master *****'
  git checkout master

  echo '***** Merging commit *****'
  git merge "$TRAVIS_COMMIT"

  echo '***** Pushing to origin master *****'
  git push origin master --quiet
}

echo '***** Pushing to Master *****'
echo ''

setup_git
push_changes

#!/bin/sh

if [ "$TRAVIS_BRANCH" != "dev" ]; then 
    exit 0;
fi

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

push_changes() {
  echo '***** Remove remote origin *****'
  git remote rm origin

  echo '***** Adding origin as remote *****'
  git remote add origin "https://${GH_TOKEN}@github.com/Sjovir/AFP-E20.git" > /dev/null 2>&1

  # echo '***** Fetching *****'
  # git branch -a
  # git fetch
  # echo ''
  # git branch -a
  echo '***** Checking Master *****'
  git checkout master

  echo '***** Merging commit *****'
  git merge "$TRAVIS_COMMIT"

  echo '***** Pushing to origin master *****'
  git push origin master --quiet
}

# commit_website_files() {
#   git checkout dev
#   git pull
#   git add . *.html
#   git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
# }

# upload_files() {
#   git remote add origin-pages https://${GH_TOKEN}@github.com/MVSE-outreach/resources.git > /dev/null 2>&1
#   git push --quiet --set-upstream origin-pages gh-pages 
# }

echo "***** Pushing to Master *****"

setup_git
push_changes

# commit_website_files
# upload_files

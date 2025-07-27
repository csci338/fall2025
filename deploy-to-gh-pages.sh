# build the site and copy the files to a temporary directory:
echo "Building site..."
bundle exec jekyll build
if [ $? -ne 0 ]; then
    echo "Site build failed"
    exit 1
fi

echo "Copying files into temp directory..."
TEMP_DIR=$(mktemp -d)
rsync -av --exclude='node_modules' --exclude='*.pyc' --exclude='*.md' _site/ "$TEMP_DIR"
if [ $? -ne 0 ]; then
    echo "Failed to copy files to temporary directory"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Store current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Check if gh-pages branch exists, create it if it doesn't
echo "Checking if gh-pages branch exists..."
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
    echo "gh-pages branch exists, checking it out..."
    git checkout gh-pages
    git pull origin gh-pages
else
    echo "gh-pages branch doesn't exist, creating it..."
    git checkout --orphan gh-pages
fi

# Remove all files from gh-pages branch (this only affects gh-pages, not main)
echo "Removing existing files from gh-pages branch..."
git rm -rf . || true

# create .gitignore file to exclude unnecessary files
echo "Creating .gitignore to exclude unnecessary files..."
echo "_site
.sass-cache
*.sh
*.yml
Gemfile
Gemfile.lock
" > .gitignore

# copy the new site files to the gh-pages branch:
echo "Copying files from the temp directory into gh-pages branch..."
cp -r "$TEMP_DIR"/* .

# commit changes and send them to GitHub
echo "Adding, committing, and pushing to GitHub..."
git add .
git commit -m 'Updated gh-pages with new site content'
git push -f origin gh-pages
echo "New files pushed"

# clean up and return to original branch:
echo "Restoring $CURRENT_BRANCH and cleaning up..."
git checkout "$CURRENT_BRANCH"
rm -rf _site
rm -rf "$TEMP_DIR"
echo "The $CURRENT_BRANCH branch is restored and the temporary directory is cleaned up."

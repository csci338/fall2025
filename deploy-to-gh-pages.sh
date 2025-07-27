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

# checkout gh-pages and remove all files:
echo "Checking out gh-pages branch..."
git checkout gh-pages

# echo "Removing existing files..."
git rm -rf .
rm -r _site
rm -r .sass-cache
rm Gemfile.lock
rm Gemfile
rm .gitignore

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

# clean up:
echo "Restoring main and cleaning up..."
git checkout main
rm -rf _site
rm -rf "$TEMP_DIR"
echo "The main branch is restored and the temporary directory is cleaned up."

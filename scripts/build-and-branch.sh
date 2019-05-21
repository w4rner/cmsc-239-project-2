exists=`git show-ref gh-pages`
if [ -n "$exists" ]; then
    git branch -D gh-pages
fi
git branch gh-pages
git checkout gh-pages
npm run build
mv dist/bundle.js ./
rm -rf dist/
git add --a
git commit -m 'deploy'

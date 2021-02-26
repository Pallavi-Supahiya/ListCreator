rem To run this file.
rem first open your terminal and 
rem type .\commit.bat "<message>"

git add . 
git commit -m %1
git push origin dev
git status
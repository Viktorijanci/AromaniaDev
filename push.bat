git add .
set /p delBuild=Commit message [commit]: 
git commit -m "%delBuild%"
git push
pause
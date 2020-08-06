git add .
set delBuild=commit
set /p delBuild=Commit message [commit]: 
git commit -m "%delBuild%"
git push
pause
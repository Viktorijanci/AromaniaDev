@echo off
set /p email=Email:
git config --global user.email "%email%"
set /p name=Username:
git config --global user.name "%name%"
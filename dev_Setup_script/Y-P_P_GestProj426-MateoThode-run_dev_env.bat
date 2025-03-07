:: ETML
:: Mateo Thode
:: P_GestProj426
:: Description : Script qui lance l'environnement de développement.

:: Note : Ce script ne gère pas les erreurs car il est destiné à l'équipe dev.

:: >>>>>>> Duplique ce fichier et renomme-le avec ton nom, duplique aussi le fichier Mateo.txt et mets ton pseudo anonyme dedans, de ta session Windows. <<<<<<<<

@echo off

title Setup dev environment

set /p name=<inputs/Mateo.txt

cd ..

start "" "https://github.com/ASETML/P_GestProj426"
start "" "https://github.com/users/ASETML/projects/4"

:: Modifie le pn41htu par ton nom d'utilisateur
start "" "C:\Users\%name%\AppData\Local\GitHubDesktop\GitHubDesktop.exe"

start cmd /k "cd Docker && docker compose up -d"

start cmd /k "cd Application && code . && npm i && npm start"


title CREATE DATABASE

:: Il faut lancer le script SQL pour créer la base de données dans le CMD docker. Impossible depuis le script batch.

exit

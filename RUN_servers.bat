@echo off
title Installation et lancement des serveurs

echo === Étape 1 : Installation et lancement du Backend ===
start "Backend - Application" cmd /k "cd /d %~dp0Application\Backend && npm install && npm start"

echo.
echo === Étape 2 : Installation et lancement du Frontend ===
start "Frontend - Application" cmd /k "cd /d %~dp0Application\Frontend && npm install && npm start"

echo.
echo === Les serveurs Backend et Frontend ont été lancés dans des fenêtres séparées ===
title Serveurs en cours d’exécution - Vous pouvez fermer cette fenêtre

timeout 5

start "" http://localhost:5173

exit
@echo off
chcp 65001 > nul
echo.
echo  ⚓  תוכנית עבודה - פלגת 916
echo  ══════════════════════════════
echo  מפעיל שרת מקומי...
echo  פותח דפדפן בכתובת: http://localhost:8080
echo.
start http://localhost:8080
python -m http.server 8080
pause

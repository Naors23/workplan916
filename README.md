# תוכנית עבודה 916 🗂️

מערכת ניהול משימות חכמה לפלגת לוגיסטיקה 916, בסיס אשדוד — בנויה כ-PWA (Progressive Web App) עם סנכרון ענן בזמן אמת.

---

## 🔗 קישורים

| | קישור |
|---|---|
| 🌐 אתר | https://naors23.github.io/workplan916 |
| ⚡ קישור קצר | https://bit.ly/workplan-916 |
| 💻 GitHub | https://github.com/Naors23/workplan916 |

---

## ✨ פיצ'רים

- **תצוגות מרובות** — שנתית, חודשית ושבועית במקום אחד
- **משימות קבועות** — חזרה אוטומטית לפי ימים נבחרים בשבוע
- **3 מצבי משימה** — ממתין / בוצע ✓ / לא בוצע ✗
- **סנכרון בזמן אמת** — Firebase Firestore, כל שינוי מתעדכן מיידית לכולם
- **PWA** — ניתן להתקין כאפליקציה על הטלפון ללא חנות
- **עדכונים אוטומטיים** — Service Worker מזהה גרסה חדשה ומציג באנר עדכון
- **שיתוף WhatsApp** — שליחת משימות בלחיצה אחת
- **7 יחידות חיל הים** — לוגו ייעודי לכל יחידה
- **עריכת אירועים** — הוספה, עריכה ומחיקה של אירועים
- **מסך מנהל** — ניהול משתמשים וגישות
- **הדפסה** — פלט מדויק ל-PDF / מדפסת בפורמט A4 לרוחב

---

## 🏛️ יחידות נתמכות

| יחידה | לוגו |
|---|---|
| בסיס אשדוד | אשדוד.png |
| בסיס קריה | בסיס קריה.png |
| בסיס חיפה (בח) | חיפה.png |
| זירת ים סוף | זירת ם סוף.png |
| בסיס עתלית | עתלית.png |
| מספנה | מספנה.png |
| בה"ד חיל הים | בהד חיל הים.png |

---

## 🗂️ מבנה הפרויקט

```
work-plan/
├── index.html          # כל קוד האפליקציה (HTML + CSS + JS)
├── manifest.json       # הגדרות PWA
├── sw.js               # Service Worker לעדכונים אוטומטיים
├── flyer.html          # קוד מקור פלייר ההשקה
├── flyer_launch.jpg    # פלייר השקה 1080×1350 לרשתות חברתיות
└── icons/
    ├── חיל הים.png
    ├── אשדוד.png
    ├── בסיס קריה.png
    ├── חיפה.png
    ├── זירת ם סוף.png
    ├── עתלית.png
    ├── מספנה.png
    └── בהד חיל הים.png
```

---

## ⚙️ טכנולוגיות

| שכבה | טכנולוגיה |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Database | Firebase Firestore |
| Auth | Google Sign-In (Firebase Auth) |
| Hosting | GitHub Pages |
| Offline | Service Worker (PWA) |

---

## 🚀 Hosting & Deployment

האפליקציה מתארחת על **GitHub Pages** — כל push ל-`main` מפרסם את הגרסה החדשה אוטומטית תוך כ-60 שניות.

```bash
git add .
git commit -m "תיאור השינוי"
git push
```

---

## 👤 ניהול

- **Admin:** naorsadi@gmail.com
- **Firebase Project:** workplan-916
- **גישה למנהל:** Firebase Console → https://console.firebase.google.com

---

## 🔒 אבטחה

- כניסה דרך Google Auth בלבד
- כל פעולה מחייבת משתמש מחובר
- הרשאות מנהל מוגדרות לפי email
- מומלץ לבדוק ולעדכן את Firestore Security Rules ב-Firebase Console

---

*בנוי עם ❤️ עבור פלגת לוגיסטיקה 916 | בסיס אשדוד | 2026*

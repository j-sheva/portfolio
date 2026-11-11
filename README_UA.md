# Як зібрати й запустити портфоліо

## Що треба один раз встановити

- **Node.js** (версія LTS) з nodejs.org
- **Git** і акаунт на **GitHub**
- **Claude Code** (у тебе вже є)
- Акаунт на **vercel.com** — заходь через GitHub

## 1. Збірка в Claude Code

1. Розпакуй цей архів у порожню папку, наприклад `yuliia-portfolio`.
2. Відкрий цю папку в Claude Code.
3. Встав такий запит:

```
Read BUILD_BRIEF.md fully, then build the site phase by phase.
Stop after each phase, run it locally and tell me what to check in the browser.
```

4. Після кожної фази відкривай http://localhost:3000 і кажи, що поправити.

## 2. GitHub

1. На GitHub створи новий порожній репозиторій, наприклад `portfolio`.
2. Попроси Claude Code: «Push this project to my GitHub repo <посилання на репозиторій>».

## 3. Vercel

1. На vercel.com: Add New → Project → обери репозиторій `portfolio` → Deploy.
2. Через хвилину сайт буде доступний за адресою вигляду `portfolio-xxx.vercel.app`.
3. Відтепер кожна зміна на GitHub автоматично оновлює сайт.
4. Власний домен — за бажанням, приблизно $10–15 на рік. Підключається в налаштуваннях проєкту на Vercel, розділ Domains.

## 4. Аналітика

1. **Microsoft Clarity:** clarity.microsoft.com → New project → скопіюй Project ID.
2. **Google Analytics 4:** analytics.google.com → створи property → Web stream → скопіюй Measurement ID (вигляду `G-XXXXXXX`).
3. **Vercel:** проєкт → Settings → Environment Variables → додай:
   - `NEXT_PUBLIC_CLARITY_ID` = твій Project ID
   - `NEXT_PUBLIC_GA_ID` = твій Measurement ID
4. Перезапусти деплой (Deployments → Redeploy).
5. На вкладці **Analytics** у Vercel натисни Enable — це перегляди без кук.

Без натиснутого «Accept» на банері Clarity і GA нічого не збирають, і це нормально: так працює згода.

## 5. Як потім правити тексти самій

1. Відкрий свій репозиторій на GitHub.
2. Тексти головної: `content/home.json`. Тексти кейсів: `content/cases/<назва-кейсу>.mdx`.
3. Натисни олівець (Edit), зміни текст, натисни Commit changes.
4. Приблизно за хвилину Vercel оновить сайт.

У `home.json` змінюй лише текст у лапках праворуч від двокрапки й не видаляй коми й дужки.

## Що ще лишилось на потім

- **Скриншоти Care for Kids:** після дозволу компанії. Місця під них описані в `design/image-slots/`.
- **CV:** місяць завершення роботи в Cobalt.
- **Твоє вичитування текстів:** після нього правки вносяться прямо в `content/`.

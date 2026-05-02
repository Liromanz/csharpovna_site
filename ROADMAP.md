# Roadmap & Outstanding Work

Что осталось сделать после миграции с Django на Astro. Этот файл обновляется по мере продвижения работ — продолжение возможно из любой новой сессии (см. `README.md` → «Что я могу попросить у Claude»).

## Status snapshot — 2026-05-02

✅ **Готово:**
- Astro 5 (`output: "static"` + Node-адаптер) с Tailwind 4, design tokens 1:1 со старым сайтом, шрифты Poppins/Cascadia Code.
- Sidebar с переключением разделов C#/WPF/Java, скролл починен (`overflow-y: auto` — баг №5 закрыт).
- Header с табами разделов, бургером, поиском (Cmd+K), кнопкой «Поддержать».
- Content collections: схема `lessonSchema` с полями `accessLevel`, `quiz`, `engagement` (заготовки под подписку и тесты).
- 34 урока-стаба в `src/content/csharp/` (3 формально `placeholder: true`: `modifiers`, `abstractions`, `polymorphism`).
- Главная, About, WPF/Java заглушки, 404 — текст 1:1 из Django.
- Блог в SQLite: 19 постов засеяны из старой Django-миграции; SSR-страницы `/devblog/`, `/devblog/page/N/`, `/devblog/<slug>/`; tag-фильтр + пагинация по 10 постов.
- Engagement: SQLite + API endpoints (`/api/view`, `/api/like`, `/api/stats/...`); компонент `<EngagementBar>` подключён в LessonLayout и в страницу поста.
- Quiz/Paywall заготовка: компоненты `<Quiz>`, `<Question>`, `<Paywall>`; `/api/quiz/check` отвечает 501 (зарезервирован).
- Pagefind полнотекстовый поиск (Cmd+K), индекс генерится в `pnpm build`.
- SEO: `<SEO>` компонент с canonical/OG/Twitter Card/JSON-LD на каждой странице, `robots.txt`, авто-`sitemap-index.xml`, redirect `/aboutMe` → `/about`.
- 244 картинки уроков в `src/assets/csharp/` (импорт через `astro:assets`).
- CLAUDE.md, README.md, ROADMAP.md — документация.
- Django полностью удалён.

⏳ **Осталось:** см. ниже.

---

## 1. Перенос содержимого уроков C# в MDX  *(самый большой таск)*

**31 урок** (34 минус 3 placeholder) нуждается в переносе тела из старых Django-шаблонов в `.mdx`. Сейчас у каждого из них только frontmatter, тело пустое.

### Источник

Django-шаблоны удалены из рабочего дерева (коммит `2ed2d84`), но **сохранены в git-истории**. Последний коммит, где они присутствовали, — `d2313d5` (или любой коммит до `2ed2d84`). Получить текст любого шаблона:

```bash
git show d2313d5:csharp/templates/1_Variables.html > /tmp/1_Variables.html
git show d2313d5:csharp/templates/10_linq.html    > /tmp/10_linq.html
# и т.д.
```

Список соответствий `slug ↔ файл шаблона` (по `csharp/urls.py` из того же коммита):

| Slug | Django template |
|---|---|
| `variables` | `1_Variables.html` |
| `converters` | `2_Converters.html` |
| `datetime` | `3_Datetime.html` |
| `var` | `4_var.html` |
| `transformation` | `5_transformation.html` |
| `if` | `6_If.html` |
| `cycles` | `7_cycles.html` |
| `collections` | `8_collections.html` |
| `trycatch` | `9_trycatch.html` |
| `linq` | `10_linq.html` |
| `ternar` | `11_ternar.html` |
| `regex` | `12_regex.html` |
| `readkey` | `13_readkey.html` |
| `consoleuse` | `14_consoleuse.html` |
| `arrowmenu` | `15_arrowmenu.html` |
| `methods` | `16_methods.html` |
| `classasmodel` | `17_classasmodel.html` |
| `classascontainer` | `18_classascontainer.html` |
| `modifiers` | `19_modifiers.html` *(placeholder в Django, оставить так)* |
| `staticclass` | `20_staticclass.html` |
| `files` | `21_files.html` |
| `json` | `22_json.html` |
| `xml` | `23_xml.html` |
| `directory` | `24_directory.html` |
| `process` | `25_process.html` |
| `threads` | `26_threads.html` |
| `nasled` | `27_inheritance.html` |
| `interface` | `28_interface.html` |
| `abstractions` | `29_abstractions.html` *(placeholder)* |
| `polymorphism` | `30_polymorphism.html` *(placeholder)* |
| `enum` | `31_enum.html` |
| `tests` | `32_tests.html` |
| `generic` | `33_generic.html` |
| `this` | `34_this.html` |

### Правила миграции

- **Тело урока — 1:1.** Параграфы, порядок предложений, списки, привязка к картинкам — переносим дословно. (См. CLAUDE.md → «Правила работы с контентом».)
- **Заголовки можно адаптировать.** В Django заголовок темы был `<h2 class="anchor" id="...">`. В MDX:
  - `frontmatter.title` — это `<h1>` страницы (генерится `LessonLayout`). Можно перефразировать под SEO (например, `Переменные` → `Переменные в C#: ввод и вывод данных`).
  - В теле MDX используем `## Подзаголовок` (станут `<h2>`) и `### ...` (станут `<h3>`). Якоря `id="..."` генерятся автоматически через `rehype-slug`. **Не пишем самописные `<h2 class="anchor" id="...">`.**
- **Картинки.** В Django использовалось `{% static 'img/charp/1_Variables/1datatypes.png' %}`. В MDX переносим на `astro:assets`:
  ```mdx
  import { Image } from "astro:assets";
  import dataTypesImg from "@/assets/csharp/1_Variables/1datatypes.png";

  <Image src={dataTypesImg} alt="Базовые типы данных в C#" />
  ```
  Все 244 картинки уже в `src/assets/csharp/<topic>/<file>.png` — пути идентичны старым Django-путям после `static/img/charp/`.
- **Блоки кода.** В Django был `<div class="code-block"><p class="code-text">...</p></div>` без подсветки. В MDX используем стандартный fenced-блок:
  ````mdx
  ```csharp
  int age = 25;
  Console.WriteLine(age);
  ```
  ````
  `astro-expressive-code` сам подсветит и сделает кнопку «Скопировать».
- **Внутренние ссылки.** Django-шаблоны использовали `{% url 'имя' %}`. В MDX заменяем на абсолютные пути: `[конвертация](/csharp/converters)`.
- **Frontmatter.** В уже сгенерированном стабе обновляем:
  - `title` — финальная SEO-формулировка (можно отличается от Django-заголовка).
  - `description` — 1-2 предложения (важно для `<meta description>` и Pagefind-сниппета).
  - `placeholder: true` → `false` для уроков, чьё тело перенесено.
  - `keywords: [...]` — опционально, 3-7 ключевых фраз для `<meta keywords>`.

### Рекомендуемый ритм

3-5 уроков за коммит, ревью пользователя после каждой пачки. Порядок миграции — по группам сайдбара:

1. Группа **«Основы C#»** (9 уроков): variables, converters, datetime, var, transformation, if, cycles, collections, trycatch.
2. Группа **«Упрощение кода»** (3): linq, ternar, regex.
3. Группа **«Работа с консолью»** (3): readkey, consoleuse, arrowmenu.
4. Группа **«Классы»** (4 + 1 placeholder): methods, classasmodel, classascontainer, ~~modifiers~~, staticclass.
5. Группа **«Работа с системой»** (5): files, json, xml, directory, process.
6. Группа **«Многопоточность»** (1): threads.
7. Группа **«ООП»** (3 + 2 placeholder): nasled, interface, ~~abstractions~~, ~~polymorphism~~, enum.
8. Группа **«Тестирование»** (1): tests.
9. Группа **«Дополнительно»** (2): generic, this.

Итого: **31 урок** к переносу, 3 остаются `placeholder: true`.

---

## 2. Админка для блога

Сейчас постов в блоге можно добавить только через `pnpm db:studio` или повторный `pnpm db:seed`. Нужно дать пользователю простой web-интерфейс.

### План

- **Auth.** Использовать `lucia-auth` (или `auth-astro`, или написать минимальный сессии-через-cookie вручную — для одного админ-пользователя это проще). Один admin-юзер сидится при первом запуске из env-переменных `ADMIN_EMAIL` и `ADMIN_PASSWORD_HASH` (bcrypt-хеш).
- **Middleware.** `src/middleware.ts` — для запросов на `/admin/*` и `POST/PATCH/DELETE /api/posts/*` проверяем cookie сессии, если нет/истекла → редирект на `/admin/login`.
- **Страницы:**
  - `src/pages/admin/login.astro` — форма email+password, POST на `/api/auth/login` → cookie + редирект на `/admin/`.
  - `src/pages/admin/index.astro` — список постов с кнопками «Редактировать» и «Удалить» + кнопка «Создать новый пост».
  - `src/pages/admin/posts/[id].astro` — форма редактирования (создания если `id === "new"`), поля: title, slug (auto), description, date, content (textarea, markdown), tags (multi-select).
- **API endpoints:**
  - `POST /api/auth/login` — валидация, создание сессии в `sessions`, установка cookie.
  - `POST /api/auth/logout` — удаление сессии и cookie.
  - `POST /api/posts` — создать пост (admin only).
  - `PATCH /api/posts/[id]` — обновить (admin only).
  - `DELETE /api/posts/[id]` — удалить (admin only).
- **UX:**
  - Форма поста с предпросмотром (опционально — markdown-it на клиенте).
  - При сохранении автоматически перегенерим список постов на `/devblog/` (SSR — он всегда свежий).
- **Тесты:**
  - Создание/редактирование/удаление через UI.
  - Без авторизации `/admin/*` редиректит на `/admin/login`.
  - Без авторизации мутирующие `/api/posts` отдают 401.

### Заготовка в схеме БД

Таблицы `users` и `sessions` уже определены в `src/db/schema.ts`. Миграция `0000_initial.sql` их создаёт. Для лоунча админки нужно:
1. Сгенерировать пароль: `node -e "import('bcryptjs').then(b => console.log(b.default.hashSync('your-password', 10)))"`.
2. В env прописать `ADMIN_EMAIL` и `ADMIN_PASSWORD_HASH`.
3. Запустить admin-сид (нужно написать `src/db/admin-seed.ts`): создаст одного user с `isAdmin=true`.

---

## 3. Деплой на TimeWeb

Целевая платформа — **TimeWeb Cloud Apps** (git-интеграция).

### План

1. В админке TimeWeb создать приложение типа **Node.js**, привязать к репозиторию GitHub, ветка — `master` (после мёржа `astro-rewrite` → `master`).
2. **Build command:** `pnpm install && pnpm build`.
   **Start command:** `node ./dist/server/entry.mjs`.
   Порт берётся из env `PORT` (Astro Node adapter это поддерживает).
3. **Persistent volume.** Подключить volume в `/app/data/` — там будет лежать `codedocss.db`. Без этого БД будет пересоздаваться при каждом ребилде.
4. **Env-переменные** в админке TimeWeb:
   ```
   DATABASE_URL=file:/app/data/codedocss.db
   SITE_URL=https://codedocss.ru
   ADMIN_EMAIL=...
   ADMIN_PASSWORD_HASH=...     # bcrypt
   SESSION_SECRET=...           # 32+ случайных байт
   NODE_ENV=production
   ```
5. **Миграции.** Через консоль TimeWeb после первого деплоя:
   ```bash
   pnpm db:migrate
   pnpm db:seed       # один раз при первом запуске
   ```
   В будущем при изменениях схемы — запускать `pnpm db:migrate` при каждом деплое (можно добавить в `prestart` хук).
6. **SSL.** Включить бесплатный Let's Encrypt в админке для домена `codedocss.ru`.
7. **DNS.** Перенаправить `codedocss.ru` на TimeWeb-приложение.
8. **Бэкапы SQLite.** Настроить ежедневный cron на TimeWeb или GitHub Action: копировать `/app/data/codedocss.db` в S3-бакет TimeWeb Cloud Storage.

### Проверка после деплоя

- `https://codedocss.ru/` → 200 OK, главная видна.
- `https://codedocss.ru/csharp/variables` → 200 OK, контент урока виден, картинки грузятся.
- `https://codedocss.ru/devblog/` → 200 OK, посты из БД видны.
- `https://codedocss.ru/devblog/?tag=План` → фильтр работает.
- `https://codedocss.ru/sitemap-index.xml` → существует.
- `https://codedocss.ru/robots.txt` → корректный.
- Lighthouse SEO score ≥ 95.
- Создать пост через `/admin/` → появляется на `/devblog/` без редеплоя.

---

## 4. Опциональные улучшения

Не блокируют запуск, но стоит сделать когда-нибудь:

- **OG-картинки на лету.** Сейчас все используют `/img/safika.png`. Можно генерить per-page OG через `@vercel/og` или `satori`.
- **RSS-фид блога.** `src/pages/rss.xml.ts` — Astro имеет `@astrojs/rss`.
- **Markdown в блоге.** Сейчас рендер plain-text → HTML минимальный. Если посты станут длиннее, можно подключить `marked` или хранить пост как MDX с компонентами.
- **Backup-CI.** GitHub Action раз в сутки копирует `/app/data/codedocss.db` через SSH в private S3.
- **Lighthouse в CI.** Добавить `lhci` в GitHub Actions, fail если SEO < 90.
- **Quiz-валидатор.** Реализовать `/api/quiz/check` для `checkType: "exact"` (простое сравнение). Для `code-runtime` — отдельная итерация (sandbox / Roslyn API).

---

## 5. Отдельные итерации (по запросу пользователя)

- **SEO-предложения для тел уроков.** Подготовить `.md`-файл с конкретными правками каждого урока: где добавить ключевые фразы, какие предложения переформулировать. **Изменения в тела уроков делать только после явного одобрения каждой правки.**
- **Подписочная модель.** Активация Quiz и платных уроков. Регистрация/вход обычных пользователей, ЮKassa или Stripe-интеграция, поле `accessLevel: "subscriber"` в frontmatter начинает работать.

---

## Как продолжить с другого компьютера

```bash
git clone <repo-url> codedocss_site
cd codedocss_site
git checkout astro-rewrite               # ветка с переписью
pnpm install
pnpm rebuild better-sqlite3 esbuild sharp
DATABASE_URL=file:./data/codedocss.db pnpm db:migrate
DATABASE_URL=file:./data/codedocss.db pnpm db:seed
DATABASE_URL=file:./data/codedocss.db pnpm dev
```

В новой сессии Claude автоматически прочитает `CLAUDE.md` и поймёт правила.
Чтобы продолжить работу с конкретной задачей — просто попросите:

> «Продолжи перенос уроков из ROADMAP §1, начиная с группы "Основы C#" (variables..trycatch). По 3 урока за раз с ревью.»

или

> «Сделай админку для блога согласно ROADMAP §2.»

или

> «Подготовь приложение к деплою на TimeWeb Cloud Apps согласно ROADMAP §3.»

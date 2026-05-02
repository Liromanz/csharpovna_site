# CodeDocSS

Учебная база знаний по C# и .NET — `https://codedocss.ru`.

Сайт переписан с Django 5.1 на **Astro 5** (статический рендер по умолчанию + Node-эндпоинты для блога, лайков и просмотров) с **SQLite** в качестве хранилища блога и engagement-данных.

> Архитектура и правила работы с контентом — в [`CLAUDE.md`](./CLAUDE.md).
> Что ещё нужно сделать — в [`ROADMAP.md`](./ROADMAP.md).

## Требования

- Node.js **20+** (рекомендуется 22 LTS)
- `pnpm` **9+** — менеджер пакетов проекта
- C-компилятор для нативной сборки `better-sqlite3` (на macOS — Xcode CLT, на Linux — `build-essential`, на Windows — Build Tools for VS)

## Быстрый старт

```bash
pnpm install                                                  # зависимости
pnpm rebuild better-sqlite3 esbuild sharp                     # один раз — нативные модули
DATABASE_URL=file:./data/codedocss.db pnpm db:migrate         # создаём таблицы
DATABASE_URL=file:./data/codedocss.db pnpm db:seed            # начальные посты + теги
DATABASE_URL=file:./data/codedocss.db pnpm dev                # dev-сервер на http://localhost:4321
```

После этого открываются:
- `/` — главная
- `/about` — обо мне
- `/csharp/<slug>` — 34 урока (большинство — заглушки, см. ROADMAP)
- `/devblog/` и `/devblog/<slug>/` — блог
- `/wpf/`, `/java/` — заглушки разделов

## Команды

| Команда | Что делает |
|---|---|
| `pnpm dev` | Dev-сервер с hot reload на 4321 |
| `pnpm build` | Production-сборка (Astro + Pagefind index) → `dist/` |
| `pnpm preview` | Запустить production-сборку локально |
| `pnpm db:generate` | Сгенерировать миграцию из изменений в `src/db/schema.ts` |
| `pnpm db:migrate` | Применить миграции к SQLite (нужен `DATABASE_URL`) |
| `pnpm db:seed` | Залить начальные посты блога (идемпотентно) |
| `pnpm db:studio` | Открыть Drizzle Studio (web UI для просмотра БД) |
| `pnpm typecheck` | TypeScript-проверка через `astro check` (потребует первого запуска `pnpm exec astro check` для установки `@astrojs/check`) |

## Как добавить новый урок

1. Открыть `src/data/sections.ts` и добавить пункт в нужную группу:
   ```ts
   { slug: "delegates", label: "Делегаты и события" }
   ```
2. Создать файл `src/content/csharp/delegates.mdx`:
   ```mdx
   ---
   title: "Делегаты и события в C#"
   description: "Объявление делегатов, multicast, event и подписки."
   group: "ООП"
   ---

   ## Что такое делегат

   ...текст урока...
   ```
3. Картинки складываем в `src/assets/csharp/<topic_folder>/` и подключаем через:
   ```mdx
   import { Image } from "astro:assets";
   import schemeImg from "@/assets/csharp/35_delegates/1_scheme.png";

   <Image src={schemeImg} alt="Схема делегата" />
   ```
4. Запустить `pnpm dev` — урок появится в сайдбаре и по адресу `/csharp/delegates`.

> **Важно.** При переносе уроков из старых Django-шаблонов **тело урока (абзацы, описание) сохраняется 1:1**.
> Заголовки `<h1>/<h2>/<h3>` можно адаптировать под SEO. Картинки и текст связаны — переформулировка ломает контекст.

## Как добавить новый пост в блог

Сейчас CRUD-админка ещё не реализована (см. ROADMAP). Временные варианты:

**Вариант 1 — добавить в seed-скрипт и пересеять:**
```bash
# отредактировать src/db/seed.ts (массив postsData), затем:
DATABASE_URL=file:./data/codedocss.db pnpm db:seed
```
Сид идемпотентный — существующие посты не дублируются.

**Вариант 2 — `pnpm db:studio` (web UI Drizzle):**
- Открыть таблицу `posts`, добавить запись (`title`, `description`, `content`, `slug`, `date`).
- Связать с тегом через таблицу `post_tags`.

После изменений достаточно `Ctrl+R` в браузере (SSR подтянет свежие данные).

## Деплой

Целевая платформа — **TimeWeb Cloud Apps** с git-интеграцией. Подробности в [`ROADMAP.md`](./ROADMAP.md#деплой-на-timeweb).

## Структура проекта

```
src/
├── content/csharp/      # MDX-уроки (34 файла)
├── data/sections.ts     # структура sidebar
├── db/                  # SQLite schema + миграции + seed
├── layouts/             # BaseLayout, LessonLayout
├── components/          # Sidebar, Header, BlogCard, EngagementBar, Quiz, ...
├── pages/               # маршруты (csharp/, devblog/, api/, ...)
├── lib/                 # хелперы (lessons, blog, seo, slug, fingerprint)
└── styles/global.css    # design tokens + базовые стили
public/                  # favicon, robots.txt, картинки в виде статики
src/assets/csharp/       # картинки уроков (244 PNG, импорт через astro:assets)
data/codedocss.db        # SQLite БД (gitignored, на проде — persistent volume)
```

## Что я могу попросить у Claude в новой сессии

В следующей сессии (на другом компьютере или после перерыва) Claude увидит [`CLAUDE.md`](./CLAUDE.md) и [`ROADMAP.md`](./ROADMAP.md) и поймёт контекст. Полезные просьбы:

- **«Перенеси уроки из ROADMAP, начиная с переменных, по 3 урока за раз, потом покажи мне на ревью»** — сделает миграцию HTML → MDX, сохранит тело 1:1, обновит `placeholder: false`.
- **«Сделай админку для блога согласно плану в ROADMAP»** — реализует auth, login-страницу, CRUD-формы, API endpoints.
- **«Подготовь приложение к деплою на TimeWeb Cloud Apps»** — настроит env, проверит билд, добавит health-check, документирует процесс деплоя.
- **«Добавь пост в блог: …»** — добавит запись в seed + перезальёт.
- **«Найди в текстах уроков места, которые стоит улучшить под SEO, и пришли .md-файл с предложениями»** — собирает рекомендации, **не меняя сами уроки** без отдельного одобрения.

Все правила и долгосрочное направление зафиксированы в `CLAUDE.md` — Claude будет следовать им автоматически.

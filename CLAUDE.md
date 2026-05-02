# CodeDocSS — Architecture & Conventions

Учебный сайт по C# и .NET (`https://codedocss.ru`). Перенесён с Django 5.1 на **Astro 5 hybrid + SQLite** одной командой деплоя.

## Stack at a glance

| Слой | Технология | Где |
|---|---|---|
| Framework | Astro 5, `output: "static"`, adapter `@astrojs/node` standalone | `astro.config.mjs` |
| UI | Astro components + Tailwind 4 + design-tokens через CSS-переменные | `src/styles/global.css` |
| Контент уроков | MDX в content collections | `src/content/csharp/`, `src/content/wpf/`, `src/content/java/` |
| Контент блога | SQLite (better-sqlite3) + Drizzle ORM | `src/db/schema.ts`, `data/codedocss.db` |
| Engagement | API endpoints + SQLite таблицы `views`/`likes`/`view_seen` | `src/pages/api/{view,like,stats}` |
| Auth | (заготовка) — будет lucia или auth-astro для админки и подписок | `src/db/schema.ts` (users, sessions) |
| Подсветка кода | `astro-expressive-code` | `astro.config.mjs` |
| Якоря и TOC | `rehype-slug` + `rehype-autolink-headings` + `entry.render().headings` | `src/components/TableOfContents.astro` |
| Поиск | Pagefind (полнотекстовый) | сборка через `pnpm build` |
| Хостинг | TimeWeb Cloud Apps + persistent volume для SQLite | (см. план) |

## Layout / структура

```
src/
├── content/
│   ├── config.ts              # Zod-схемы collections (включая accessLevel, quiz, engagement)
│   ├── csharp/*.mdx           # 34 урока. 22 заглушки (placeholder:true). 12 ready без контента (наполнятся итеративно).
│   ├── wpf/                   # пусто (заглушка-страница в pages/wpf/index.astro)
│   └── java/                  # пусто (заглушка-страница в pages/java/index.astro)
├── data/
│   └── sections.ts            # источник правды для sidebar — 9 групп для C#, пусто для WPF/Java
├── db/
│   ├── schema.ts              # posts, tags, post_tags, views, likes, view_seen, quiz_attempts, users, sessions
│   ├── client.ts              # better-sqlite3 instance, WAL, foreign_keys
│   ├── migrate.ts             # запускает Drizzle migrations
│   ├── seed.ts                # сид 5 тегов + 19 постов из старой Django-миграции 0002
│   └── migrations/*.sql       # сгенерированы drizzle-kit
├── layouts/
│   ├── BaseLayout.astro       # html/head/body, Sidebar+Header+main, секцию определяет по URL
│   └── LessonLayout.astro     # обёртка для урока (TOC, prev/next, EngagementBar, JSON-LD)
├── components/
│   ├── Sidebar.astro          # читает текущую секцию из props, рендерит структуру меню. overflow-y-auto на десктопе и мобиле — фикс бага со скроллом.
│   ├── Header.astro           # переключатель C#/WPF/Java + бургер. JS — vanilla, без jQuery.
│   ├── SEO.astro              # title, description, canonical, OG, Twitter Card, JSON-LD
│   ├── BlogIndex.astro        # переиспользуется в /devblog/ и /devblog/page/N
│   ├── BlogCard.astro         # карточка поста
│   ├── Pagination.astro       # links вида /devblog/page/N
│   ├── EngagementBar.astro    # лайки + просмотры (vanilla JS island)
│   └── quiz/{Quiz,Question,Paywall}.astro  # заготовка под платную фичу — рендерит замочек
├── pages/
│   ├── index.astro                      # / (static)
│   ├── about.astro                      # /about (static)
│   ├── 404.astro
│   ├── csharp/[slug].astro              # /csharp/<slug> (getStaticPaths)
│   ├── wpf/index.astro, java/index.astro # заглушки разделов
│   ├── devblog/index.astro              # /devblog/ (SSR, prerender:false)
│   ├── devblog/page/[n].astro           # /devblog/page/N (SSR)
│   ├── devblog/[slug].astro             # /devblog/<slug> (SSR)
│   ├── api/view.ts, like.ts             # POST endpoints
│   ├── api/stats/[...slug].ts           # GET endpoint
│   └── api/quiz/check.ts                # POST endpoint, 501 (заготовка)
├── lib/{lessons,blog,seo,fingerprint,slug}.ts
└── styles/global.css                     # design tokens + базовые стили + prose-lesson + sidebar-scroll
```

## Команды

```bash
pnpm dev                     # dev на 4321
pnpm build                   # astro build + pagefind --site dist/client
pnpm preview                 # локальный preview production-сборки

pnpm db:generate             # сгенерить миграцию из изменений schema.ts
pnpm db:migrate              # применить миграции (нужен DATABASE_URL)
pnpm db:seed                 # сид (5 тегов + 19 постов из Django-миграции 0002)
pnpm db:studio               # web UI для просмотра БД

DATABASE_URL=file:./data/codedocss.db pnpm dev   # явно указываем путь к БД
```

## Env-переменные (production)

```
DATABASE_URL=file:/app/data/codedocss.db
SITE_URL=https://codedocss.ru
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...        # bcrypt
SESSION_SECRET=...             # 32+ байт случайных
```

## Деплой

TimeWeb Cloud Apps с git-интеграцией:
- Push в `master` → авто-билд+рестарт.
- Build: `pnpm install && pnpm build`. Start: `node ./dist/server/entry.mjs`.
- SQLite-файл живёт в persistent volume `/app/data/codedocss.db`.
- Миграции запускаются вручную через консоль TimeWeb (`pnpm db:migrate`).
- Сид — один раз при первом деплое (`pnpm db:seed`).

## Конвенции

### Styling
- Цветовая палитра — CSS-переменные из `src/styles/global.css`. **Не хардкодить цвета** в компонентах, использовать `var(--color-*)` или Tailwind-utility с этими переменными (`bg-[var(--color-sidebar)]`).
- `prose-lesson` класс — стили для контента в LessonLayout (h2, h3, paragraphs, code, images).
- `sidebar-scroll` — стилизованный кастомный scrollbar.

### Ссылки и якоря
- Заголовки `<h2>/<h3>` в MDX автоматически получают `id` через `rehype-slug`.
- `rehype-autolink-headings` добавляет visible " #" якорь рядом с заголовком (visible on hover).
- **Не использовать самописные `<h2 class="anchor" id="...">`** — это legacy из Django.

### MDX-уроки
- Frontmatter обязателен: `title`, `description`, `group`. `placeholder: true` для незаполненных уроков.
- `engagement: false` отключит EngagementBar на конкретной странице.
- `accessLevel: "subscriber"` — заготовка под платный контент. В MVP не активируется.
- `<Quiz id="..."><Question prompt="..." /></Quiz>` — встраиваем посреди статьи; для не-подписчиков рендерится `<Paywall>`.

### Engagement-slug
- Уроки: `csharp/<slug>` (например, `csharp/variables`).
- Посты блога: `blog/<slug>` (например, `blog/dobavlena-stranitsa-avtora`).

### Sections (C#/WPF/Java)
- Структура sidebar — в `src/data/sections.ts`. Чтобы добавить новый урок в сайдбар, **редактируем sections.ts** (slug, label) и создаём MDX-файл в `src/content/<section>/<slug>.mdx`.
- Заглушки уроков генерируются скриптом: `node scripts/create-lesson-stubs.mjs`. Идемпотентен.

## Правила работы с контентом

> **ВАЖНО.** Тело уроков (абзацы, объяснения, привязка к картинкам) **сохраняется 1:1**.
> Текст и картинки жёстко связаны — переформулировка ломает контекст.
> Заголовки `<h1>/<h2>/<h3>` можно адаптировать под SEO. SEO-обёртка (description, alt, JSON-LD) пишется поверх.
> Если есть SEO-предложения для тела — собрать в отдельный `.md` и согласовать с пользователем.

## Future vision (заготовки в архитектуре)

Заложено сейчас, реализуется позже по запросу:

1. **Quiz посреди статьи.** Компоненты `<Quiz>/<Question>` рендерят плашку-замочек до тех пор, пока не появится подписочная модель и `Astro.locals.user.isSubscriber === true`. API `/api/quiz/check` зарезервирован (501).
2. **Платный контент.** Поле `accessLevel` в frontmatter уроков. Для `subscriber` будет тизер + `<Paywall>`. Зашли заготовки в `users.isSubscriber`, `subscriptionExpiresAt`.
3. **Регистрация и вход.** Таблицы `users`/`sessions` готовы, но в MVP auth используется только для админки.
4. **Платёжка.** Будет добавлена как `/api/billing/*` (ЮKassa/Stripe). Schema-изменений не требуется.

## Что НЕ делаем

- Не добавлять Cloudflare Workers / Vercel / отдельные сервисы — всё в одном Astro-процессе.
- Не использовать jQuery (legacy из Django).
- Не плодить runtime-зависимости от Postgres/Redis — SQLite достаточно.
- Не переписывать тело уроков под SEO без согласия.
- Не использовать DEBUG=true в проде (старый Django-сайт жил так из-за статики, нам это не нужно).

## История миграции

Перенесли с Django 5.1 одним релизом:
- Удалены `manage.py`, `csharpovna_site/`, `main/`, `csharp/`, `wpf/`, `base_template/`, `db.sqlite3`, `requirements.txt`.
- Сохранены: 240 PNG-картинок (`csharp/static/img/charp/` → `src/assets/csharp/`), `favicon.ico`, `safika.png`.
- Содержимое 19 постов блога перенесено в SQLite через `src/db/seed.ts`.
- 12 «готовых» уроков переносим в MDX итеративно (по мере нужды), 22 заглушки помечены `placeholder: true`.

Старая ветка с попыткой переноса на Next.js — `project-rewrite-nextjs`, отброшена.

import { db, schema } from "./client";
import { eq } from "drizzle-orm";
import { uniqueSlug } from "@/lib/slug";

interface SeedPost {
  djangoId: number;
  title: string;
  content: string;
  tags: string[];
  date: Date;
}

const tagsData = ["Прочее", "Доработка", "Статьи", "Новое", "План"];

// Дата по умолчанию — 2026-03-13 (как в имени Django-миграции).
// Реальные даты постов в Django хранились с auto_now=True (т.е. дата создания записи),
// но в миграции эта информация потеряна. Используем убывающую дату по id, чтобы порядок
// в блоге был как в исходных данных (новые посты — выше).
const baseDate = new Date("2026-03-13T20:13:00Z");

const postsData: SeedPost[] = [
  {
    djangoId: 1,
    title: "Добавлена страница автора",
    content:
      "Теперь можно поподробнее ознакомится с автором сайта. По факту, в сайт было интегрировано просто резюме, но оно лучше всего отражает и опыт и сферу деятельности, так что милости прошу узнать чуть больше обо мне :)",
    tags: ["Новое"],
    date: new Date(baseDate.getTime() - 0 * 86400000),
  },
  {
    djangoId: 2,
    title: "Создана страница dev-блога",
    content:
      "Теперь вы можете узнавать о добавлении новых статей, страниц, и планировании новых лекций прямо на сайте из dev-блога, а также узнать о текущей стадии разработки сайта (ну и узнать как давно он обновлялся и стоит ли ждать актуализации данных)!",
    tags: ["Новое"],
    date: new Date(baseDate.getTime() - 1 * 86400000),
  },
  {
    djangoId: 4,
    title: "Выровнены картинки в статьях",
    content:
      "Заметила, что если открывать сайт с мобильной версии, картинки рвут контейнер сайта и уходят вправо, из-за чего появляется скролл вправо. Выставила ограничение на максимальную ширину 100%, чтобы читать было комфортнее.",
    tags: ["Доработка"],
    date: new Date(baseDate.getTime() - 2 * 86400000),
  },
  {
    djangoId: 5,
    title: "План на январь",
    content:
      'Переносы статей несколько застопорились, потому что я хотела добить статью «Модификаторы доступа». Однако в лекциях, что я писала, когда преподавала, там рассказано только о двух видах — public и private. Существует еще множество других модификаторов, о которых я бы хотела рассказать подробнее, но для этого пришлось бы переписывать лекцию. Так как это не приоритетная задача, и меня ждут много «готового» материала, я подумала что будет лучше пока опустить 1-2 лекции, чтобы наполнить десятки других страниц.\n\nИз планов:\n- Добавить оставшиеся блоки — работа с системой, многопоточность, ООП, тестирование и дополнительно\n- Приоритетно добавить лекцию по тестированию\n- Не включать лекции о модификаторах доступа и абстракции, так как они требуют переписывания\n- Добавить практические задания для отработки нескольких блоков лекций',
    tags: ["План"],
    date: new Date(baseDate.getTime() - 3 * 86400000),
  },
  {
    djangoId: 6,
    title: "Новая статья: Работа с файлами",
    content: "Статью можно прочитать на /csharp/files",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 4 * 86400000),
  },
  {
    djangoId: 7,
    title: "Новая статья: Работа с JSON",
    content: "Статью можно прочитать на /csharp/json",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 5 * 86400000),
  },
  {
    djangoId: 8,
    title: "Новая статья: Работа с XML",
    content: "Статью можно прочитать на /csharp/xml",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 6 * 86400000),
  },
  {
    djangoId: 9,
    title: "Новая статья: Работа с папками",
    content: "Статью можно прочитать на /csharp/directory",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 7 * 86400000),
  },
  {
    djangoId: 10,
    title: "Новая статья: Процессы — запуск, включение",
    content: "Статью можно прочитать на /csharp/process",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 8 * 86400000),
  },
  {
    djangoId: 11,
    title: "Новая статья: Многопоточность",
    content: "Статью можно прочитать на /csharp/threads",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 9 * 86400000),
  },
  {
    djangoId: 12,
    title: "Новая статья: Тесты, NUnit, Assert",
    content: "Статью можно прочитать на /csharp/tests",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 10 * 86400000),
  },
  {
    djangoId: 13,
    title: "Новая статья: Наследование",
    content: "Статью можно прочитать на /csharp/nasled",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 11 * 86400000),
  },
  {
    djangoId: 14,
    title: "Новая статья: Перечисляемые типы, enum",
    content: "Статью можно прочитать на /csharp/enum",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 12 * 86400000),
  },
  {
    djangoId: 15,
    title: "Новая статья: Generic-методы",
    content: "Статью можно прочитать на /csharp/generic",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 13 * 86400000),
  },
  {
    djangoId: 16,
    title: "Новая статья: Методы расширения, this",
    content: "Статью можно прочитать на /csharp/this",
    tags: ["Статьи"],
    date: new Date(baseDate.getTime() - 14 * 86400000),
  },
  {
    djangoId: 17,
    title: "План на апрель",
    content:
      "Основные блоки, которые я хотела добить, добиты. И от этого становится немного страшно, потому что нужно настроить отображение сайта индексацией поисковиков, а дальше дело за малым.\n\nЯ всё ещё думаю о том, как внедрить практические работы внутрь сайта, так как автоматическую проверку работ я не планировала делать, это больше задачи для самопроверки. Не уверена, что готова презентовать идею уже в апреле, потому что её дизайн только в зачатках у меня в голове. Однако, если я придумаю востребованность идеи, было бы замечательно внедрить все практические задания уже в этом месяце.\n\nТакже нужно закончить историю с тремя лекциями. Этим, вероятно, займусь с 21 по 28 апреля. А затем можно приступить ко второму большому блоку — переносу лекций по WPF.",
    tags: ["План"],
    date: new Date(baseDate.getTime() - 15 * 86400000),
  },
  {
    djangoId: 19,
    title: "Доработан поиск по тэгам в DevBlog",
    content:
      "Наконец дошли руки до того, что мне уже и самой начало мешать — поиск в DevBlog.\n\nКоличество новостей разрастаются, и я уже сама не знаю, какие именно тэги у меня есть, и в каком формате я писала те или иные записи 😅😅\n\nСделала так, чтобы тэги были кликабельные, и вывела список всех тэгов наверх для более удобной навигации.",
    tags: ["Доработка"],
    date: new Date(baseDate.getTime() - 16 * 86400000),
  },
  {
    djangoId: 20,
    title: 'Доработана страница «Об авторе»',
    content:
      "Долго думала о набивке информации в ней. По итогу получилось просто как резюме, что мне не шибко импонирует, ну ладно, пойдёт.\n\nНе хотелось писать слишком много стеков и фреймворков, потому что не все знаю достаточно хорошо, а пихать просто ради того, чтобы пихать, не считаю нужным.\n\nНо выглядит неплохо, это меня радует!",
    tags: ["Доработка"],
    date: new Date(baseDate.getTime() - 17 * 86400000),
  },
  {
    djangoId: 21,
    title: "Переработано бургер-меню",
    content:
      "Закончила, зашла на мобильную версию, поняла, что не закончила. Бургер-меню на мобильной версии двигало вообще всё, что можно. Теперь оно наезжает сверху.\n\nТеперь точно вроде всё по доработкам, и можно отдаться написанию и трёх оставшихся лекций.",
    tags: ["Доработка"],
    date: new Date(baseDate.getTime() - 18 * 86400000),
  },
];

async function seed() {
  console.log("Seeding database...");

  // 1. Тэги
  const tagIdByName = new Map<string, number>();
  for (const name of tagsData) {
    const existing = await db.select().from(schema.tags).where(eq(schema.tags.name, name)).get();
    if (existing) {
      tagIdByName.set(name, existing.id);
      continue;
    }
    const inserted = await db.insert(schema.tags).values({ name }).returning().get();
    tagIdByName.set(name, inserted.id);
  }
  console.log(`Tags ready: ${tagIdByName.size}`);

  // 2. Посты
  const usedSlugs = new Set<string>();
  // Подгружаем существующие slug-и, чтобы не пересоздавать
  const existingPosts = await db.select().from(schema.posts).all();
  for (const p of existingPosts) usedSlugs.add(p.slug);

  let inserted = 0;
  let skipped = 0;
  for (const post of postsData) {
    // По первой строке title-а считаем slug
    const slug = uniqueSlug(post.title, usedSlugs);

    // Проверяем, есть ли уже пост с таким djangoId или title — для идемпотентности.
    // Используем title как ключ, потому что djangoId не хранится в нашей схеме.
    const dup = existingPosts.find((p) => p.title === post.title);
    if (dup) {
      skipped++;
      continue;
    }

    usedSlugs.add(slug);
    const description = post.content.split("\n")[0]!.slice(0, 200);

    const [{ id: postId }] = await db
      .insert(schema.posts)
      .values({
        slug,
        title: post.title,
        description,
        content: post.content,
        date: post.date,
        draft: false,
      })
      .returning({ id: schema.posts.id });

    for (const tagName of post.tags) {
      const tagId = tagIdByName.get(tagName);
      if (!tagId) continue;
      await db.insert(schema.postTags).values({ postId, tagId });
    }
    inserted++;
  }

  console.log(`Posts inserted: ${inserted}, skipped: ${skipped}`);
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

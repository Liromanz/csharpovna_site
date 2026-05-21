export type SectionId = "csharp" | "wpf" | "java";

export interface SidebarItem {
  slug: string;
  label: string;
  placeholder?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type Section =
  | {
      id: SectionId;
      label: string;
      basePath: string;
      status: "ready";
      hiddenFromNav?: boolean;
      groups: SidebarGroup[];
    }
  | {
      id: SectionId;
      label: string;
      basePath: string;
      status: "coming-soon";
      hiddenFromNav?: boolean;
      comingSoonText: string;
      groups: SidebarGroup[];
    };

export const sections: Record<SectionId, Section> = {
  csharp: {
    id: "csharp",
    label: "C#",
    basePath: "/csharp",
    status: "ready",
    groups: [
      {
        title: "Основы C#",
        items: [
          { slug: "variables", label: "Переменные, ввод\\вывод данных" },
          { slug: "converters", label: "Конвертация" },
          { slug: "datetime", label: "Работа с датами: Datetime" },
          { slug: "var", label: "Var" },
          { slug: "transformation", label: "Преобразование типов данных" },
          { slug: "if", label: "Условия: if-else, switch-case" },
          { slug: "cycles", label: "Циклы: while, for, do-while" },
          { slug: "collections", label: "Коллекции: массив, лист, матрица. Цикл foreach" },
          { slug: "trycatch", label: "Обработка ошибок: try-catch" },
        ],
      },
      {
        title: "Упрощение кода",
        items: [
          { slug: "linq", label: "LINQ запросы" },
          { slug: "ternar", label: "Тернарные выражения — упрощение проверок" },
          { slug: "regex", label: "Регулярные выражения — Regex" },
        ],
      },
      {
        title: "Работа с консолью",
        items: [
          { slug: "readkey", label: "Чтение символов с клавиатуры" },
          { slug: "consoleuse", label: "Взаимодействие с консолью: расположение курсора, очистка" },
          { slug: "arrowmenu", label: "Пример стрелочного меню" },
        ],
      },
      {
        title: "Классы",
        items: [
          { slug: "methods", label: "Методы" },
          { slug: "classasmodel", label: "Классы как свои типы данных" },
          { slug: "classascontainer", label: "Классы как контейнеры" },
          { slug: "modifiers", label: "◘ Модификаторы доступа, инкапсуляция\\сокрытие", placeholder: true },
          { slug: "staticclass", label: "Статичные классы" },
        ],
      },
      {
        title: "Работа с системой",
        items: [
          { slug: "files", label: "Работа с файлами" },
          { slug: "json", label: "Работа с JSON" },
          { slug: "xml", label: "Работа с XML" },
          { slug: "directory", label: "Папки: создание, чтение, удаление" },
          { slug: "process", label: "Процессы: запуск, выключение" },
        ],
      },
      {
        title: "Многопоточность",
        items: [
          { slug: "threads", label: "Потоки, Thread" },
        ],
      },
      {
        title: "ООП",
        items: [
          { slug: "nasled", label: "Наследование" },
          { slug: "interface", label: "Интерфейсы" },
          { slug: "abstractions", label: "◘ Абстракции", placeholder: true },
          { slug: "polymorphism", label: "◘ Полиморфизм", placeholder: true },
          { slug: "enum", label: "Перечисляемые типы, enum" },
        ],
      },
      {
        title: "Тестирование",
        items: [
          { slug: "tests", label: "Unit-тесты, библиотека NUnit" },
        ],
      },
      {
        title: "Дополнительно",
        items: [
          { slug: "generic", label: "Generic-методы, тип данных T" },
          { slug: "this", label: "Методы расширения, this" },
        ],
      },
    ],
  },
  wpf: {
    id: "wpf",
    label: "WPF",
    basePath: "/wpf",
    status: "ready",
    groups: [
      {
        title: "Основы WPF и XAML",
        items: [
          { slug: "xaml-basics", label: "XAML-интерфейс, элементы, свойства", placeholder: true },
          { slug: "events-msgbox", label: "События, чтение\\вывод, MessageBox", placeholder: true },
          { slug: "radio-checkbox", label: "RadioButton, CheckBox", placeholder: true },
          { slug: "datepicker", label: "DatePicker, DateTime ещё раз", placeholder: true },
          { slug: "combobox-listbox", label: "ComboBox, ListBox, DisplayValuePath", placeholder: true },
          { slug: "layouts-grid", label: "Адаптивная вёрстка, сетки", placeholder: true },
        ],
      },
      {
        title: "Стилизация и многооконность",
        items: [
          { slug: "material-design", label: "Material Design, новые окна", placeholder: true },
          { slug: "file-dialogs", label: "CommonOpenFileDialog", placeholder: true },
          { slug: "ui-tests", label: "UI-тесты интерфейса", placeholder: true },
        ],
      },
      {
        title: "Страницы и работа с данными",
        items: [
          { slug: "pages", label: "Страницы", placeholder: true },
          { slug: "properties", label: "Свойства: get, set", placeholder: true },
          { slug: "datagrid", label: "DataGrid", placeholder: true },
        ],
      },
      {
        title: "MVVM",
        items: [
          { slug: "bindings", label: "Привязки, Bindings", placeholder: true },
          { slug: "mvvm", label: "MVVM", placeholder: true },
          { slug: "commands", label: "Команды в MVVM", placeholder: true },
        ],
      },
      {
        title: "Графика и кастомизация UI",
        items: [
          { slug: "images", label: "Картинки", placeholder: true },
          { slug: "animations", label: "Анимации WPF", placeholder: true },
          { slug: "custom-controls", label: "Пользовательские элементы, ContextMenu", placeholder: true },
        ],
      },
      {
        title: "Асинхронность и сеть",
        items: [
          { slug: "async-await", label: "Async/Await, Task", placeholder: true },
          { slug: "cancellation", label: "CancellationToken", placeholder: true },
          { slug: "tcp-ip", label: "TCP/IP", placeholder: true },
        ],
      },
      {
        title: "Сборка и темы приложения",
        items: [
          { slug: "app-settings", label: "Настройка приложения: иконки, события сборки, параметры", placeholder: true },
          { slug: "dictionaries-themes", label: "Словари ресурсов, смена темы", placeholder: true },
          { slug: "libraries", label: "Создание своих библиотек", placeholder: true },
        ],
      },
      {
        title: "Документы и почта",
        items: [
          { slug: "richtextbox", label: "RichTextBox", placeholder: true },
          { slug: "word-excel", label: "Word и Excel", placeholder: true },
          { slug: "email", label: "IMAP и SMTP для почты", placeholder: true },
        ],
      },
      {
        title: "Базы данных: Entity Framework",
        items: [
          { slug: "ef-connection", label: "Подключение и чтение из БД" },
          { slug: "ef-crud", label: "CRUD-операции" },
          { slug: "ef-multi-table", label: "Чтение из нескольких таблиц" },
          { slug: "ef-search", label: "Поиск и фильтрация" },
        ],
      },
      {
        title: "Базы данных: DataSet",
        items: [
          { slug: "dataset-connection", label: "Подключение и чтение из БД" },
          { slug: "dataset-crud", label: "CRUD-операции" },
          { slug: "dataset-multi-table", label: "Чтение из нескольких таблиц" },
          { slug: "dataset-search", label: "Поиск и фильтрация" },
          { slug: "dataset-auth", label: "Авторизация" },
          { slug: "dataset-import", label: "Импорт данных" },
        ],
      },
      {
        title: "API на ASP.NET",
        items: [
          { slug: "api-testing", label: "API, тестирование API", placeholder: true },
          { slug: "aspnet-api", label: "Создание своего API на ASP.NET", placeholder: true },
          { slug: "aspnet-requests", label: "Настройка запросов в API на ASP.NET", placeholder: true },
        ],
      },
      {
        title: "Развёртывание",
        items: [
          { slug: "installers", label: "Создание установщиков", placeholder: true },
        ],
      },
    ],
  },
  java: {
    id: "java",
    label: "Java",
    basePath: "/java",
    status: "coming-soon",
    hiddenFromNav: true,
    comingSoonText:
      "Раздел в разработке. Здесь появятся материалы по Java: основы языка, ООП, коллекции, Stream API.",
    groups: [],
  },
};

export const sectionList: ReadonlyArray<{ id: SectionId; label: string; basePath: string }> = (
  Object.values(sections) as Section[]
)
  .filter((s) => !s.hiddenFromNav)
  .map((s) => ({ id: s.id, label: s.label, basePath: s.basePath }));

/** Определить активную секцию по pathname. По умолчанию — csharp. */
export function detectSection(pathname: string): SectionId {
  if (pathname.startsWith("/wpf")) return "wpf";
  if (pathname.startsWith("/java")) return "java";
  if (pathname.startsWith("/csharp")) return "csharp";
  return "csharp";
}

/** Плоский список уроков секции в порядке сайдбара (для prev/next и т.п.). */
export function flatLessons(sectionId: SectionId): Array<{ groupTitle: string; item: SidebarItem }> {
  const section = sections[sectionId];
  const out: Array<{ groupTitle: string; item: SidebarItem }> = [];
  for (const g of section.groups) {
    for (const item of g.items) {
      out.push({ groupTitle: g.title, item });
    }
  }
  return out;
}

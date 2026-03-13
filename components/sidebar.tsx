"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"

interface LessonLink {
  title: string
  slug: string
  isPlaceholder?: boolean
}

interface LessonCategory {
  name: string
  lessons: LessonLink[]
}

const lessonCategories: LessonCategory[] = [
  {
    name: "Основы C#",
    lessons: [
      { title: "Переменные, ввод/вывод данных", slug: "variables" },
      { title: "Конвертация", slug: "converters" },
      { title: "Работа с датами: Datetime", slug: "datetime" },
      { title: "Var", slug: "var" },
      { title: "Преобразование типов данных", slug: "transformation" },
      { title: "Условия: if-else, switch-case", slug: "if" },
      { title: "Циклы: while, for, do-while", slug: "cycles" },
      { title: "Коллекции: массив, лист, матрица", slug: "collections" },
      { title: "Обработка ошибок: try-catch", slug: "trycatch" },
    ],
  },
  {
    name: "Упрощение кода",
    lessons: [
      { title: "LINQ запросы", slug: "linq" },
      { title: "Тернарные выражения", slug: "ternar" },
      { title: "Регулярные выражения - Regex", slug: "regex" },
    ],
  },
  {
    name: "Работа с консолью",
    lessons: [
      { title: "Чтение символов с клавиатуры", slug: "readkey" },
      { title: "Взаимодействие с консолью", slug: "consoleuse" },
      { title: "Пример стрелочного меню", slug: "arrowmenu" },
    ],
  },
  {
    name: "Классы",
    lessons: [
      { title: "Методы", slug: "methods" },
      { title: "Классы как свои типы данных", slug: "classasmodel" },
      { title: "Классы как контейнеры", slug: "classascontainer" },
      { title: "Модификаторы доступа", slug: "modifiers", isPlaceholder: true },
      { title: "Статичные классы", slug: "staticclass" },
    ],
  },
  {
    name: "Работа с системой",
    lessons: [
      { title: "Работа с файлами", slug: "files" },
      { title: "Работа с JSON", slug: "json" },
      { title: "Работа с XML", slug: "xml" },
      { title: "Папки: создание, чтение, удаление", slug: "directory" },
      { title: "Процессы: запуск, выключение", slug: "process" },
    ],
  },
  {
    name: "Многопоточность",
    lessons: [{ title: "Потоки, Thread", slug: "threads" }],
  },
  {
    name: "ООП",
    lessons: [
      { title: "Наследование", slug: "nasled" },
      { title: "Интерфейсы", slug: "interface" },
      { title: "Абстракции", slug: "abstractions", isPlaceholder: true },
      { title: "Полиморфизм", slug: "polymorphism", isPlaceholder: true },
      { title: "Перечисляемые типы, enum", slug: "enum" },
    ],
  },
  {
    name: "Тестирование",
    lessons: [{ title: "Unit-тесты, библиотека NUnit", slug: "tests" }],
  },
  {
    name: "Дополнительно",
    lessons: [
      { title: "Generic-методы, тип данных T", slug: "generic" },
      { title: "Методы расширения, this", slug: "this" },
    ],
  },
]

function CategorySection({ category }: { category: LessonCategory }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-[var(--sidebar-hover)] transition-colors"
      >
        <span>{category.name}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <ul className="pl-4">
          {category.lessons.map((lesson) => {
            const isActive = pathname === `/csharp/${lesson.slug}`
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/csharp/${lesson.slug}`}
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--sidebar-active)] text-white"
                      : "hover:bg-[var(--sidebar-hover)]",
                    lesson.isPlaceholder && "opacity-60"
                  )}
                >
                  {lesson.isPlaceholder && "◘ "}
                  {lesson.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export function Sidebar() {
  const { isOpen, close } = useSidebar()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[var(--sidebar)] overflow-y-auto transition-transform lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="sticky top-0 bg-[var(--sidebar)] p-4 border-b border-[var(--border)]">
          <h2 className="text-center text-lg font-semibold">
            C# - базовые структуры
          </h2>
        </div>
        <nav>
          <ul className="py-2">
            {lessonCategories.map((category) => (
              <CategorySection key={category.name} category={category} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

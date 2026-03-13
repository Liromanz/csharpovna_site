import Link from "next/link"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Добро пожаловать!</h2>
      
      <div className="space-y-4 text-[var(--foreground)] leading-relaxed">
        <p>
          Сайт был создан для того, чтобы поделиться наработками базы знаний о C#, которые рассказывались в семинарном
          формате для студентов-программистов.{" "}
          <Link href="/about" className="text-[var(--primary)] hover:underline">
            Автор сайта
          </Link>{" "}
          - действующий разработчик C#, и в рамках новых проектов и изучения новых технологий, информация на сайте также
          пополняется и делится по разделам.
        </p>

        <p>
          Сейчас на сайте есть раздел об основах C#, однако блоки будут увеличиваться. Как минимум - будет добавлен блок о
          разработке на WPF. Также, если вам нравится представленный материал, вы можете{" "}
          <a
            href="https://pay.cloudtips.ru/p/01e151c5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            поддержать проект
          </a>{" "}
          по кнопке в правом верхнем углу.
        </p>

        <p>
          Сайт не позиционирует себя как единственно правильный вариант написания кода и существует с целью базового
          ознакомления с ключевыми элементами в языках программирования. Цель - на пальцах рассказать о необходимых
          базовых аспектах, чтобы вы смогли разобраться!
        </p>

        <div className="line" />

        <p>
          Сейчас сайт находится в разработке - весь лекционный материал и наработки только переносятся на сайт, так что
          если вы видите символ <span className="font-bold">&#9688;</span>, это значит, что статьи на сайте пока нет, и она будет перенесена позже.
        </p>

        <p>
          Желаю вам удачи в изучении материала {"<3"}
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/csharp/variables"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Начать изучение C#
        </Link>
      </div>
    </div>
  )
}

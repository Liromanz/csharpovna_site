import { Mail, Github, User, Globe, BookOpen, Briefcase } from "lucide-react"

export const metadata = {
  title: "Обо мне - CodeDocSS",
  description: "София Скорогудаева - Team lead C#/.NET разработки",
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 border-b border-[var(--border)] mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center text-3xl font-bold text-[var(--primary-foreground)]">
            СС
          </div>
          <div>
            <h1 className="text-2xl font-bold">София Скорогудаева</h1>
            <p className="text-[var(--primary)]">Team lead C#/.NET разработки</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:sofia.skorogudaeva@mail.ru"
            className="flex items-center gap-2 text-[var(--primary)] hover:underline"
          >
            <Mail className="w-5 h-5" />
            <span>sofia.skorogudaeva@mail.ru</span>
          </a>
          <a
            href="https://github.com/liromanz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--primary)] hover:underline"
          >
            <Github className="w-5 h-5" />
            <span>Liromanz</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left column */}
        <div>
          {/* About me section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-bold text-[var(--primary)]">Обо мне</h2>
            </div>
            <div className="border-t border-[var(--border)] pt-4 space-y-3 leading-relaxed">
              <p>
                <strong>Я - C# разработчик и Team Lead</strong>, который любит и технологии и работу с людьми. В работе
                стремлюсь создавать понятный и единый контекст общения, объясняя сложные технические решения простым
                языком - как для тех, кто далек от разработки, так и для опытных специалистов. С красным дипломом
                окончила свое образовательное учреждение и в данный момент совмещаю руководство командой с разработкой,
                не забывая ни про один аспект каждой из областей.
              </p>
              <p>
                Меня увлекает не только техническая сторона проектов, но и их бизнес-составляющая: параллельно с
                развитием кодовой базы изучаю бизнес-анализ и процессы управления проектами.
              </p>
              <p>
                Также преподавала C# в вузе, накопив богатый лекционный материал, которым теперь хочу поделиться. Моя
                цель - создавать продукты, которые приносят пользу, и делиться знаниями с открытостью и энтузиазмом.
              </p>
            </div>
          </section>

          {/* Skills and Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-[var(--primary)]" />
                <h2 className="text-2xl font-bold text-[var(--primary)]">Навыки</h2>
              </div>
              <div className="border-t border-[var(--border)] pt-4">
                <ul className="space-y-3">
                  {[
                    "Руководство командой",
                    "Разработка и оптимизация ПО",
                    "Веб-разработка",
                    "Проектирование архитектуры",
                    "Анализ бизнес-процессов",
                    "Работа по Agile-методологиям",
                    "Преподавание",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-[var(--primary)]" />
                <h2 className="text-2xl font-bold text-[var(--primary)]">Инструментарий</h2>
              </div>
              <div className="border-t border-[var(--border)] pt-4">
                <ul className="space-y-3">
                  {[
                    "C#, .NET, WinForms, WPF, MAUI",
                    "Python, Django",
                    "Rest-API, GraphQL",
                    "MSSQL, PostgreSQL, MySQL",
                    "Git, Azure, Yandex Cloud",
                    "BPMN, UML",
                  ].map((tool) => (
                    <li key={tool} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Right column - Experience */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-[var(--primary)]" />
            <h2 className="text-2xl font-bold text-[var(--primary)]">Опыт работы</h2>
          </div>
          <div className="border-t border-[var(--border)] pt-4 space-y-6">
            {/* Job 1 */}
            <div className="relative pl-6 border-l-2 border-[var(--primary)]">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--primary)]" />
              <div className="mb-2">
                <h3 className="font-bold">Октябрь 2024 - н.в.</h3>
                <p className="text-[var(--muted-foreground)]">АО "Иридиум"</p>
              </div>
              <h4 className="text-lg font-bold text-[var(--primary)] mb-2">Team-lead C#/.NET разработки</h4>
              <p className="text-sm mb-3">Руководитель Windows-команды разработки почтового клиента.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  "Разработка приложения WinForms",
                  "Работа с почтовыми протоколами",
                  "Организация команды",
                  "Менторство",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative pl-6 border-l-2 border-[var(--primary)]">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--primary)]" />
              <div className="mb-2">
                <h3 className="font-bold">Июль 2024 - Сентябрь 2024</h3>
                <p className="text-[var(--muted-foreground)]">Ecoplatform</p>
              </div>
              <h4 className="text-lg font-bold text-[var(--primary)] mb-2">C#/.NET разработчик</h4>
              <p className="text-sm mb-3">
                Проектная деятельность - разработка приложения для взвешивания мешков и автоматической отправки данных на
                сервер
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {["Разработка WPF-приложения", "Передача данных через COM Port", "Работа с API", "Поддержка проекта"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Job 3 */}
            <div className="relative pl-6 border-l-2 border-[var(--primary)]">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--primary)]" />
              <div className="mb-2">
                <h3 className="font-bold">Март 2022 - Сентябрь 2024</h3>
                <p className="text-[var(--muted-foreground)]">IT-компании и вуз</p>
              </div>
              <h4 className="text-lg font-bold text-[var(--primary)] mb-2">Junior-Middle C#/.NET разработчик, Преподаватель</h4>
              <p className="text-sm">
                Разработка различных проектов на C#/.NET, преподавание C# в вузе, создание лекционных материалов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

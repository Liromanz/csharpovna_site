import { notFound } from "next/navigation"
import { getLesson, getAllLessonSlugs } from "@/lib/lessons"
import { TableOfContents } from "@/components/table-of-contents"
import { LessonNavigation } from "@/components/lesson-navigation"
import { LessonContent } from "@/components/lesson-content"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = getLesson(slug)
  
  if (!lesson) {
    return {
      title: "Урок не найден - CodeDocSS",
    }
  }

  return {
    title: `${lesson.title} - CodeDocSS`,
    description: `Урок по C#: ${lesson.title}. ${lesson.category}`,
  }
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params
  const lesson = getLesson(slug)

  if (!lesson) {
    notFound()
  }

  if (lesson.isPlaceholder) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-[var(--muted-foreground)] mb-4">Категория: {lesson.category}</p>
        
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 text-center">
          <p className="text-xl mb-4">На этой странице пока ничего нет!</p>
          <p className="text-[var(--muted-foreground)]">
            В будущем, тут может что-то появиться. Но пока, можете ознакомиться с другими статьями.
          </p>
        </div>

        <LessonNavigation
          previousLesson={lesson.previousLesson}
          nextLesson={lesson.nextLesson}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {lesson.toc.length > 0 && <TableOfContents items={lesson.toc} />}
      
      <LessonContent slug={slug} />

      <LessonNavigation
        previousLesson={lesson.previousLesson}
        nextLesson={lesson.nextLesson}
      />
    </div>
  )
}

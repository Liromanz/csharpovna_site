import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LessonNavigationProps {
  previousLesson?: { slug: string; title: string } | null
  nextLesson?: { slug: string; title: string } | null
}

export function LessonNavigation({
  previousLesson,
  nextLesson,
}: LessonNavigationProps) {
  if (!previousLesson && !nextLesson) return null

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border)]">
      {previousLesson ? (
        <Link
          href={`/csharp/${previousLesson.slug}`}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">К предыдущей статье</span>
          <span className="sm:hidden">Назад</span>
        </Link>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Link
          href={`/csharp/${nextLesson.slug}`}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <span className="hidden sm:inline">К следующей статье</span>
          <span className="sm:hidden">Вперёд</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

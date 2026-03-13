"use client"

import Link from "next/link"
import { Menu, PiggyBank } from "lucide-react"
import { useSidebar } from "./sidebar-provider"

export function Header() {
  const { toggle } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[var(--card)] px-4 py-3 border-b border-[var(--border)]">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm hover:text-[var(--primary)] transition-colors"
          >
            Главная
          </Link>
          <Link
            href="/about"
            className="hidden md:block px-3 py-2 text-sm hover:text-[var(--primary)] transition-colors"
          >
            Обо мне
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/about"
          className="md:hidden px-3 py-2 text-sm hover:text-[var(--primary)] transition-colors"
        >
          Обо мне
        </Link>
        <a
          href="https://pay.cloudtips.ru/p/01e151c5"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Поддержать сайт
        </a>
        <a
          href="https://pay.cloudtips.ru/p/01e151c5"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden flex items-center justify-center h-10 w-10 rounded bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          aria-label="Поддержать сайт"
        >
          <PiggyBank className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}

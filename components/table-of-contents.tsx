interface TocItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <div className="mb-6 p-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
      <h2 className="text-lg font-semibold mb-3">Содержание</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-[var(--primary)] hover:underline"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

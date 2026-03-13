interface CodeBlockProps {
  children: string
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className="code-block">
      <pre className="code-text">{children}</pre>
    </div>
  )
}

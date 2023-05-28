import React from 'react'
import { format } from 'date-fns'

interface DateFormatterProps {
  date: number
  pattern: string | 'd MMMM yyyy, H:m'
  as?: string
  className?: string
}

export default function DateFormatter({
  as,
  date,
  pattern,
  className,
}: DateFormatterProps) {
  const comp = React.createElement(
    as || 'div',
    { className },
    format(date, pattern),
  )
  return comp
}

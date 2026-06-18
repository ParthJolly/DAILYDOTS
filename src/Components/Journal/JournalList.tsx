import { JournalEntry } from '@/Types/JournalEntry'
import { JournalCard } from '@/Components/Journal/JournalCard'

interface JournalListProps {
  readonly entries: ReadonlyArray<JournalEntry>
  readonly onEdit?: (entry: JournalEntry) => void
  readonly onDelete?: (entry: JournalEntry) => void
  readonly emptyMessage?: string
}

export function JournalList({
  entries,
  onEdit,
  onDelete,
  emptyMessage = 'No journal entries yet. Start writing today!',
}: JournalListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <JournalCard
          key={entry.id}
          entry={entry}
          onEdit={() => onEdit?.(entry)}
          onDelete={() => onDelete?.(entry)}
        />
      ))}
    </div>
  )
}

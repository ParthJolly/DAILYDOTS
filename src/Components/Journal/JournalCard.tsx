import { JournalEntry, moodEmojis, moodLabels } from '@/Types/JournalEntry'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/UI/Card'
import { Button } from '@/Components/UI/Button'
import { Badge } from '@/Components/UI/Badge'
import { format } from 'date-fns'
import { Edit2, Trash2 } from 'lucide-react'

interface JournalCardProps {
  readonly entry: JournalEntry
  readonly onEdit?: () => void
  readonly onDelete?: () => void
}

export function JournalCard({ entry, onEdit, onDelete }: JournalCardProps) {
  const preview = entry.content.substring(0, 150) + (entry.content.length > 150 ? '...' : '')

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-2">{entry.title}</CardTitle>
            <CardDescription className="mt-1">
              {format(new Date(entry.date), 'MMMM d, yyyy')}
            </CardDescription>
          </div>
          {entry.mood && (
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl">{moodEmojis[entry.mood]}</div>
              <Badge variant="secondary" className="mt-1 text-xs">
                {moodLabels[entry.mood]}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{preview}</p>
        <div className="flex gap-2 justify-end">
          {onDelete && (
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button size="sm" onClick={onEdit}>
              <Edit2 className="mr-1 h-4 w-4" />
              View/Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

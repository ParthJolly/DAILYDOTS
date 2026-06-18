import { useState } from 'react'
import { JournalEntry, MoodType } from '@/Types/JournalEntry'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/UI/Card'
import { Button } from '@/Components/UI/Button'
import { Input } from '@/Components/UI/Input'
import { Textarea } from '@/Components/UI/Textarea'
import { MoodSelector } from '@/Components/Journal/MoodSelector'
import { format } from 'date-fns'
import { Trash2, Save } from 'lucide-react'

interface JournalEditorProps {
  readonly entry?: JournalEntry
  readonly onSave: (data: {
    date: string
    title: string
    content: string
    mood?: MoodType
  }) => void
  readonly onDelete?: () => void
  readonly onCancel?: () => void
  readonly isLoading?: boolean
}

export function JournalEditor({
  entry,
  onSave,
  onDelete,
  onCancel,
  isLoading,
}: JournalEditorProps) {
  const [date, setDate] = useState(entry?.date || new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState(entry?.title || '')
  const [content, setContent] = useState(entry?.content || '')
  const [mood, setMood] = useState<MoodType | undefined>(entry?.mood)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content')
      return
    }
    onSave({ date, title, content, mood })
  }

  const charCount = content.length

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</CardTitle>
          <CardDescription>
            {entry
              ? `Last updated: ${format(new Date(entry.updatedAt), 'MMM d, yyyy h:mm a')}`
              : 'Create a new journal entry for today'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={!!entry}
              className="mt-1"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="How was your day?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Mood Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">How are you feeling?</label>
            <MoodSelector value={mood} onChange={setMood} />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="content" className="block text-sm font-medium">
                Journal Entry
              </label>
              <span className="text-xs text-muted-foreground">{charCount} characters</span>
            </div>
            <Textarea
              id="content"
              placeholder="Write your thoughts, feelings, and experiences here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-64"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
            {entry && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
                disabled={isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {entry ? 'Update Entry' : 'Save Entry'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

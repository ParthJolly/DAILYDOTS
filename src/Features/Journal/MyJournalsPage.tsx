import { useState } from 'react'
import { UseJournal } from '@/Hooks/UseJournal'
import { JournalEntry, MoodType } from '@/Types/JournalEntry'
import { JournalList } from '@/Components/Journal/JournalList'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/Card'
import { Input } from '@/Components/UI/Input'
import { Button } from '@/Components/UI/Button'
import { Badge } from '@/Components/UI/Badge'
import { moodEmojis, moodLabels } from '@/Types/JournalEntry'
import { Search } from 'lucide-react'
import clsx from 'clsx'

interface MyJournalsPageProps {
  readonly onEdit: (entry: JournalEntry) => void
  readonly onDelete: (entry: JournalEntry) => void
  readonly onCreateNew: () => void
}

type SortOption = 'newest' | 'oldest' | 'title'

export function MyJournalsPage({ onEdit, onDelete, onCreateNew }: MyJournalsPageProps) {
  const { entries, deleteEntry } = UseJournal()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  // Filter and sort entries
  let filtered = [...entries]

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query)
    )
  }

  // Mood filter
  if (selectedMood) {
    filtered = filtered.filter((entry) => entry.mood === selectedMood)
  }

  // Sort
  switch (sortBy) {
    case 'oldest':
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const handleDelete = (entry: JournalEntry) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id)
      onDelete(entry)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">My Journals</h1>
        <Button onClick={onCreateNew}>+ New Entry</Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Mood Filter */}
          <div>
            <p className="text-sm font-medium mb-2">Filter by mood:</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                className={clsx(
                  'cursor-pointer',
                  !selectedMood
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
                variant={selectedMood ? 'secondary' : 'default'}
                onClick={() => setSelectedMood(null)}
              >
                All Moods
              </Badge>
              {Object.values(MoodType).map((mood) => (
                <Badge
                  key={mood}
                  className="cursor-pointer"
                  variant={selectedMood === mood ? 'default' : 'secondary'}
                  onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                >
                  <span className="mr-1">{moodEmojis[mood]}</span>
                  {moodLabels[mood]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-sm font-medium mb-2">Sort by:</p>
            <div className="flex flex-wrap gap-2">
              {(['newest', 'oldest', 'title'] as SortOption[]).map((option) => (
                <Button
                  key={option}
                  size="sm"
                  variant={sortBy === option ? 'default' : 'outline'}
                  onClick={() => setSortBy(option)}
                  className="capitalize"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {entries.length} entries
      </div>

      {/* Journal List */}
      <JournalList
        entries={filtered}
        onEdit={onEdit}
        onDelete={handleDelete}
        emptyMessage={
          entries.length === 0
            ? 'No journal entries yet. Start writing today!'
            : 'No entries match your filters.'
        }
      />
    </div>
  )
}

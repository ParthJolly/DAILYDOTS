import { useState } from 'react'
import { UseJournal } from '@/Hooks/UseJournal'
import { UseJournalStats } from '@/Hooks/UseJournalStats'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/Card'
import { Button } from '@/Components/UI/Button'
import { JournalEntry, moodEmojis, moodLabels, MoodType } from '@/Types/JournalEntry'
import { format } from 'date-fns'
import { BookOpen, TrendingUp, Flame, Edit3 } from 'lucide-react'
import clsx from 'clsx'

interface HomePageProps {
  readonly onNavigateToCreate: () => void
  readonly onNavigateToJournals: () => void
}

export function HomePage({ onNavigateToCreate, onNavigateToJournals }: HomePageProps) {
  const { entries } = UseJournal()
  const stats = UseJournalStats(entries)

  // Get today's entry if exists
  const today = new Date().toISOString().split('T')[0]
  const todayEntry = entries.find((e) => e.date === today)

  // Get recent entries
  const recentEntries = entries.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Daily Dots</h1>
        <p className="text-lg text-muted-foreground">
          Track your mood and capture your thoughts, one day at a time.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          label="Total Entries"
          value={stats.totalEntries}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="This Month"
          value={stats.entriesThisMonth}
        />
        <StatCard
          icon={<Flame className="h-6 w-6" />}
          label="Current Streak"
          value={`${stats.currentStreak} days`}
        />
        <StatCard
          icon={<Edit3 className="h-6 w-6" />}
          label="This Week"
          value={stats.entriesThisWeek}
        />
      </div>

      {/* Today's Entry or Quick Add */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {todayEntry ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📅 Today's Entry
                  {todayEntry.mood && (
                    <span className="ml-auto text-2xl">{moodEmojis[todayEntry.mood]}</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">{todayEntry.title}</h3>
                  {todayEntry.mood && (
                    <div className="inline-block px-2 py-1 rounded text-xs bg-accent/10 text-accent">
                      Feeling {moodLabels[todayEntry.mood]}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {todayEntry.content}
                </p>
                <div className="flex gap-2">
                  <Button onClick={onNavigateToCreate}>Edit Today</Button>
                  <Button variant="outline" onClick={onNavigateToJournals}>
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Entry Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Start journaling today! Write about your thoughts, feelings, and experiences.
                </p>
                <Button onClick={onNavigateToCreate} size="lg">
                  ✍️ Create Entry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mood Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.values(MoodType).map((mood) => (
                <div key={mood} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{moodEmojis[mood]}</span>
                    <span className="text-sm text-muted-foreground">
                      {moodLabels[mood]}
                    </span>
                  </div>
                  <span className="font-semibold text-sm">
                    {stats.moodCounts[mood]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries Preview */}
      {recentEntries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Entries</h2>
            <Button variant="ghost" onClick={onNavigateToJournals}>
              View All →
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recentEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base line-clamp-2">
                        {entry.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {entry.mood && (
                      <span className="text-lg">{moodEmojis[entry.mood]}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-muted-foreground opacity-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

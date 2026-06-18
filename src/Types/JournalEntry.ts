/**
 * Mood type enum with emoji representations
 */
export enum MoodType {
  Amazing = 'amazing',
  Happy = 'happy',
  Calm = 'calm',
  Neutral = 'neutral',
  Sad = 'sad',
  Angry = 'angry',
}

export const moodEmojis: Record<MoodType, string> = {
  [MoodType.Amazing]: '🤩',
  [MoodType.Happy]: '😊',
  [MoodType.Calm]: '😌',
  [MoodType.Neutral]: '😐',
  [MoodType.Sad]: '😢',
  [MoodType.Angry]: '😠',
}

export const moodLabels: Record<MoodType, string> = {
  [MoodType.Amazing]: 'Amazing',
  [MoodType.Happy]: 'Happy',
  [MoodType.Calm]: 'Calm',
  [MoodType.Neutral]: 'Neutral',
  [MoodType.Sad]: 'Sad',
  [MoodType.Angry]: 'Angry',
}

/**
 * Journal entry interface
 */
export interface JournalEntry {
  readonly id: string
  readonly date: string // YYYY-MM-DD format
  readonly title: string
  readonly content: string
  readonly mood?: MoodType
  readonly createdAt: string
  readonly updatedAt: string
}

/**
 * Type for creating a new journal entry (without id and timestamps)
 */
export type CreateJournalEntryInput = Omit<
  JournalEntry,
  'id' | 'createdAt' | 'updatedAt'
>

/**
 * Type for updating a journal entry
 */
export type UpdateJournalEntryInput = Partial<
  Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>
>

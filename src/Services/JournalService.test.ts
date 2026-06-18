import { describe, it, expect, beforeEach } from 'vitest'
import JournalService from '@/Services/JournalService'
import { MoodType } from '@/Types/JournalEntry'

describe('JournalService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should create a new entry', () => {
    const entry = JournalService.createEntry({
      date: '2024-01-01',
      title: 'Test Entry',
      content: 'Test content',
      mood: MoodType.Happy,
    })

    expect(entry.title).toBe('Test Entry')
    expect(entry.mood).toBe(MoodType.Happy)
    expect(entry.id).toBeDefined()
  })

  it('should retrieve all entries', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Entry 1',
      content: 'Content 1',
    })

    JournalService.createEntry({
      date: '2024-01-02',
      title: 'Entry 2',
      content: 'Content 2',
    })

    const entries = JournalService.getAllEntries()
    expect(entries).toHaveLength(2)
  })

  it('should update an entry', () => {
    const created = JournalService.createEntry({
      date: '2024-01-01',
      title: 'Original',
      content: 'Original content',
    })

    const updated = JournalService.updateEntry(created.id, {
      title: 'Updated',
    })

    expect(updated?.title).toBe('Updated')
  })

  it('should delete an entry', () => {
    const created = JournalService.createEntry({
      date: '2024-01-01',
      title: 'Test',
      content: 'Test',
    })

    const success = JournalService.deleteEntry(created.id)
    expect(success).toBe(true)

    const entries = JournalService.getAllEntries()
    expect(entries).toHaveLength(0)
  })

  it('should get entry by date', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Test',
      content: 'Test',
    })

    const entry = JournalService.getEntryByDate('2024-01-01')
    expect(entry?.date).toBe('2024-01-01')
  })

  it('should check if entry exists for date', () => {
    JournalService.createEntry({
      date: '2024-01-01',
      title: 'Test',
      content: 'Test',
    })

    expect(JournalService.hasEntryForDate('2024-01-01')).toBe(true)
    expect(JournalService.hasEntryForDate('2024-01-02')).toBe(false)
  })
})

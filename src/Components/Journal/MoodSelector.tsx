import { moodEmojis, moodLabels, MoodType } from '@/Types/JournalEntry'
import { Button } from '@/Components/UI/Button'

interface MoodSelectorProps {
  readonly value?: MoodType
  readonly onChange: (mood: MoodType) => void
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {Object.values(MoodType).map((mood) => (
        <Button
          key={mood}
          variant={value === mood ? 'default' : 'outline'}
          size="lg"
          className="h-16 flex-col"
          onClick={() => onChange(mood)}
          title={moodLabels[mood]}
        >
          <span className="text-2xl">{moodEmojis[mood]}</span>
          <span className="mt-1 text-xs">{moodLabels[mood]}</span>
        </Button>
      ))}
    </div>
  )
}

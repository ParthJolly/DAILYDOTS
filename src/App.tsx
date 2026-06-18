import { useState } from 'react'
import { Layout } from '@/Components/Layout/Layout'
import { HomePage } from '@/Features/Dashboard/HomePage'
import { MyJournalsPage } from '@/Features/Journal/MyJournalsPage'
import { AddJournalPage } from '@/Features/Journal/AddJournalPage'
import { JournalEntry } from '@/Types/JournalEntry'

type Page = 'home' | 'journals' | 'add'

interface NavigationState {
  page: Page
  editEntry?: JournalEntry | null
}

export default function App() {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' })

  const goHome = () => setNav({ page: 'home' })
  const goJournals = () => setNav({ page: 'journals', editEntry: null })
  const goAdd = (entry?: JournalEntry) => setNav({ page: 'add', editEntry: entry })
  const goEdit = (entry: JournalEntry) => setNav({ page: 'add', editEntry: entry })

  return (
    <Layout>
      {nav.page === 'home' && (
        <HomePage onNavigateToCreate={goAdd} onNavigateToJournals={goJournals} />
      )}

      {nav.page === 'journals' && (
        <MyJournalsPage
          onEdit={goEdit}
          onDelete={goHome}
          onCreateNew={goAdd}
        />
      )}

      {nav.page === 'add' && (
        <AddJournalPage entry={nav.editEntry} onSave={goHome} onCancel={goHome} />
      )}
    </Layout>
  )
}

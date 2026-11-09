import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { ProgressProvider } from './lib/progress'
import Layout from './components/Layout'
import Home from './pages/Home'
import Section from './pages/Section'
import Lesson from './pages/Lesson'
import Flashcards from './pages/Flashcards'
import Quick from './pages/Quick'
import { SheetList, SheetView } from './pages/Sheets'
import { ExamList, ExamPractical } from './pages/Exam'
import TheoryTest from './pages/TheoryTest'
import Search from './pages/Search'
import Progress from './pages/Progress'
import About from './pages/About'
import More from './pages/More'

// Podgląd w jednym pliku (np. jako artefakt) używa routera w pamięci; normalna strona: adresy z #
const Router = import.meta.env.VITE_MEMORY_ROUTER ? MemoryRouter : HashRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProgressProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dzial/:id" element={<Section />} />
            <Route path="lekcja/:id" element={<Lesson />} />
            <Route path="fiszki" element={<Flashcards />} />
            <Route path="5-minut" element={<Quick />} />
            <Route path="sciagi" element={<SheetList />} />
            <Route path="sciagi/:id" element={<SheetView />} />
            <Route path="egzamin" element={<ExamList />} />
            <Route path="egzamin/:id" element={<ExamPractical />} />
            <Route path="test" element={<TheoryTest />} />
            <Route path="szukaj" element={<Search />} />
            <Route path="postep" element={<Progress />} />
            <Route path="o-egzaminie" element={<About />} />
            <Route path="wiecej" element={<More />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ProgressProvider>
  </StrictMode>,
)

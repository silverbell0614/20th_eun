import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './sections/Header'
import Footer from './sections/Footer'
import DecorativeStrip from './components/DecorativeStrip'
import Home from './pages/Home'
import Preparing from './pages/Preparing'
import History from './pages/History'
import HistoryDetail from './pages/HistoryDetail'
import Seats from './pages/Seats'
import BookingComplete from './pages/BookingComplete'
import CastingBoard from './pages/CastingBoard'
import DearEun from './pages/DearEun'

const IS_PREV = import.meta.env.MODE === 'prev'

function BackgroundBlob({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed -z-10 rotate-[-16deg] ${className}`}
      style={{
        backgroundColor: '#fddece',
        opacity: 0.07,
        filter: 'blur(100px)',
        borderRadius: '9999px',
      }}
    />
  )
}

function AppLayout() {
  const location = useLocation()
  const isHome =
    location.pathname === '/' ||
    location.pathname === '/seats' ||
    location.pathname === '/booking-complete' ||
    location.pathname === '/casting-board'

  const isMainPage = location.pathname === '/'

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/history') return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  if (IS_PREV) {
    return (
      <Routes>
        <Route path="/" element={<Preparing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <>
      <BackgroundBlob className="top-[-50px] left-1/2 h-[125px] w-[250px] translate-x-10 sm:h-[187px] sm:w-[375px] sm:translate-x-24 lg:h-[250px] lg:w-[500px] lg:translate-x-40" />
      <BackgroundBlob className="top-1/2 left-[-80px] h-[188px] w-[375px] -translate-y-1/2 sm:h-[281px] sm:w-[563px] lg:h-[375px] lg:w-[750px]" />
      <Header fixed={!isHome} />
      <DecorativeStrip showText={isHome} />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home />
            </main>
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/history/:entryId" element={<HistoryDetail />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/booking-complete" element={<BookingComplete />} />
        <Route path="/casting-board" element={<CastingBoard />} />
        <Route path="/dear-eun" element={<DearEun />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer inline={isMainPage} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App

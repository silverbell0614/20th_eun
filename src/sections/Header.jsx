import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '../components/Container'
import headerLogoImg from '../assets/image/header-logo.webp'

const MENU_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/casting-board', label: 'CASTING BOARD' },
  { to: '/history', label: 'HE:STORY' },
  { to: '/dear-eun', label: 'DEAR. EUN' },
]

function FullMenu({ onClose, onHistoryClick }) {
  return (
    <div className="bg-bg fixed inset-0 z-50 flex flex-col items-center justify-center gap-10">
      <nav className="flex flex-col items-center gap-8">
        {MENU_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={(event) => {
              if (item.to === '/history') onHistoryClick(event)
              onClose()
            }}
            className="text-ink text-xl tracking-widest hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function MenuToggleButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? '전체메뉴 닫기' : '전체메뉴 열기'}
      className="absolute top-1/2 right-4 z-[60] flex h-4 w-5 -translate-y-1/2 flex-col items-end justify-center gap-[5px] sm:right-8"
    >
      {isOpen ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M1 1L15 15M15 1L1 15"
            stroke="currentColor"
            className="text-ink"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <>
          <span className="bg-ink h-[1.5px] w-5" />
          <span className="bg-ink h-[1.5px] w-4" />
          <span className="bg-ink h-[1.5px] w-5" />
        </>
      )}
    </button>
  )
}

function Header({ fixed = false }) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleHistoryClick = (event) => {
    if (location.pathname === '/history') {
      event.preventDefault()
      window.dispatchEvent(new Event('history-scroll-top'))
    }
  }

  return (
    <header className={fixed ? 'fixed inset-x-0 top-0 z-30' : 'border-divider relative border-b'}>
      <Container size="narrow" className="grid grid-cols-3 items-center py-4 sm:py-6">
        <nav className="hidden text-xs tracking-wide sm:block sm:text-sm">
          <Link
            to="/history"
            className="text-ink-muted hover:text-ink font-['Prata']"
            onClick={handleHistoryClick}
          >
            HE:STORY
          </Link>
        </nav>

        <Link to="/" className="col-start-2 justify-self-center">
          <img
            src={headerLogoImg}
            alt="20주년 파노라마"
            className="h-8 w-8 sm:h-[100px] sm:w-[100px]"
          />
        </Link>

        <nav className="hidden justify-self-end text-xs tracking-wide sm:block sm:text-sm">
          <Link to="/dear-eun" className="text-ink-muted hover:text-ink font-['Prata']">
            DEAR. EUN
          </Link>
        </nav>
      </Container>

      <MenuToggleButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} />

      {isMenuOpen && (
        <FullMenu onClose={() => setIsMenuOpen(false)} onHistoryClick={handleHistoryClick} />
      )}
    </header>
  )
}

export default Header

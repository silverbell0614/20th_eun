import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import AccentDot from '../components/AccentDot'
import chipUrl from '../assets/image/silverbell_chip.webp'
import twentiethWatermarkImg from '../assets/image/twentieth-watermark-trimmed.webp'
import panoramaWatermarkImg from '../assets/image/panorama-watermark-trimmed.webp'
import group106Img from '../assets/image/group-106.webp'
import decoLeafletTicketImg from '../assets/image/deco-leaflet-ticket.webp'
import decoPhotoOvalImg from '../assets/image/deco-photo-oval.webp'
import decoFlowerBadgeImg from '../assets/image/deco-flower-badge.webp'
import decoFolderPhotoImg from '../assets/image/deco-folder-photo.webp'
import decoReceiptImg from '../assets/image/deco-receipt.webp'
import castingMainImg from '../assets/image/casting-main.webp'
import parkEunTaeImg from '../assets/cast/park-eun-tae.webp'
import posterImg from '../assets/image/poster.webp'

const LEFT_INFO_ITEMS = [
  { label: '공연기간', value: '2026.10.28' },
  { label: '장소', value: '은빛소리' },
  { label: '관람료', value: '180,000원' },
]

const RIGHT_INFO_ITEMS = [
  { label: '등급', value: '전연령' },
  { label: '러닝타임', value: '영원히 ♥' },
  { label: '할인', value: '은빛소리 할인 100%' },
]

function TicketInfoCard() {
  return (
    <div className="border-line flex h-[530px] w-full max-w-[470px] flex-col justify-self-center border-x min-[1400px]:w-[470px] min-[1400px]:justify-self-end">
      <div className="border-line flex items-start justify-between border-b px-2 pt-6">
        <p className="text-ink font-display text-[55px] font-light tracking-[-0.03em]">
          2026. 10. 28.
        </p>
      </div>

      <div className="border-line relative border-b px-2 pt-[26px] pb-1">
        <span
          aria-hidden="true"
          className="absolute top-[7px] right-[7px] h-[15px] w-[15px] rounded-full border border-[#FDDECE] bg-[#CEEBFD]"
        />
        <h2 className="text-ink text-base font-medium">박은태 배우님 20주년 기념 홈페이지</h2>
        <p className="text-ink text-base font-medium">스무해의 파노라마</p>
      </div>

      <div className="border-line grid grid-cols-2 border-b text-sm">
        <div className="border-line flex flex-col gap-5 border-r px-2 py-4">
          {LEFT_INFO_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="text-ink font-semibold">{item.label}</p>
              <p className="text-ink mt-0">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 px-2 py-4">
          {RIGHT_INFO_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="text-ink font-semibold">{item.label}</p>
              <p className="text-ink mt-0">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-line flex items-baseline justify-between border-b px-2 py-6 text-sm">
        <p className="text-ink font-semibold">문의</p>
        <p className="text-ink-muted">네이버 카페 은빛소리 문의 게시판</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-2 py-6">
        <p className="text-ink-muted w-full text-right text-xs leading-relaxed">
          ※ 해당페이지는 이벤트를 위한 팬 페이지이며
          <br />
          실제 진행되는 공연이 아님을 밝힙니다.
        </p>
      </div>
    </div>
  )
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const CALENDAR_MONTH = new Date(2026, 9, 1)
const PINNED_DAY = 28

function buildMonthGrid(viewDate) {
  const firstWeekday = viewDate.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()

  const cells = Array.from({ length: firstWeekday }, () => null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  return cells
}

function TicketCalendar() {
  const cells = buildMonthGrid(CALENDAR_MONTH)

  return (
    <div className="bg-surface flex w-full flex-1 flex-col px-4 py-10">
      <div className="mb-8 flex items-center justify-center">
        <span className="text-ink text-[20px] font-semibold">
          {CALENDAR_MONTH.getMonth() + 1}월
        </span>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((day) => (
          <span key={day} className="text-ink-muted text-xs font-medium">
            {day}
          </span>
        ))}
      </div>

      <div className="grid flex-1 auto-rows-fr grid-cols-7 gap-y-1 text-center">
        {cells.map((day, index) => {
          const isPinned = day === PINNED_DAY
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              {day && (
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                    isPinned ? 'bg-highlight text-white' : 'text-ink'
                  }`}
                >
                  {day}
                </span>
              )}
              {isPinned && <span className="text-highlight text-[10px]">선택</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { key: 'casting', label: '캐스팅' },
  { key: 'info', label: '공연정보' },
  { key: 'sale', label: '공연후기' },
]

function TicketSection({ activeTab, onTabChange, onOpenCalendar, playIntro }) {
  const introClass = playIntro ? 'animate-[fade-in_0.6s_ease-out_forwards]' : ''

  return (
    <section id="top" className="border-divider border-b">
      <div className="relative grid px-6 min-[1400px]:grid-cols-[1.9fr_auto_0.9fr] min-[1400px]:px-16 min-[1400px]:pr-[270px]">
        <div className="-mx-6 h-[530px] overflow-hidden min-[1400px]:overflow-visible">
          <div
            aria-hidden="true"
            className="relative h-[530px] origin-top scale-[0.62] min-[640px]:scale-[0.9]  min-[1600px]:scale-90 min-[1800px]:scale-100"
          >
            <img
              src={twentiethWatermarkImg}
              alt=""
              style={{ animationDelay: '0ms' }}
              className={`pointer-events-none absolute top-[-28px] right-0 w-96 opacity-0 min-[640px]:top-[-30px] min-[1800px]:right-[20px] ${introClass}`}
            />
            <img
              src={panoramaWatermarkImg}
              alt=""
              style={{ animationDelay: '0ms' }}
              className={`pointer-events-none absolute bottom-[-325px] left-0 w-[460px] opacity-0 min-[640px]:bottom-[-61px] min-[640px]:w-[680px] min-[1400px]:bottom-[-103px] min-[1800px]:bottom-[-41px] ${introClass}`}
            />
            <div className="pointer-events-none absolute top-[90%] left-1/2 w-[406px] translate-x-[-56px] -translate-y-1/2 min-[640px]:top-[60%] min-[1400px]:top-1/2 min-[1400px]:right-[100px] min-[1400px]:left-auto min-[1400px]:translate-x-0">
              <img
                src={group106Img}
                alt=""
                style={{ animationDelay: '150ms' }}
                className={`relative z-0 w-[406px] opacity-0 ${introClass}`}
              />

              <img
                src={decoLeafletTicketImg}
                alt=""
                style={{ animationDelay: '300ms' }}
                className={`absolute top-[-95px] left-[-270px] z-10 w-[377px] opacity-0 ${introClass}`}
              />
              <img
                src={decoReceiptImg}
                alt=""
                style={{ animationDelay: '450ms' }}
                className={`absolute top-[139px] left-[118px] z-10 w-[200px] opacity-0 ${introClass}`}
              />
              <img
                src={decoPhotoOvalImg}
                alt=""
                style={{ animationDelay: '600ms' }}
                className={`absolute top-[176px] left-[-31px] z-20 w-[244px] opacity-0 ${introClass}`}
              />
              <img
                src={decoFolderPhotoImg}
                alt=""
                style={{ animationDelay: '750ms' }}
                className={`absolute top-[195px] left-[-295px] z-10 w-[317px] opacity-0 ${introClass}`}
              />
              <img
                src={decoFlowerBadgeImg}
                alt=""
                style={{ animationDelay: '900ms' }}
                className={`absolute top-[297px] left-[7px] z-20 w-[173px] opacity-0 ${introClass}`}
              />
            </div>
          </div>
        </div>

        <div className="border-divider pointer-events-none absolute top-[530px] left-1/2 w-screen -translate-x-1/2 border-t-2 min-[1400px]:hidden" />

        <TicketInfoCard />

        <div className="hidden h-full w-full flex-col min-[1400px]:flex">
          <TicketCalendar />
          <Link
            to="/seats"
            className="bg-accent-soft text-ink block w-full px-6 py-3 text-center text-sm font-medium transition-colors"
          >
            예매하기
          </Link>
        </div>

        <div aria-hidden="true" className="hidden min-[1400px]:block" />

        <div className="min-[1400px]:col-span-2">
          <TabsNav activeKey={activeTab} onChange={onTabChange} className="max-[1399px]:border-r" />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 min-[1400px]:hidden">
        <button
          type="button"
          onClick={onOpenCalendar}
          className="text-ink block w-full animate-[bg-blink_1.5s_ease-in-out_infinite] px-6 py-4 text-center text-sm font-medium"
        >
          예매하기
        </button>
      </div>
    </section>
  )
}

function CalendarBottomSheet({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 min-[1400px]:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        className={`bg-bg absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-center pt-3">
          <span className="bg-line h-1 w-10 rounded-full" />
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <TicketCalendar />
        </div>

        <div className="px-6 pb-8">
          <Link
            to="/seats"
            onClick={onClose}
            className="bg-accent-soft text-ink block w-full px-6 py-3 text-center text-sm font-medium"
          >
            예매하기
          </Link>
        </div>
      </div>
    </div>
  )
}

function TabsNav({ activeKey, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`divide-line border-line bg-surface grid h-[38px] grid-cols-3 divide-x border-t border-l ${className}`}
    >
      {TABS.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.key)}
            className={`flex items-center justify-center text-sm font-medium transition-colors ${
              isActive ? 'bg-accent-soft text-ink' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

const SALE_INFO_ITEMS = [
  { label: '판매처', value: '네이버 카페 은빛소리' },
  { label: '예매 방법', value: '홈페이지 내 예매하기 버튼을 통해 좌석을 선택 후 예매' },
  { label: '취소/환불 규정', value: '불가' },
  { label: '문의처', value: '네이버 카페 은빛소리 문의 게시판' },
]

function CastingPanel({ imageRef, saleRef }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex min-h-[22rem] w-full items-center justify-center overflow-hidden">
        <p
          aria-hidden="true"
          className="text-accent pointer-events-none absolute inset-x-0 text-center text-[100px] select-none sm:text-[180px] lg:text-[264px]"
          style={{ fontFamily: "'League Script', cursive" }}
        >
          Casting
        </p>
        <AccentDot className="absolute top-[38%] left-[58%] hidden sm:block" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="bg-surface-muted h-28 w-28 overflow-hidden rounded-full">
            <img src={parkEunTaeImg} alt="박은태" className="h-full w-full object-cover" />
          </div>
          <p className="text-ink text-sm font-medium">박은태</p>
        </div>
      </div>

      <div className="border-divider relative left-1/2 w-screen -translate-x-1/2 border-t" />

      <img ref={imageRef} src={castingMainImg} alt="" className="mt-10 w-full max-w-[840px]" />

      <div
        ref={saleRef}
        className="border-divider relative left-1/2 mt-10 w-screen -translate-x-1/2 border-t"
      />

      <div className="w-full max-w-[840px] py-10">
        {SALE_INFO_ITEMS.map((item) => (
          <div key={item.label} className="border-divider flex gap-6 border-b py-4 text-sm">
            <span className="text-ink-muted w-28 shrink-0">{item.label}</span>
            <span className="text-ink">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PerformanceInfoPanel() {
  return <p className="text-ink-muted py-16 text-center text-sm">공연정보 내용을 준비 중입니다.</p>
}

function SaleInfoPanel() {
  return <p className="text-ink-muted py-16 text-center text-sm">판매정보 내용을 준비 중입니다.</p>
}

const PANELS = {
  casting: CastingPanel,
  info: PerformanceInfoPanel,
  sale: SaleInfoPanel,
}

function CastingSection({ activeTab, sectionRef, castingImageRef, castingSaleRef }) {
  const ActivePanel = PANELS[activeTab]

  return (
    <section ref={sectionRef} className="border-divider border-b pb-32 lg:pb-24">
      <Container>
        <ActivePanel imageRef={castingImageRef} saleRef={castingSaleRef} />
      </Container>
    </section>
  )
}

const NOTICE_SESSION_KEY = 'eun20th-notice-seen'

function NoticeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
      <div className="border-line w-full max-w-sm border bg-white p-6 text-center">
        <img src={chipUrl} alt="" className="mx-auto h-12 w-12" />

        <p className="text-ink mt-4 text-sm leading-relaxed">
           본 홈페이지는 박은태 배우님 20주년을 기념하기 위해
          <br />
          <b>네이버 카페 은빛소리</b>에서 제작한
          <br />
          팬 이벤트 페이지입니다.
        </p>

        <p className="text-ink mt-4 text-sm leading-relaxed">
          실제 공연 예매처가 아니며,
          <br />
          실제로 진행되는 공연이 아님을 안내드립니다.
        </p>

        <p className="text-ink mt-4 text-sm leading-relaxed">
          모든 문의는 네이버 카페 은빛소리로 부탁드립니다.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="bg-ink mt-6 w-full px-6 py-3 text-sm font-medium text-white"
        >
          확인
        </button>
      </div>
    </div>
  )
}

function StickyBookingBar({ isVisible, activeTab, onTabChange }) {
  return (
    <div
      className={`bg-surface border-divider fixed inset-x-0 top-0 z-40 hidden border-b transition-transform duration-300 min-[1400px]:block ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Container className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="bg-surface-muted h-12 w-9 shrink-0 overflow-hidden">
            <img src={posterImg} alt="포스터" className="h-full w-full object-cover" />
          </div>

          <div>
            <p className="text-ink text-sm font-bold">스무해의 파노라마</p>
            <p className="text-ink text-sm font-medium">2026.10.28 (수) 19:30</p>
          </div>
        </div>

        <Link
          to="/seats"
          className="bg-accent-soft text-ink px-6 py-2 text-sm font-medium transition-colors"
        >
          예매하기
        </Link>
      </Container>

      <Container>
        <TabsNav activeKey={activeTab} onChange={onTabChange} className="border-r" />
      </Container>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const activeTab = 'casting'
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [introReady, setIntroReady] = useState(() => !!sessionStorage.getItem(NOTICE_SESSION_KEY))
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isCastingAtTop, setIsCastingAtTop] = useState(false)
  const [hasReachedImage, setHasReachedImage] = useState(false)
  const castingSectionRef = useRef(null)
  const castingImageRef = useRef(null)
  const castingSaleRef = useRef(null)

  useEffect(() => {
    const shouldLockScroll = isNoticeOpen || isCalendarOpen
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''
    document.body.style.touchAction = shouldLockScroll ? 'none' : ''
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isNoticeOpen, isCalendarOpen])

  useEffect(() => {
    if (!sessionStorage.getItem(NOTICE_SESSION_KEY)) {
      setIsNoticeOpen(true)
    }
  }, [])

  useEffect(() => {
    function handleFirstScroll() {
      if (window.scrollY > 0) setHasScrolled(true)
    }

    window.addEventListener('scroll', handleFirstScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleFirstScroll)
  }, [])

  useEffect(() => {
    function handleScroll() {
      const section = castingSectionRef.current
      const image = castingImageRef.current
      if (!section) return
      setIsCastingAtTop(window.scrollY >= section.offsetTop)
      setHasReachedImage(!!image && window.scrollY >= image.offsetTop)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCloseNotice = () => {
    sessionStorage.setItem(NOTICE_SESSION_KEY, '1')
    setIsNoticeOpen(false)
    setIntroReady(true)
  }

  const handleTabChange = (tabKey) => {
    if (tabKey === 'sale') {
      navigate('/dear-eun')
      return
    }

    const section = castingSectionRef.current
    if (!section) return
    const offset = tabKey === 'info' ? 280 : -50
    window.scrollTo({ top: section.offsetTop + offset, behavior: 'smooth' })
  }

  return (
    <>
      <StickyBookingBar
        isVisible={isCastingAtTop}
        activeTab={hasReachedImage ? 'info' : 'casting'}
        onTabChange={handleTabChange}
      />

      <TicketSection
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        playIntro={introReady}
      />
      <CastingSection
        activeTab={activeTab}
        sectionRef={castingSectionRef}
        castingImageRef={castingImageRef}
        castingSaleRef={castingSaleRef}
      />
      <CalendarBottomSheet isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      {introReady && !hasScrolled && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center min-[1400px]:hidden">
          <div className="flex translate-y-5 animate-[text-blink_1.4s_ease-in-out_infinite] flex-col items-center gap-2 text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]">
            <svg width="22" height="34" viewBox="0 0 22 34" fill="none" aria-hidden="true">
              <rect
                x="1"
                y="1"
                width="20"
                height="32"
                rx="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs tracking-[0.15em]">아래로 스크롤</span>
          </div>
        </div>
      )}
      {isNoticeOpen && <NoticeModal onClose={handleCloseNotice} />}
    </>
  )
}

export default Home

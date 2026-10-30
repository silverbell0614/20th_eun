import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import BrowserWindow from '../components/BrowserWindow'
import LoadingSpinner from '../components/LoadingSpinner'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-8">
      <LoadingSpinner />
      <div className="text-center">
        <p className="text-ink text-base font-medium">예매 화면을 불러오고 있어요</p>
        <p className="text-ink-muted mt-1 text-base">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}

function SubmitOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <LoadingSpinner size="sm" />
    </div>
  )
}

const ROWS = [
  {
    sections: [
      { key: 'left', count: 7, available: [], hidden: [0, 1, 2, 3] },
      { key: 'center', count: 19, available: [9] },
      { key: 'right', count: 7, available: [], hidden: [3, 4, 5, 6] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [], hidden: [0, 1, 2] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [], hidden: [4, 5, 6] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [], hidden: [0, 1, 2] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [], hidden: [4, 5, 6] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [], hidden: [0, 1] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [], hidden: [5, 6] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [] },
    ],
  },
  {
    sections: [
      { key: 'left', count: 7, available: [] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [] },
    ],
  },
  ...Array.from({ length: 10 }, (_, index) => ({
    sectionGap: 6,
    marginTop: index === 0 ? 10 : 0,
    sections: [
      { key: 'left', count: 7, available: [] },
      { key: 'center', count: 19, available: [] },
      { key: 'right', count: 7, available: [] },
    ],
  })),
]

const BASE_SEAT_SIZE = 7
const BASE_INNER_GAP = 1
const BASE_SECTION_GAP = 6
const BASE_ROW_GAP = 4

function Seat({ isAvailable, isSelected, isHidden, onClick, size }) {
  const style = { height: `${size}px`, width: `${size}px` }

  if (isHidden) {
    return <div className="bg-white" style={style} />
  }

  if (!isAvailable) {
    return <div className="bg-seat-unavailable rounded-[1px]" style={style} />
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`flex items-center justify-center rounded-[1px] ${isSelected ? 'bg-seat-selected' : 'bg-seat-available'}`}
    >
      {isSelected && (
        <span className="leading-none text-white" style={{ fontSize: `${size * 0.7}px` }}>
          ✓
        </span>
      )}
    </button>
  )
}

function SeatMap({ selectedSeat, onSelectSeat, zoom }) {
  const seatSize = BASE_SEAT_SIZE * zoom
  const innerGap = BASE_INNER_GAP * zoom
  const sectionGap = BASE_SECTION_GAP * zoom
  const rowGap = BASE_ROW_GAP * zoom

  return (
    <div className="flex flex-col items-center" style={{ gap: `${rowGap}px` }}>
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{
            gap: `${row.sectionGap ? row.sectionGap * zoom : sectionGap}px`,
            marginTop: row.marginTop ? `${row.marginTop * zoom}px` : undefined,
          }}
        >
          {row.sections.map((section) => (
            <div key={section.key} className="flex" style={{ gap: `${innerGap}px` }}>
              {Array.from({ length: section.count }).map((_, seatIndex) => {
                const isAvailable = section.available.includes(seatIndex)
                const isHidden = section.hidden?.includes(seatIndex) ?? false
                const isSelected =
                  selectedSeat?.row === rowIndex &&
                  selectedSeat?.section === section.key &&
                  selectedSeat?.seat === seatIndex

                return (
                  <Seat
                    key={seatIndex}
                    isAvailable={isAvailable}
                    isHidden={isHidden}
                    isSelected={isSelected}
                    size={seatSize}
                    onClick={() =>
                      onSelectSeat(
                        isSelected
                          ? null
                          : { row: rowIndex, section: section.key, seat: seatIndex },
                      )
                    }
                  />
                )
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const TICKET_PRICE = 180000
const DISCOUNT_AMOUNT = 180000

function PricingStep({ isDiscountAgreed, onChangeDiscountAgreed }) {
  const total = TICKET_PRICE - (isDiscountAgreed ? DISCOUNT_AMOUNT : 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-ink text-lg font-bold">VVIP석</p>
          <p className="text-ink-muted mt-1 text-xs">1층 B구역 1열 10번</p>
        </div>
        <p className="text-ink text-lg font-bold">180,000원</p>
      </div>

      <label className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDiscountAgreed}
            onChange={(event) => onChangeDiscountAgreed(event.target.checked)}
            className="accent-ink h-4 w-4"
          />
          <span className="text-ink">은빛소리(본인만)_VVIP석_100%</span>
        </div>
        <span className="text-ink">-180,000원</span>
      </label>

      <div className="border-line border-t pt-6">
        <div className="flex items-center justify-between">
          <p className="text-ink text-base font-bold">총계</p>
          <p className="text-ink text-base font-bold">{total.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  )
}

const ZOOM_MIN = 1
const ZOOM_MAX = 2.5
const ZOOM_STEP = 0.25
const WHEEL_ZOOM_STEP = 0.05
const DEFAULT_ZOOM = 1.75
const DRAG_THRESHOLD = 4

function ZoomControls({ zoom, onZoomIn, onZoomOut }) {
  return (
    <div className="border-line absolute right-2 bottom-2 flex items-center gap-1 rounded-full border bg-white px-1 py-1 shadow-sm">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= ZOOM_MIN}
        aria-label="축소"
        className="text-ink flex h-6 w-6 items-center justify-center text-sm disabled:opacity-30"
      >
        −
      </button>
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= ZOOM_MAX}
        aria-label="확대"
        className="text-ink flex h-6 w-6 items-center justify-center text-sm disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}

function SeatLegend() {
  return (
    <div className="border-line flex flex-col gap-3 border p-6">
      <div className="flex items-center gap-2">
        <span className="bg-seat-available h-5 w-5 rounded-md" />
        <span className="text-ink text-sm">선택 가능</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-seat-unavailable h-5 w-5 rounded-md" />
        <span className="text-ink text-sm">선택 불가능</span>
      </div>
    </div>
  )
}

function Seats() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChoosingPrice, setIsChoosingPrice] = useState(false)
  const [isDiscountAgreed, setIsDiscountAgreed] = useState(false)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [isDragging, setIsDragging] = useState(false)
  const seatViewportRef = useRef(null)
  const dragStateRef = useRef(null)
  const suppressNextClickRef = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const el = seatViewportRef.current
    if (!el) return

    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2

    const handleWheel = (event) => {
      event.preventDefault()
      const direction = event.deltaY < 0 ? 1 : -1
      setZoom((z) =>
        Math.min(
          ZOOM_MAX,
          Math.max(ZOOM_MIN, Math.round((z + direction * WHEEL_ZOOM_STEP) * 100) / 100),
        ),
      )
    }

    const handleMouseDown = (event) => {
      dragStateRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: el.scrollLeft,
        startScrollTop: el.scrollTop,
        moved: false,
      }
      setIsDragging(true)
    }

    const handleMouseMove = (event) => {
      const drag = dragStateRef.current
      if (!drag) return

      const dx = event.clientX - drag.startX
      const dy = event.clientY - drag.startY

      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) {
        drag.moved = true
      }
      if (drag.moved) {
        el.scrollLeft = drag.startScrollLeft - dx
        el.scrollTop = drag.startScrollTop - dy
      }
    }

    const handleMouseUp = () => {
      const drag = dragStateRef.current
      if (drag?.moved) {
        suppressNextClickRef.current = true
      }
      dragStateRef.current = null
      setIsDragging(false)
    }

    const handleClickCapture = (event) => {
      if (suppressNextClickRef.current) {
        suppressNextClickRef.current = false
        event.stopPropagation()
        event.preventDefault()
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('click', handleClickCapture, true)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('click', handleClickCapture, true)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isLoading])

  useEffect(() => {
    if (!isSubmitting) return

    const timer = setTimeout(() => navigate('/booking-complete'), 500)
    return () => clearTimeout(timer)
  }, [isSubmitting, navigate])

  if (isLoading) {
    return (
      <main>
        <LoadingScreen />
      </main>
    )
  }

  return (
    <main>
      <div className="pointer-events-none flex flex-col items-center justify-center px-1 py-16 lg:fixed lg:inset-0 lg:z-0 lg:px-0 lg:py-0">
        <Container className="pointer-events-auto flex flex-col items-center px-0">
          <p className="text-ink mb-6 text-center text-sm font-medium">
            좌석을 선택하여 예매를 진행하세요
          </p>

          <BrowserWindow className="w-full max-w-3xl">
            {isChoosingPrice ? (
              <div className="mx-auto max-w-sm">
                <PricingStep
                  isDiscountAgreed={isDiscountAgreed}
                  onChangeDiscountAgreed={setIsDiscountAgreed}
                />

                <button
                  type="button"
                  disabled={!isDiscountAgreed}
                  onClick={() => setIsSubmitting(true)}
                  className="bg-accent-soft text-ink mt-6 w-full px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  결제하기
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_220px]">
                <div className="relative min-w-0">
                  <p className="text-ink-muted text-center text-[8px] tracking-widest">STAGE</p>
                  <div className="border-line mt-4 mb-6 border-t sm:mb-8" />

                  <div
                    ref={seatViewportRef}
                    className={`scrollbar-hide h-60 overflow-auto pt-2 pb-10 ${
                      isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                  >
                    <div className="mx-auto w-fit">
                      <SeatMap
                        selectedSeat={selectedSeat}
                        onSelectSeat={setSelectedSeat}
                        zoom={zoom}
                      />
                    </div>
                  </div>

                  <ZoomControls
                    zoom={zoom}
                    onZoomIn={() =>
                      setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100))
                    }
                    onZoomOut={() =>
                      setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100))
                    }
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <SeatLegend />

                  <button
                    type="button"
                    disabled={!selectedSeat}
                    onClick={() => setIsChoosingPrice(true)}
                    className="bg-accent-soft text-ink w-full px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    예매하기
                  </button>
                </div>
              </div>
            )}
          </BrowserWindow>
        </Container>
      </div>

      {isSubmitting && <SubmitOverlay />}
    </main>
  )
}

export default Seats

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import chipUrl from '../assets/image/silverbell_chip.webp'
import TicketGraphic from '../components/TicketGraphic'
import RefreshIcon from '../components/RefreshIcon'
import LoadingSpinner from '../components/LoadingSpinner'
import wallMessages from '../data/wallMessages.json'

const AUTO_SCROLL_SPEED = 0.4

const TICKET_COLOR_OPTIONS = [
  { id: 'blue', color: '#dcf0fc', ink: '#93acba' },
  { id: 'alabaster', color: '#eeefe8', ink: '#a89f8c' },
  { id: 'pink', color: '#ebd8dc', ink: '#a3b18a' },
  { id: 'lilacgrey', color: '#d3c2cd', ink: '#9aa87c' },
  { id: 'nightforest', color: '#2b2b23', ink: '#d9c9a3' },
]

function getTicketColorOption(id) {
  return TICKET_COLOR_OPTIONS.find((option) => option.id === id) ?? TICKET_COLOR_OPTIONS[0]
}

const PAGE_SIZE = 8
const PAGINATION_WINDOW = 5

function getWall(page, size) {
  const start = (page - 1) * size
  return {
    total: wallMessages.length,
    list: wallMessages.slice(start, start + size),
  }
}

function formatReservedAt(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type) => parts.find((part) => part.type === type)?.value
  return `${get('year')}년 ${get('month')}월 ${get('day')}일 ${get('hour')}시 ${get('minute')}분`
}

function mapWallItem(item) {
  return {
    id: item.id,
    colorId: item.ticket_color_id,
    message: item.message,
    cafeNickname: item.cafe_nickname,
    reservedAt: formatReservedAt(item.created_at),
  }
}

function getJitter(seed, xSign) {
  const offsetY = ((seed * 37) % 60) - 20
  const rotate = (((seed * 53) % 120) - 60) / 10
  const offsetX = xSign * (10 + ((seed * 29) % 18))
  return { offsetY, offsetX, rotate }
}

function buildGridTickets(tickets) {
  return tickets.map((ticket, i) => ({
    ...ticket,
    ...getJitter(i, i % 2 === 0 ? -1 : 1),
  }))
}

function buildMobileTickets(tickets) {
  return tickets.map((ticket, i) => {
    const { offsetX, rotate } = getJitter(i, i % 2 === 0 ? -1 : 1)
    return { ...ticket, offsetX, rotate }
  })
}

function Hero({ onRefresh, isRefreshing }) {
  return (
    <div className="flex flex-col items-center px-6 pt-20 pb-4 text-center sm:pt-44 sm:pb-8">
      <div className="bg-ink flex h-3 w-3 items-center justify-center text-[7px] text-white sm:h-4 sm:w-4 sm:text-[9px]">
        ✦
      </div>
      <div className="mt-2 flex items-center gap-2 sm:mt-4">
        <p className="text-ink font-['Prata'] text-lg tracking-[0.12em] sm:text-2xl sm:tracking-[0.2em]">
          DEAR. EUN
        </p>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="새로고침"
          className="text-ink-muted hover:text-ink disabled:cursor-wait"
        >
          <RefreshIcon spinning={isRefreshing} />
        </button>
      </div>
    </div>
  )
}

function Ticket({
  offsetX = 0,
  offsetY = 0,
  rotate = 0,
  colorId,
  message,
  cafeNickname,
  reservedAt,
}) {
  const ticketOption = getTicketColorOption(colorId)

  return (
    <div
      data-ticket-item
      className="@container relative"
      style={{ transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)` }}
    >
      <TicketGraphic className="w-full" color={ticketOption.color} accentColor={ticketOption.ink} />

      <div
        className="text-ink absolute inset-0 flex flex-col justify-between p-[5.6cqw]"
        style={{ color: ticketOption.ink }}
      >
        <div
          className="scrollbar-hide mt-[15.3cqw] h-[calc(16cqw+12px)] overflow-y-auto border-l pr-[5.6cqw] pl-[2.1cqw]"
          style={{ borderColor: ticketOption.ink }}
        >
          <p className="text-[3.6cqw] leading-tight whitespace-pre-wrap sm:text-[2.4cqw]">{message}</p>
        </div>

        <div className="text-[2.4cqw] leading-snug">
          <p>예약번호 : T20261028</p>
          <p>예매자명 : {cafeNickname || '은빛소리'}</p>
          <p>예매시간 : {reservedAt ?? '2026년 O월 O일 O시 O분'}</p>
        </div>
      </div>

      <img
        src={chipUrl}
        alt=""
        aria-hidden="true"
        className="absolute right-[13%] bottom-[5%] aspect-square w-[12%]"
      />
    </div>
  )
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const start = Math.floor((page - 1) / PAGINATION_WINDOW) * PAGINATION_WINDOW + 1
  const end = Math.min(totalPages, start + PAGINATION_WINDOW - 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <nav aria-label="페이지 이동" className="mt-14 flex items-center justify-center gap-1 pb-2 text-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - PAGINATION_WINDOW))}
        disabled={page === 1}
        aria-label={`${PAGINATION_WINDOW}페이지 이전`}
        className="text-ink-muted h-8 w-8 disabled:opacity-30"
      >
        «
      </button>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
        className="text-ink-muted h-8 w-8 disabled:opacity-30"
      >
        ‹
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onChange(pageNumber)}
          aria-current={pageNumber === page ? 'page' : undefined}
          className={`h-8 min-w-8 rounded-full px-2 ${
            pageNumber === page ? 'bg-ink text-white' : 'text-ink'
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="다음 페이지"
        className="text-ink-muted h-8 w-8 disabled:opacity-30"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + PAGINATION_WINDOW))}
        disabled={page === totalPages}
        aria-label={`${PAGINATION_WINDOW}페이지 다음`}
        className="text-ink-muted h-8 w-8 disabled:opacity-30"
      >
        »
      </button>
    </nav>
  )
}

function TicketGrid({ paused = false, tickets, page, totalPages, onPageChange, resetSignal }) {
  const scrollRef = useRef(null)
  const isHoveringTicketRef = useRef(false)
  const isPausedRef = useRef(paused)
  const desiredScrollTopRef = useRef(0)

  useEffect(() => {
    isPausedRef.current = paused
    const el = scrollRef.current
    if (!el) return
    el.style.overflowY = paused ? 'hidden' : ''
    el.style.touchAction = paused ? 'none' : ''
  }, [paused])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    desiredScrollTopRef.current = 0
  }, [resetSignal])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let rafId

    function handleScroll() {
      desiredScrollTopRef.current = el.scrollTop
    }

    function tick() {
      if (!isHoveringTicketRef.current && !isPausedRef.current) {
        const maxScrollTop = el.scrollHeight - el.clientHeight

        if (desiredScrollTopRef.current < maxScrollTop) {
          desiredScrollTopRef.current = Math.min(
            maxScrollTop,
            desiredScrollTopRef.current + AUTO_SCROLL_SPEED,
          )
          el.scrollTop = desiredScrollTopRef.current
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    function handlePointerOver(event) {
      if (event.target.closest('[data-ticket-item]')) {
        isHoveringTicketRef.current = true
      }
    }

    function handlePointerOut(event) {
      if (event.target.closest('[data-ticket-item]')) {
        isHoveringTicketRef.current = false
      }
    }

    const startTimer = setTimeout(() => {
      rafId = requestAnimationFrame(tick)
    }, 500)

    el.addEventListener('scroll', handleScroll)
    el.addEventListener('mouseover', handlePointerOver)
    el.addEventListener('mouseout', handlePointerOut)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(rafId)
      el.removeEventListener('scroll', handleScroll)
      el.removeEventListener('mouseover', handlePointerOver)
      el.removeEventListener('mouseout', handlePointerOut)
    }
  }, [])

  const mobileTickets = buildMobileTickets(tickets)
  const gridTickets = buildGridTickets(tickets)

  return (
    <div className="relative min-h-0 flex-1">
      <div className="from-bg pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b to-transparent" />

      <div
        ref={scrollRef}
        className="scrollbar-hide h-full overflow-x-hidden overflow-y-auto px-8 py-10 sm:px-12 lg:px-16"
      >
        <div className="mx-auto flex max-w-md flex-col gap-6 sm:hidden">
          {mobileTickets.map((ticket) => (
            <Ticket key={ticket.id} {...ticket} />
          ))}
        </div>

        <div className="mx-auto hidden max-w-6xl grid-cols-2 gap-x-4 gap-y-8 sm:grid">
          {gridTickets.map((ticket) => (
            <Ticket key={ticket.id} {...ticket} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
      </div>

      <div className="from-bg pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t to-transparent" />
    </div>
  )
}

const CLOSED_NOTICE_LINES = [
  '메시지 등록 기간이 마무리되었습니다.',
  '소중한 마음을 남겨주신 모든 분들께 감사드립니다.',
]

function MessageModal({ onClose }) {
  const ticketOption = TICKET_COLOR_OPTIONS[0]

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
      <div className="border-line relative max-h-[90vh] w-full max-w-2xl overflow-hidden border bg-white">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="text-ink-muted absolute top-4 right-4 z-10 p-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
          <div className="text-ink-muted px-2 text-left text-xs leading-relaxed sm:px-8 sm:text-sm">
            <p className="text-ink mb-1 font-semibold">※확인사항</p>
            {CLOSED_NOTICE_LINES.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="@container relative mt-6">
            <TicketGraphic
              className="w-full"
              color={ticketOption.color}
              accentColor={ticketOption.ink}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-[5.6cqw]">
              <div className="relative">
                <textarea
                  disabled
                  placeholder="메시지를 남겨주세요"
                  style={{
                    color: ticketOption.ink,
                    borderColor: ticketOption.ink,
                    '--placeholder-color': ticketOption.ink,
                  }}
                  className="scrollbar-hide relative mt-[15.3cqw] hidden h-[calc(16cqw+12px)] w-full resize-none border-l bg-transparent pr-[5.6cqw] pl-[2.1cqw] text-[2.4cqw] outline-none placeholder:text-[color:var(--placeholder-color)] placeholder:opacity-60 sm:block"
                />
                <p
                  style={{ color: ticketOption.ink }}
                  className="scrollbar-hide relative mt-[15.3cqw] h-[calc(16cqw+12px)] w-full overflow-y-auto border-l pr-[5.6cqw] pl-[2.1cqw] text-[3.6cqw] leading-tight whitespace-pre-wrap sm:hidden"
                />
              </div>

              <div
                style={{ color: ticketOption.ink }}
                className="flex items-end justify-between text-[2.4cqw] leading-snug"
              >
                <div>
                  <p>예약번호 : T20261028</p>
                  <p>예매자명 : 은빛소리</p>
                  <p>예매시간 : 2026년 O월 O일 O시 O분</p>
                </div>
              </div>
            </div>

            <img
              src={chipUrl}
              alt=""
              aria-hidden="true"
              className="absolute right-[13%] bottom-[5%] aspect-square w-[12%]"
            />
          </div>

          <div className="mt-4 flex gap-3">
            {TICKET_COLOR_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled
                aria-label={`티켓 색상 ${option.id}`}
                className={`h-6 w-6 rounded-full border ${
                  option.id === ticketOption.id ? 'border-ink' : 'border-line'
                }`}
                style={{ backgroundColor: option.color }}
              />
            ))}
          </div>

          <div className="text-ink mt-6 flex flex-col gap-2 text-sm sm:hidden">
            <span>티켓에 들어갈 문구</span>
            <textarea
              disabled
              placeholder="메시지를 남겨주세요"
              rows={3}
              className="border-line text-ink placeholder:text-ink-muted w-full resize-none border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-ink w-20 shrink-0">닉네임</span>
              <input
                type="text"
                disabled
                placeholder="닉네임을 입력해주세요 (선택)"
                className="border-line text-ink placeholder:text-ink-muted w-full border-b px-1 py-2 text-sm outline-none placeholder:opacity-50"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-ink w-20 shrink-0">비밀번호</span>
              <input
                type="password"
                disabled
                placeholder="숫자 4자리"
                className="border-line text-ink placeholder:text-ink-muted w-full border-b px-1 py-2 text-sm outline-none placeholder:opacity-50"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              disabled
              className="border-line text-ink-muted cursor-not-allowed rounded-full border px-12 py-3 text-sm font-medium"
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function DearEun() {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [tickets, setTickets] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const isLoadingRef = useRef(false)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const loadPage = async (pageToLoad, minDelayMs = 0) => {
    if (isLoadingRef.current) return
    isLoadingRef.current = true
    setIsLoading(true)

    try {
      const [res] = await Promise.all([
        getWall(pageToLoad, PAGE_SIZE),
        new Promise((resolve) => setTimeout(resolve, minDelayMs)),
      ])

      setTotal(res.total)
      setPage(pageToLoad)
      setTickets(res.list.map(mapWallItem))
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  const handleRefresh = () => {
    if (isLoadingRef.current) return
    setRefreshKey((key) => key + 1)
    loadPage(1, 500)
  }

  const handlePageChange = (nextPage) => {
    if (isLoadingRef.current || nextPage < 1 || nextPage > totalPages || nextPage === page) return
    setRefreshKey((key) => key + 1)
    loadPage(nextPage)
  }

  return (
    <main className="bg-bg fixed inset-0 z-0 flex flex-col">
      <Hero onRefresh={handleRefresh} isRefreshing={isLoading} />
      <TicketGrid
        paused={isMessageModalOpen}
        tickets={tickets}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        resetSignal={refreshKey}
      />

      <div className="flex justify-center pt-4 pb-24 sm:pb-20">
        <button
          type="button"
          onClick={() => setIsMessageModalOpen(true)}
          className="border-line text-ink rounded-full border px-10 py-3 text-sm"
        >
          메시지 남기기
        </button>
      </div>

      {isMessageModalOpen && <MessageModal onClose={() => setIsMessageModalOpen(false)} />}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </main>
  )
}

export default DearEun

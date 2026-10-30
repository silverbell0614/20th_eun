import { useEffect, useRef, useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import Snap from 'lenis/snap'
import 'lenis/dist/lenis.css'
import PrimaryLink from '../components/PrimaryLink'
import { YEARS, HIDDEN_DETAIL_SHOW_IDS } from '../data/historyEntries'
import { SHOW_IMAGES } from '../data/historyImages'

const SHOW_IMAGE_POSITIONS = {
  'kinky-boots-2020': 'object-center',
  'kinky-boots-2024': 'object-bottom',
  'hamlet-world-version-2008': 'object-top',
  'hamlet-2011': 'object-top',
  'jekyll-and-hyde-2018': 'object-top',
  'jesus-christ-superstar-2015': 'object-top',
  'frankenstein-2024': 'object-top',
  'mozart-2014': 'object-top',
  'elisabeth-2013': 'object-top',
  'jesus-christ-superstar-2013': 'object-top',
  'crown-prince-rudolf-2012': 'object-top',
  'mozart-2012': 'object-top',
  'mozart-2010': 'object-center',
  'mozart-2011': 'object-center',
  'kiss-of-the-spider-woman-2011': 'object-top',
}

function RangeLabel({ onScrollTop }) {
  return (
    <div className="text-dark-ink-muted pointer-events-none fixed inset-x-0 top-20 z-10 flex flex-col items-center gap-2 text-xs tracking-widest sm:top-40 [@media(max-height:900px)]:hidden">
      <button
        type="button"
        onClick={onScrollTop}
        aria-label="맨 위로 이동"
        className="pointer-events-auto"
      >
        ✦
      </button>
      <span>2026 - 2006</span>
    </div>
  )
}

function FrameCornerMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-[220px] z-10 hidden h-[130px] w-[130px] min-[1400px]:block"
      style={{ left: 'calc(50% + 485px)' }}
    >
      <span className="absolute top-0 left-0 h-0.5 w-full bg-white" />
      <span className="absolute top-0 right-0 h-full w-0.5 bg-white" />

      <div className="absolute top-full right-0 flex flex-col items-center gap-1.5 pt-2">
        <span className="h-0.5 w-0.5 bg-white" />
        <span className="h-0.5 w-0.5 bg-white" />
        <span className="h-0.5 w-0.5 bg-white" />
      </div>

      <span className="text-dark-ink-muted absolute top-full right-0 translate-x-1/2 translate-y-[160px] text-xl">
        ✦
      </span>
    </div>
  )
}

function YearCornerMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-[726px] z-10 hidden h-[130px] w-[130px] min-[1400px]:block"
      style={{ left: 'calc(50% - 719px)' }}
    >
      <span className="text-dark-ink-muted absolute top-0 left-0 text-xl">✦</span>

      <div className="absolute bottom-8 left-0 flex flex-col items-center gap-1.5">
        <span className="h-0.5 w-0.5 bg-white" />
      </div>

      <span className="absolute bottom-0 left-0 h-8 w-0.5 bg-white" />
      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white" />
    </div>
  )
}

function SideDecoration({
  years,
  activeYear,
  onSelectYear,
  activeItem,
  onSelectItem,
  side = 'right',
}) {
  const isLeft = side === 'left'

  return (
    <div
      className={`fixed top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 lg:flex ${
        isLeft ? 'left-10 items-start' : 'right-10 items-end'
      }`}
    >
      {years.map((year) => (
        <div
          key={year.yearBottom}
          className={`group/year flex flex-col gap-2 ${isLeft ? 'items-start' : 'items-end'}`}
        >
          <button
            type="button"
            onClick={() => onSelectYear(year.yearBottom)}
            className="relative flex items-center py-1"
          >
            <span
              className={`text-dark-ink pointer-events-none absolute text-xs tracking-widest whitespace-nowrap opacity-0 transition-opacity group-hover/year:opacity-100 ${
                isLeft ? 'left-full ml-3' : 'right-full mr-3'
              }`}
            >
              {year.yearTop}
              {year.yearBottom}
            </span>

            <span
              className={`h-0 w-8 border-t-2 transition-colors ${
                year.yearBottom === activeYear ? 'border-white' : 'border-dark-line'
              }`}
            />
          </button>

          {year.items.length > 1 &&
            year.items.map((item) => {
              const itemKey = item.id
              return (
                <button
                  key={itemKey}
                  type="button"
                  onClick={() => onSelectItem(itemKey)}
                  className="group/item relative flex items-center py-0.5"
                >
                  <span
                    className={`text-dark-ink-muted pointer-events-none absolute text-[10px] tracking-widest whitespace-nowrap opacity-0 transition-opacity group-hover/item:opacity-100 ${
                      isLeft ? 'left-full ml-3' : 'right-full mr-3'
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    className={`h-0 w-4 border-t-2 transition-colors ${
                      itemKey === activeItem ? 'border-white' : 'border-dark-line'
                    }`}
                  />
                </button>
              )
            })}
        </div>
      ))}
    </div>
  )
}

function CornerBadge() {
  return (
    <div className="border-dark-line text-dark-ink-muted pointer-events-none fixed bottom-28 left-10 z-10 hidden rounded-full border px-4 py-1 text-xs tracking-widest min-[1400px]:block">
      PARKEUNTAE
    </div>
  )
}

function BottomBar() {
  return (
    <footer className="font-display fixed bottom-14 left-[508px] z-40 hidden py-4 text-[12px] tracking-widest text-white min-[1400px]:block">
      <span>2006 - 2026 &gt;&gt;</span>
    </footer>
  )
}

function InfoRow() {
  return (
    <div className="font-display fixed right-[508px] bottom-14 z-40 hidden gap-24 py-4 text-[12px] tracking-widest text-white min-[1400px]:flex">
      <span className="w-20 text-right">ISO 800</span>
      <span className="w-20 text-right">WB 4600K</span>
      <span className="w-20 text-right">1/60</span>
      <span className="w-20 text-right">F2.8</span>
    </div>
  )
}

function ChannelBars() {
  return (
    <div className="font-display fixed right-[508px] bottom-36 z-40 hidden flex-col gap-2 text-[12px] text-white min-[1400px]:flex">
      <div className="flex items-center gap-3">
        <span>CH1</span>
        <div className="flex h-3 items-center gap-0.5">
          {['w-1', 'w-1', 'w-1', 'w-px', 'w-px', 'w-px', 'w-px', 'w-px'].map((w, i) => (
            <span key={i} className={`h-full bg-white ${w}`} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span>CH2</span>
        <div className="flex h-3 items-center gap-0.5">
          {['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-px', 'w-px', 'w-px'].map((w, i) => (
            <span key={i} className={`h-full bg-white ${w}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

const HistoryItem = forwardRef(function HistoryItem({ item }, ref) {
  const hasDetail = !HIDDEN_DETAIL_SHOW_IDS.has(item.showId)
  const handleNavigate = () => sessionStorage.setItem(SCROLL_ITEM_KEY, item.id)
  const ImageWrapper = hasDetail ? Link : 'div'
  const imageWrapperProps = hasDetail
    ? { to: `/history/${item.showId}`, onClick: handleNavigate }
    : {}

  return (
    <div ref={ref} className="flex h-dvh w-full shrink-0 flex-col justify-center gap-4">
      <ImageWrapper className="mx-auto block w-full max-w-[570px]" {...imageWrapperProps}>
        <div className="h-6 w-full bg-black sm:h-10" />
        {SHOW_IMAGES[item.id] ? (
          <img
            src={SHOW_IMAGES[item.id]}
            alt={item.title}
            className={`aspect-[570/290] w-full object-cover ${
              SHOW_IMAGE_POSITIONS[item.id] ?? 'object-bottom'
            }`}
          />
        ) : (
          <div className="aspect-[570/290] w-full bg-neutral-200" />
        )}
        <div className="h-6 w-full bg-black sm:h-10" />
      </ImageWrapper>

      <div className="mx-auto flex w-full max-w-[570px] items-start justify-between gap-6">
        <div>
          {hasDetail ? (
            <Link
              to={`/history/${item.showId}`}
              onClick={handleNavigate}
              className="hover:text-dark-ink"
            >
              <h3 className="text-dark-ink text-lg font-semibold">{item.title}</h3>
            </Link>
          ) : (
            <h3 className="text-dark-ink text-lg font-semibold">{item.title}</h3>
          )}
          <p className="text-dark-ink-muted mt-2 text-sm leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="border-dark-line text-dark-ink-muted rounded-full border px-3 py-1 text-xs tracking-widest">
            {item.role}
          </span>
          <p className="text-dark-ink-muted mt-2 text-xs">{item.caption}</p>
        </div>
      </div>

      {hasDetail && (
        <Link
          to={`/history/${item.showId}`}
          onClick={handleNavigate}
          className="text-dark-ink-muted hover:text-dark-ink mx-auto w-full max-w-[570px] text-xs tracking-widest"
        >
          자세히 보기 &rarr;
        </Link>
      )}
    </div>
  )
})

function HistoryYear({ year, registerItem, registerSection }) {
  return (
    <section
      ref={(el) => registerSection(year.yearBottom, el)}
      className="flex w-full justify-center gap-4 px-4 sm:gap-12 sm:px-10 lg:-translate-x-14"
    >
      <div className="sticky top-0 flex h-dvh shrink-0 flex-col items-center">
        <div aria-hidden="true" className="border-dark-line mb-8 w-px flex-1 border-l-2" />

        <p className="text-dark-ink font-display text-center text-[40px] leading-[0.85] font-normal tracking-[-0.03em] sm:text-[90px]">
          <span className="block">{year.yearTop}</span>
          <span className="block">{year.yearBottom}</span>
        </p>

        <div aria-hidden="true" className="border-dark-line mt-8 w-px flex-1 border-l-2" />
      </div>

      <div className="flex w-full max-w-[570px] flex-col">
        {year.items.map((item) => (
          <HistoryItem key={item.id} item={item} ref={(el) => registerItem(item.id, el)} />
        ))}
      </div>
    </section>
  )
}

function ReviewPrompt() {
  return (
    <section className="flex h-dvh w-full shrink-0 flex-col items-center justify-center gap-8 bg-black px-6 text-center">
      <p className="text-lg leading-relaxed text-white sm:text-xl">
        즐거운 관람 되셨나요?
        <br />
        즐거우셨다면 후기를 남겨주세요.
      </p>
      <PrimaryLink to="/dear-eun">작성하기</PrimaryLink>
    </section>
  )
}

function HistoryEntries({
  registerSection,
  sectionNodesRef,
  onActiveYearChange,
  registerItem,
  itemNodesRef,
  onActiveItemChange,
}) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const snap = new Snap(lenis, { type: 'proximity' })
    itemNodesRef.current.forEach((el) => snap.addElement(el))

    return () => snap.destroy()
  }, [lenis, itemNodesRef])

  useLenis(() => {
    const viewportCenter = window.innerHeight / 2

    const findClosest = (nodesRef) => {
      let closestKey = null
      let closestDistance = Infinity
      nodesRef.current.forEach((el, key) => {
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestKey = key
        }
      })
      return closestKey
    }

    const closestSection = findClosest(sectionNodesRef)
    if (closestSection) onActiveYearChange(closestSection)

    const closestItem = findClosest(itemNodesRef)
    if (closestItem) onActiveItemChange(closestItem)
  })

  return (
    <>
      {YEARS.map((year) => (
        <HistoryYear
          key={year.yearBottom}
          year={year}
          registerItem={registerItem}
          registerSection={registerSection}
        />
      ))}
      <ReviewPrompt />
    </>
  )
}

const SCROLL_ITEM_KEY = 'eun20th-history-scroll-item'

function History() {
  const lenisRef = useRef(null)
  const sectionNodesRef = useRef(new Map())
  const itemNodesRef = useRef(new Map())
  const [activeYear, setActiveYear] = useState(YEARS[0].yearBottom)
  const [activeItem, setActiveItem] = useState(YEARS[0].items[0].id)

  useEffect(() => {
    const previousBg = document.body.style.backgroundColor
    document.body.style.backgroundColor = 'var(--color-dark-bg)'
    return () => {
      document.body.style.backgroundColor = previousBg
    }
  }, [])

  useEffect(() => {
    const handleScrollTop = () => lenisRef.current?.lenis?.scrollTo(0)
    window.addEventListener('history-scroll-top', handleScrollTop)
    return () => window.removeEventListener('history-scroll-top', handleScrollTop)
  }, [])

  useEffect(() => {
    const savedItemKey = sessionStorage.getItem(SCROLL_ITEM_KEY)
    if (!savedItemKey) return

    let rafId
    const tryRestore = () => {
      const lenis = lenisRef.current?.lenis
      const el = itemNodesRef.current.get(savedItemKey)
      if (lenis && el) {
        lenis.scrollTo(el, { immediate: true })
        sessionStorage.removeItem(SCROLL_ITEM_KEY)
      } else {
        rafId = requestAnimationFrame(tryRestore)
      }
    }
    rafId = requestAnimationFrame(tryRestore)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const registerSection = (key, el) => {
    if (el) sectionNodesRef.current.set(key, el)
    else sectionNodesRef.current.delete(key)
  }

  const registerItem = (key, el) => {
    if (el) itemNodesRef.current.set(key, el)
    else itemNodesRef.current.delete(key)
  }

  const scrollToEl = (el) => {
    const lenis = lenisRef.current?.lenis
    if (el && lenis) lenis.scrollTo(el, { duration: 1.2 })
  }

  const handleSelectYear = (key) => scrollToEl(sectionNodesRef.current.get(key))
  const handleSelectItem = (key) => scrollToEl(itemNodesRef.current.get(key))

  return (
    <div className="h-dvh animate-[fade-in_1s_ease-out] overflow-hidden">
      <RangeLabel onScrollTop={() => lenisRef.current?.lenis?.scrollTo(0)} />
      <SideDecoration
        years={YEARS.slice(0, Math.ceil(YEARS.length / 2))}
        activeYear={activeYear}
        onSelectYear={handleSelectYear}
        activeItem={activeItem}
        onSelectItem={handleSelectItem}
        side="left"
      />
      <SideDecoration
        years={YEARS.slice(Math.ceil(YEARS.length / 2))}
        activeYear={activeYear}
        onSelectYear={handleSelectYear}
        activeItem={activeItem}
        onSelectItem={handleSelectItem}
        side="right"
      />
      <CornerBadge />
      <FrameCornerMark />
      <BottomBar />
      <InfoRow />
      <ChannelBars />
      <YearCornerMark />

      <ReactLenis ref={lenisRef} root={false} className="h-dvh overflow-y-scroll">
        <HistoryEntries
          registerSection={registerSection}
          sectionNodesRef={sectionNodesRef}
          onActiveYearChange={setActiveYear}
          registerItem={registerItem}
          itemNodesRef={itemNodesRef}
          onActiveItemChange={setActiveItem}
        />
      </ReactLenis>
    </div>
  )
}

export default History

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toJpeg, toPng } from 'html-to-image'
import ticketUrl from '../assets/image/ticket.svg'
import ticketLeftUrl from '../assets/image/ticket_left.svg'
import chipUrl from '../assets/image/silverbell_chip.webp'
import twentiethWatermarkImg from '../assets/image/twentieth-watermark.webp'
import panoramaWatermarkImg from '../assets/image/panorama-watermark.webp'
import castingBoardBgImg from '../assets/image/casting-board-bg.webp'
// import logo1Img from '../assets/image/logo1.webp'
import parkEunTaeImg from '../assets/cast/park-eun-tae.webp'
import ensembleImg from '../assets/cast/ensemble-5.webp'
import grantaireImg from '../assets/cast/grantaire.webp'
import hamletLaertesImg from '../assets/image/profiles/hamlet-2011.webp'
import jeongDonghyeonImg from '../assets/cast/jeong-donghyeon.webp'
import mozartImg from '../assets/cast/mozart.webp'
import kimsaengImg from '../assets/cast/kimsaeng.webp'
import molinaImg from '../assets/cast/molina.webp'
import elisabethLuigiImg from '../assets/cast/elisabeth-luigi.webp'
import rudolfImg from '../assets/cast/rudolf.webp'
import jesusImg from '../assets/cast/jesus.webp'
import yemiheonImg from '../assets/cast/yemiheon.webp'
import frankensteinImg from '../assets/cast/frankenstein.webp'
import jekyllHydeImg from '../assets/cast/jekyll-hyde.webp'
import dorianImg from '../assets/cast/dorian.webp'
import phantomImg from '../assets/cast/phantom.webp'
import madisonImg from '../assets/cast/madison.webp'
import benhurImg from '../assets/cast/benhur.webp'
import zhivagoImg from '../assets/cast/zhivago.webp'
import sweeneytoddImg from '../assets/cast/sweeneytodd.webp'
import lolaImg from '../assets/cast/lola.webp'
import gentlemansguideImg from '../assets/cast/gentlemansguide.webp'
import laughingmanImg from '../assets/cast/laughingman.webp'
import beethovenImg from '../assets/cast/beethoven.webp'
import iltenoreImg from '../assets/cast/iltenore.webp'
import hanbokImg from '../assets/cast/hanbok.webp'
import swingdaysImg from '../assets/cast/swingdays.webp'

const CAST_ROWS = [7, 6, 7, 6]

const CAST_LIST = [
  { role: '남자 앙상블 5번', show: '', image: ensembleImg },
  { role: '그랭구아르', show: '노트르담', image: grantaireImg },
  { role: '햄릿 / 레어티스', show: '햄릿', image: hamletLaertesImg, objectPosition: 'top' },
  { role: '정동현', show: '사랑은 비를타고', image: jeongDonghyeonImg },
  { role: '볼프강 모차르트', show: '모차르트!', image: mozartImg },
  { role: '김생', show: '피맛골 연가', image: kimsaengImg, objectPosition: 'top' },
  { role: '몰리나', show: '거미여인의 키스', image: molinaImg },
  { role: '루이지 루케니', show: '엘리자벳', image: elisabethLuigiImg },
  { role: '황태자 루돌프', show: '황태자 루돌프', image: rudolfImg },
  {
    role: '지저스',
    show: '지저스 크라이스트 수퍼스타',
    image: jesusImg,
    zoom: 1.75,
    objectPosition: 'top',
    offset: [1, 5],
  },
  {
    role: '예미헌',
    show: '아리랑 - 경성 26년',
    image: yemiheonImg,
    zoom: 1.2,
    objectPosition: 'top',
  },
  { role: '앙리 뒤프레/괴물', show: '프랑켄슈타인', image: frankensteinImg },
  { role: '헨리 지킬/에드워드 하이드', show: '지킬 앤 하이드', image: jekyllHydeImg },
  { role: '헨리워튼', show: '도리안 그레이', image: dorianImg },
  { role: '팬텀', show: '팬텀', image: phantomImg },
  { role: '로버트 킨케이드', show: '매디슨 카운티의 다리', image: madisonImg },
  { role: '유다 벤허', show: '벤허', image: benhurImg },
  { role: '유리 지바고', show: '닥터 지바고', image: zhivagoImg },
  { role: '스위니토드', show: '스위니 토드', image: sweeneytoddImg },
  {
    role: '롤라',
    show: '킹키부츠',
    image: lolaImg,
    zoom: 1.5,
    objectPosition: 'top',
    offset: [-5, -5],
  },
  { role: '몬티 나바로', show: '젠틀맨스 가이드 : 사랑과 살인편', image: gentlemansguideImg },
  { role: '그윈플렌', show: '웃는남자', image: laughingmanImg },
  { role: '루드비히 반 베토벤', show: '베토벤', image: beethovenImg },
  { role: '윤이선', show: '일테노레', image: iltenoreImg },
  { role: '장영실/강배', show: '한복 입은 남자', image: hanbokImg },
  { role: '유일형', show: '스윙데이즈_암호명 A', image: swingdaysImg },
]

const THUMB_WIDTH = 64
const THUMB_HEIGHT = (THUMB_WIDTH * 113) / 94

function buildImageBox(offset, unit = 'px') {
  const y = Math.max(offset?.[1] ?? 0, 0)
  if (!y) return undefined
  const extra = unit === 'percent' ? `${(y / THUMB_HEIGHT) * 100}%` : `${y}px`
  return { top: `-${extra}`, height: `calc(100% + ${extra})` }
}

function buildImageTransform(zoom, offset, unit = 'px') {
  const parts = []
  if (offset) {
    const [x, y] = offset
    parts.push(
      unit === 'percent'
        ? `translate(${(x / THUMB_WIDTH) * 100}%, ${(y / THUMB_HEIGHT) * 100}%)`
        : `translate(${x}px, ${y}px)`,
    )
  }
  if (zoom) parts.push(`scale(${zoom})`)
  return parts.length ? parts.join(' ') : undefined
}

function getCastRows() {
  let cursor = 0
  return CAST_ROWS.map((count) => {
    const rowItems = CAST_LIST.slice(cursor, cursor + count)
    cursor += count
    return rowItems
  })
}

function CastPhoto({
  role,
  show,
  image,
  zoom,
  offset,
  objectPosition = 'center',
  size = 'w-16',
  onClick,
}) {
  const Wrapper = onClick ? 'button' : 'div'
  const wrapperProps = onClick ? { type: 'button', onClick } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`group bg-surface-muted relative aspect-[94/113] overflow-hidden ${size} shadow-sm`}
    >
      {image && (
        <>
          <img
            src={image}
            alt={role}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              ...buildImageBox(offset),
              objectPosition,
              transform: buildImageTransform(zoom, offset),
              transformOrigin: objectPosition,
              filter: 'grayscale(25%) sepia(12%) saturate(115%) contrast(102%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[#dcf0fc] opacity-40 mix-blend-soft-light" />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-[9px] leading-tight font-medium text-white">{role}</p>
        {show && <p className="text-[8px] leading-tight text-white/80">{show}</p>}
      </div>
    </Wrapper>
  )
}

function CastPhotoModal({ item, onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed inset-0 z-[90] flex animate-[fade-in_0.2s_ease-out] flex-col items-center justify-center gap-4 bg-black/85 p-6"
    >
      <div className="bg-surface-muted relative aspect-[94/113] w-full max-w-xs overflow-hidden shadow-lg">
        <img
          src={item.image}
          alt={item.role}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            ...buildImageBox(item.offset, 'percent'),
            objectPosition: item.objectPosition ?? 'center',
            transform: buildImageTransform(item.zoom, item.offset, 'percent'),
            transformOrigin: item.objectPosition ?? 'center',
          }}
        />
      </div>

      <div className="text-center text-white">
        <p className="text-sm font-medium">{item.role}</p>
        {item.show && <p className="mt-1 text-xs text-white/80">{item.show}</p>}
      </div>
    </button>
  )
}

function CastGridStaggered() {
  return (
    <div className="hidden flex-1 flex-col justify-center gap-4 lg:flex">
      {getCastRows().map((rowItems, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-4">
          {rowItems.map((item, seatIndex) => (
            <CastPhoto
              key={seatIndex}
              role={item.role}
              show={item.show}
              image={item.image}
              zoom={item.zoom}
              offset={item.offset}
              objectPosition={item.objectPosition}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function CastGridWrap() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="flex flex-1 flex-wrap content-end justify-center gap-x-1.5 gap-y-4 lg:hidden">
      {CAST_LIST.map((item, i) => (
        <CastPhoto
          key={i}
          role={item.role}
          show={item.show}
          image={item.image}
          zoom={item.zoom}
          offset={item.offset}
          objectPosition={item.objectPosition}
          onClick={item.image ? () => setSelectedItem(item) : undefined}
        />
      ))}

      {selectedItem && (
        <CastPhotoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}

function MainCast() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-stretch gap-3 sm:translate-x-3">
        <div className="bg-surface-muted aspect-[213/253] w-24 overflow-hidden shadow-sm sm:w-40">
          <img src={parkEunTaeImg} alt="박은태" className="h-full w-full object-cover" />
        </div>

        <div className="text-ink-muted flex flex-col items-center gap-1 text-xs sm:text-sm">
          <span>박</span>
          <span>은</span>
          <span>태</span>
        </div>
      </div>

      {/* <img
        src={logo1Img}
        alt="20주년 파노라마"
        className="absolute top-full left-1/2 mt-4 w-16 -translate-x-1/2 sm:mt-10 sm:w-56"
      /> */}
    </div>
  )
}

function BoardContentFull({ boardRef }) {
  return (
    <div
      ref={boardRef}
      className="border-line relative w-[1152px] shrink-0 overflow-hidden border bg-white p-8 shadow-lg"
    >
      <img
        src={castingBoardBgImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />
      <img
        src={twentiethWatermarkImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-27px] left-[-25px] z-0 w-72"
      />
      <img
        src={panoramaWatermarkImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-25px] bottom-[-25px] z-0 w-96"
      />

      <div className="relative z-10 grid grid-cols-3 items-start">
        <div />

        <div className="text-center">
          <h1 className="text-ink-muted text-3xl font-light tracking-[0.3em]">TODAY&apos;S CAST</h1>
          <p className="text-ink-muted mt-1 text-xs">박은태 배우님 20주년기념 홈페이지</p>
        </div>

        <p className="text-ink-muted justify-self-end text-2xl">10 / 28</p>
      </div>

      <div className="relative z-10 mt-8 flex items-center pl-20">
        <div className="relative flex flex-col items-center">
          <div className="flex translate-x-3 items-stretch gap-3">
            <div className="bg-surface-muted aspect-[213/253] w-40 overflow-hidden shadow-sm">
              <img src={parkEunTaeImg} alt="박은태" className="h-full w-full object-cover" />
            </div>

            <div className="text-ink-muted flex flex-col items-center gap-1 text-sm">
              <span>박</span>
              <span>은</span>
              <span>태</span>
            </div>
          </div>

          {/* <img
            src={logo1Img}
            alt="20주년 파노라마"
            className="absolute top-full left-1/2 mt-10 w-64 -translate-x-1/2"
          /> */}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4">
          {getCastRows().map((rowItems, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-4">
              {rowItems.map((item, seatIndex) => (
                <CastPhoto
                  key={seatIndex}
                  role={item.role}
                  show={item.show}
                  image={item.image}
                  zoom={item.zoom}
                  offset={item.offset}
                  objectPosition={item.objectPosition}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-ink-muted relative z-10 mt-10 flex items-center justify-center gap-3 text-sm">
        <span>2026.10.28</span>
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          <img src={chipUrl} alt="은빛소리 SEAL" className="h-full w-full object-cover" />
        </span>
        <span>은빛소리</span>
      </div>
    </div>
  )
}

function LandscapeModal({ onClose }) {
  const stageRef = useRef(null)
  const rotateRef = useRef(null)
  const captureRef = useRef(null)
  const [scale, setScale] = useState(1)
  const pressTimerRef = useRef(null)

  const clearBoardPressTimer = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }

  const handleBoardPointerDown = (event) => {
    if (event.pointerType !== 'touch') return
    pressTimerRef.current = setTimeout(() => downloadBoardAsImage(captureRef.current), 600)
  }

  useEffect(() => {
    function updateScale() {
      const stage = stageRef.current
      const board = rotateRef.current
      if (!stage || !board) return
      const width = board.offsetWidth
      const height = board.offsetHeight
      const scaleToFitHeight = stage.clientWidth / height
      const scaleToFitWidth = stage.clientHeight / width
      setScale(Math.min(scaleToFitHeight, scaleToFitWidth))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className="pointer-events-auto fixed inset-0 z-[70] flex flex-col bg-black/90">
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <DownloadBoardButton targetRef={captureRef} />
          <ShareBoardButton targetRef={captureRef} prerender />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="border-line text-dark-ink rounded-full border px-4 py-2 text-xs"
        >
          닫기
        </button>
      </div>

      <div ref={stageRef} className="flex min-h-0 flex-1 items-center justify-center">
        <div
          ref={rotateRef}
          style={{ transform: `rotate(90deg) scale(${scale})` }}
          className="relative"
          onPointerDown={handleBoardPointerDown}
          onPointerUp={clearBoardPressTimer}
          onPointerLeave={clearBoardPressTimer}
          onPointerCancel={clearBoardPressTimer}
        >
          <BoardContentFull boardRef={captureRef} />
        </div>
      </div>
    </div>
  )
}

function TicketTearOverlay({ onComplete }) {
  const [isSplit, setIsSplit] = useState(false)

  const handleTouch = () => {
    if (isSplit) return
    setIsSplit(true)
    setTimeout(onComplete, 1000)
  }

  return (
    <button
      type="button"
      onClick={handleTouch}
      className="fixed inset-0 z-[80] flex animate-[fade-in_0.5s_ease-out] flex-col items-center justify-center gap-10 overflow-hidden bg-black/70 px-6"
    >
      <div className="flex items-center">
        <img
          src={ticketLeftUrl}
          alt=""
          className={`h-auto w-[calc((100vw-48px)/3)] transition-transform duration-700 ease-out sm:w-[248px] ${
            isSplit
              ? '-translate-x-[39px] -rotate-6 sm:-translate-x-[71px]'
              : 'translate-x-0 rotate-0'
          }`}
        />
        <img
          src={ticketUrl}
          alt=""
          className={`-ml-[7px] h-auto w-[calc((100vw-48px)*2/3)] transition-transform duration-700 ease-out sm:w-[498px] ${
            isSplit ? 'translate-x-[39px] rotate-6 sm:translate-x-[71px]' : 'translate-x-0 rotate-0'
          }`}
        />
      </div>

      <p
        className={`text-sm tracking-widest text-white transition-opacity duration-300 ${
          isSplit ? 'opacity-0' : 'opacity-100'
        }`}
      >
        터치하여 입장하기
      </p>
    </button>
  )
}

const BOARD_FILE_NAME = '박은태 20주년 - 캐스팅 보드'
const BOARD_FONT_BASE =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff2'
const BOARD_FONTS = [
  { weight: 300, file: 'Pretendard-Light.woff2' },
  { weight: 400, file: 'Pretendard-Regular.woff2' },
]
const IS_WEBKIT =
  /iP(ad|hone|od)/.test(navigator.userAgent) ||
  (/Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Android/.test(navigator.userAgent))
let boardFontCssPromise = null

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

function getBoardFontCss() {
  if (!boardFontCssPromise) {
    boardFontCssPromise = Promise.all(
      BOARD_FONTS.map(async ({ weight, file }) => {
        const response = await fetch(`${BOARD_FONT_BASE}/${file}`)
        const dataUrl = await blobToDataUrl(await response.blob())
        return `@font-face{font-family:'Pretendard';font-weight:${weight};src:url(${dataUrl}) format('woff2');}`
      }),
    )
      .then((parts) => parts.join(''))
      .catch(() => {
        boardFontCssPromise = null
        return ''
      })
  }
  return boardFontCssPromise
}

async function captureBoardAsDataUrl(node, format = 'png') {
  const render = format === 'jpeg' ? toJpeg : toPng
  const options = {
    pixelRatio: 2,
    quality: 0.95,
    backgroundColor: '#ffffff',
    fontEmbedCSS: await getBoardFontCss(),
    filter: (child) => child.dataset?.captureIgnore !== 'true',
  }
  node.setAttribute('data-capturing', 'true')
  try {
    if (IS_WEBKIT) await render(node, options)
    return await render(node, options)
  } finally {
    node.removeAttribute('data-capturing')
  }
}

async function downloadBoardAsImage(node) {
  const dataUrl = await captureBoardAsDataUrl(node)
  const link = document.createElement('a')
  link.download = `${BOARD_FILE_NAME}.png`
  link.href = dataUrl
  link.click()
}

async function captureBoardAsFile(node) {
  const dataUrl = await captureBoardAsDataUrl(node, 'jpeg')
  const blob = await (await fetch(dataUrl)).blob()
  return new File([blob], `${BOARD_FILE_NAME}.jpg`, { type: 'image/jpeg', lastModified: Date.now() })
}

const CAN_SHARE_FILES =
  typeof navigator.share === 'function' &&
  typeof navigator.canShare === 'function' &&
  navigator.canShare({ files: [new File([''], `${BOARD_FILE_NAME}.jpg`, { type: 'image/jpeg' })] })

function DownloadBoardButton({ targetRef }) {
  const handleClick = () => {
    downloadBoardAsImage(targetRef.current)
  }

  return (
    <button
      type="button"
      data-capture-ignore="true"
      onClick={handleClick}
      aria-label="캐스팅보드 이미지 다운로드"
      className="border-line text-ink-muted flex h-8 w-8 items-center justify-center rounded-full border bg-white/80 shadow-sm sm:h-10 sm:w-10"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
        <path
          d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function ShareBoardButton({ targetRef, prerender = false }) {
  const preparedFileRef = useRef(null)
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    if (!prerender || !CAN_SHARE_FILES) return
    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        const file = await captureBoardAsFile(targetRef.current)
        if (!cancelled) preparedFileRef.current = file
      } catch {
        preparedFileRef.current = null
      }
    }, 800)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [prerender, targetRef])

  if (!CAN_SHARE_FILES) return null

  const handleClick = async () => {
    if (isSharing) return
    setIsSharing(true)
    try {
      const file = preparedFileRef.current ?? (await captureBoardAsFile(targetRef.current))
      await navigator.share({ files: [file] })
    } catch (error) {
      if (error?.name !== 'AbortError') console.error(error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <button
      type="button"
      data-capture-ignore="true"
      onClick={handleClick}
      disabled={isSharing}
      aria-label="캐스팅보드 이미지 공유"
      className="border-line text-ink-muted flex h-8 w-8 items-center justify-center rounded-full border bg-white/80 shadow-sm disabled:opacity-50 sm:h-10 sm:w-10"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
        <path
          d="M12 15V4m0 0L8 8m4-4 4 4M6 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function CastingBoard() {
  const boardRef = useRef(null)
  const [showLandscape, setShowLandscape] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ticketImg = new Image()
    ticketImg.src = ticketUrl
    const ticketLeftImg = new Image()
    ticketLeftImg.src = ticketLeftUrl
  }, [])

  const handleEnter = () => {
    setIsEntering(true)
  }

  return (
    <>
      <main className="pointer-events-none flex items-center justify-center overflow-hidden px-4 pt-16 pb-48 sm:px-6 sm:py-10 lg:fixed lg:inset-0 lg:z-0 lg:py-12 lg:pr-[270px] [@media(min-width:1024px)_and_(max-height:950px)]:static! [@media(min-width:1024px)_and_(max-height:950px)]:inset-auto! [@media(min-width:1024px)_and_(max-height:950px)]:overflow-visible! [@media(min-width:1024px)_and_(max-height:950px)]:pt-20! [@media(min-width:1024px)_and_(max-height:950px)]:pb-40!">
        <div className="pointer-events-auto flex w-full max-w-6xl flex-col items-center gap-[18px] sm:items-end">
          <div
            ref={boardRef}
            className="border-line relative w-full overflow-hidden border bg-white px-4 py-12 shadow-lg sm:p-8"
          >
            <img
              src={castingBoardBgImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            />
            <img
              src={twentiethWatermarkImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-[-19px] left-[-15px] z-0 w-40 sm:top-[-27px] sm:left-[-25px] sm:w-64 lg:w-72"
            />
            <img
              src={panoramaWatermarkImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-15px] bottom-[-15px] z-0 w-48 sm:right-[-25px] sm:bottom-[-25px] sm:w-80 lg:w-96"
            />

            <div className="relative z-10 grid grid-cols-3 items-start">
              <div />

              <div className="text-center">
                <h1 className="text-ink-muted text-base font-light tracking-[0.15em] sm:text-3xl sm:tracking-[0.3em]">
                  TODAY&apos;S CAST
                </h1>
                <p className="text-ink-muted mt-1 text-[9px] whitespace-nowrap sm:text-xs">
                  박은태 배우님 20주년기념 홈페이지
                </p>
              </div>

              <div className="justify-self-end text-right">
                <p className="text-ink-muted text-sm sm:text-2xl">10 / 28</p>

                <button
                  type="button"
                  onClick={() => setShowLandscape(true)}
                  className="border-line text-ink-muted mt-2 rounded border px-2 py-1 text-[9px] tracking-wide lg:hidden"
                >
                  가로로 보기
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-4 flex flex-1 flex-col items-center gap-6 sm:mt-8 lg:flex-row lg:items-center lg:gap-0 lg:pl-20">
              <MainCast />
              <CastGridStaggered />
              <CastGridWrap />
            </div>

            <div className="text-ink-muted relative z-10 mt-6 flex items-center justify-center gap-2 text-xs sm:mt-10 sm:gap-3 sm:text-sm">
              <span>2026.10.28</span>
              <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full sm:h-10 sm:w-10">
                <img src={chipUrl} alt="은빛소리 SEAL" className="h-full w-full object-cover" />
              </span>
              <span>은빛소리</span>
            </div>
          </div>

          <div className="hidden w-full justify-start gap-2 lg:flex">
            <DownloadBoardButton targetRef={boardRef} />
            <ShareBoardButton targetRef={boardRef} />
          </div>

          <button
            type="button"
            onClick={handleEnter}
            disabled={isEntering}
            className="bg-ink mb-[100px] self-center px-8 py-3 text-sm font-medium text-white disabled:opacity-70 sm:mb-[50px] md:mb-[200px] lg:mb-0"
          >
            입장하기
          </button>
        </div>

        {showLandscape && <LandscapeModal onClose={() => setShowLandscape(false)} />}
      </main>

      {isEntering && <TicketTearOverlay onComplete={() => navigate('/history')} />}
    </>
  )
}

export default CastingBoard

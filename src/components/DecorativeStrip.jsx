const TEXT_CLASS =
  'text-faint -rotate-90 whitespace-nowrap font-display text-[150px] font-normal leading-none tracking-[-0.11em] select-none [-webkit-text-stroke:1.5px_var(--color-stroke)]'

function StubCard() {
  return (
    <a
      href="https://cafe.naver.com/silverbell1029"
      target="_blank"
      rel="noopener noreferrer"
      className="border-line bg-surface text-ink-muted pointer-events-auto fixed right-0 bottom-[50px] z-40 block w-[95px] rotate-[-8deg] border px-[8px] pt-0 pb-[4px] shadow-sm transition-transform duration-300 hover:-translate-x-2 hover:-translate-y-8 min-[1025px]:bottom-[30px] min-[1025px]:w-[270px] min-[1025px]:px-[24px] min-[1025px]:pb-[9px]"
    >
      <p
        className="text-ink text-center text-[29px] font-normal min-[1025px]:text-[88px]"
        style={{ fontFamily: "'Syncopate', sans-serif" }}
      >
        1028
      </p>
      <span className="-mt-2 flex items-center justify-end gap-1 pb-[2px] text-[6px] min-[1025px]:-mt-7 min-[1025px]:pb-1.5 min-[1025px]:text-[13px]">
        은빛소리로 이동
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </a>
  )
}

function DecorativeStrip({ showText = true }) {
  return (
    <>
      {showText && (
        <div className="border-stroke fixed inset-y-0 right-0 z-30 hidden w-[270px] border-l bg-white lg:block">
          <span
            aria-hidden="true"
            className={`${TEXT_CLASS} pointer-events-none absolute top-[38%] left-1/3 -translate-x-1/2`}
          >
            OCTOBER
          </span>

          <span
            aria-hidden="true"
            className={`${TEXT_CLASS} pointer-events-none absolute top-[10%] left-12`}
          >
            28TH
          </span>
        </div>
      )}

      <StubCard />
    </>
  )
}

export default DecorativeStrip

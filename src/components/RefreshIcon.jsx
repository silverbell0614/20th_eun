function RefreshIcon({ spinning = false }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={spinning ? 'animate-spin' : undefined}
    >
      <path
        d="M13.5 8A5.5 5.5 0 1 1 11.8 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M14 2.5V5.5H11"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default RefreshIcon

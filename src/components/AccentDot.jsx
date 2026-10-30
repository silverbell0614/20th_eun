function AccentDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-accent inline-block h-2 w-2 rounded-full ${className}`}
    />
  )
}

export default AccentDot

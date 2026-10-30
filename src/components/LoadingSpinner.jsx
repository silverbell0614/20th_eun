const SPINNER_BARS = Array.from({ length: 12 })

const SPINNER_SIZES = {
  lg: { container: 'h-28 w-28', bar: 'h-[22px] w-[6px]', radius: 44 },
  sm: { container: 'h-8 w-8', bar: 'h-[6px] w-[2px]', radius: 13 },
}

function LoadingSpinner({ size = 'lg' }) {
  const { container, bar, radius } = SPINNER_SIZES[size]

  return (
    <div className={`relative ${container}`}>
      {SPINNER_BARS.map((_, i) => (
        <span
          key={i}
          className={`bg-line absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full ${bar}`}
          style={{
            transform: `rotate(${i * 30}deg) translateY(-${radius}px)`,
            animation: 'spinner-fade 1.2s linear infinite',
            animationDelay: `${(i * 1.2) / 12}s`,
          }}
        />
      ))}
    </div>
  )
}

export default LoadingSpinner

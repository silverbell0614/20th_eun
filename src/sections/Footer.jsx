function Footer({ inline = false }) {
  const className = inline
    ? 'border-divider bg-surface text-ink-muted relative border-t py-4 pb-20 text-center text-sm min-[1400px]:fixed min-[1400px]:inset-x-0 min-[1400px]:bottom-0 min-[1400px]:z-50 min-[1400px]:pb-4'
    : 'border-divider bg-surface text-ink-muted fixed inset-x-0 bottom-0 z-50 border-t py-4 text-center text-sm'

  return (
    <footer className={className}>
      <p>&copy; {new Date().getFullYear()} 박은태 20주년</p>
    </footer>
  )
}

export default Footer

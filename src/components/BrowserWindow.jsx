function BrowserWindow({ className = '', children }) {
  return (
    <div
      className={`border-line overflow-hidden rounded-2xl border bg-white shadow-sm ${className}`}
    >
      <div className="bg-surface-muted flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4">
        <span className="border-line h-3 w-3 rounded-full border bg-white" />
        <span className="border-line h-3 w-3 rounded-full border bg-white" />
        <span className="border-line h-3 w-3 rounded-full border bg-white" />
      </div>

      <div className="p-4 sm:p-10 lg:p-16">{children}</div>
    </div>
  )
}

export default BrowserWindow

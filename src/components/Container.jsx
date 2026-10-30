const MAX_WIDTHS = {
  default: 'max-w-6xl',
  narrow: 'max-w-2xl',
}

function Container({ as: Tag = 'div', size = 'default', className = '', children }) {
  return (
    <Tag className={`mx-auto w-full ${MAX_WIDTHS[size]} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}

export default Container

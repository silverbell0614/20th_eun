import { Link } from 'react-router-dom'

function PrimaryLink({ to, children }) {
  return (
    <Link to={to} className="bg-ink px-8 py-3 text-sm font-medium text-white">
      {children}
    </Link>
  )
}

export default PrimaryLink

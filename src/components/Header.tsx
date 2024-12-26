import { Link, NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <nav className="bg-orange-400 p-4">
      <ul className="flex items-center justify-center gap-[40px]">
        <li>
          <Link to="/" className="text-white text-[20px] hover:text-gray-200">
              Loggoo
          </Link>
        </li>
        <li>
          <NavLink to="/" className="text-white">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="text-white">About</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Header
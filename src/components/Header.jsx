import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {

  const { isAuthenticated, logout } = useAuth()
  const nav = useNavigate()
  const handleLogout = () => { logout(); nav('/') }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-blue-600 text-2xl font-bold">📈</span>
          <span className="text-xl font-semibold">SmartVest</span>
        </Link>
        <nav className="space-x-4">
          <NavLink
            to="/contents"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-blue-600'
            }
          >
            Conteúdos
          </NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">Sair</button>
          ) : (
            <NavLink to="/" className={({isActive})=>isActive?'text-blue-600 font-medium':'text-gray-600 hover:text-blue-600'}>
              Sair
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

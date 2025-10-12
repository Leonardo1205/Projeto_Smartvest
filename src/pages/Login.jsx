// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { api } from '../lib/api'

// export default function Login() {
//   const nav = useNavigate()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleLogin = async (e) => {
//   e.preventDefault()
//   try {
//     const { data } = await api.post('/auth/login', { email, password })
//     localStorage.setItem('token', data.access_token)
//     nav('/contents')
//   } catch (err) {
//     alert('Credenciais inválidas', err.response.data.detail)
//   }
// }

//   const handleGoogleLogin = () => {
//     const base = import.meta.env.VITE_API_URL || ''
//     window.location.href = `${base}/auth/google`
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 p-4">
//       <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1">Usuário</label>
//             <input
//               type="email"
//               className="w-full border px-3 py-2 rounded"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Senha</label>
//             <input
//               type="password"
//               className="w-full border px-3 py-2 rounded"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Botão Google */}
//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//             aria-label="Login com Google"
//           >
//             <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
//               <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.9-6.9C35.9 2.3 30.47 0 24 0 14.6 0 6.4 5.38 2.56 13.22l8.35 6.48C12.7 14.16 17.9 9.5 24 9.5z"/>
//               <path fill="#4285F4" d="M46.5 24c0-1.6-.16-3.13-.46-4.6H24v9h12.7c-.55 2.97-2.2 5.48-4.7 7.16l7.2 5.6C43.94 37.3 46.5 31.1 46.5 24z"/>
//               <path fill="#FBBC05" d="M10.9 19.7l-8.35-6.48C1.63 15.2 1 19.5 1 24s.63 8.8 1.55 10.78l8.35-6.48c-.4-1.2-.62-2.48-.62-3.8s.22-2.6.62-3.8z"/>
//               <path fill="#34A853" d="M24 47c6.48 0 11.93-2.13 15.9-5.82l-7.2-5.6c-2 1.34-4.56 2.14-8.7 2.14-6.1 0-11.3-4.66-12.1-10.42l-8.35 6.48C6.4 42.62 14.6 47 24 47z"/>
//               <path fill="none" d="M1 1h46v46H1z"/>
//             </svg>
//             <span>Login com Google</span>
//           </button>

//           {/* Link de cadastro (abaixo do Google) */}
//           <p className="text-center text-sm text-gray-600">
//             Ainda não possui uma conta?{' '}
//             <Link to="/register" className="text-blue-600 font-medium hover:underline">
//               Criar conta
//             </Link>
//           </p>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Entrar
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      nav('/contents')
    } catch {
      setError('Email ou senha inválidos.')
    }
  }

  const handleGoogleLogin = () => {
     const base = import.meta.env.VITE_API_URL;
    window.location.href = `${base}/auth/google`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Usuário (e-mail)</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Senha</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            aria-label="Login com Google"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.9-6.9C35.9 2.3 30.47 0 24 0 14.6 0 6.4 5.38 2.56 13.22l8.35 6.48C12.7 14.16 17.9 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24c0-1.6-.16-3.13-.46-4.6H24v9h12.7c-.55 2.97-2.2 5.48-4.7 7.16l7.2 5.6C43.94 37.3 46.5 31.1 46.5 24z"/>
              <path fill="#FBBC05" d="M10.9 19.7l-8.35-6.48C1.63 15.2 1 19.5 1 24s.63 8.8 1.55 10.78l8.35-6.48c-.4-1.2-.62-2.48-.62-3.8s.22-2.6.62-3.8z"/>
              <path fill="#34A853" d="M24 47c6.48 0 11.93-2.13 15.9-5.82l-7.2-5.6c-2 1.34-4.56 2.14-8.7 2.14-6.1 0-11.3-4.66-12.1-10.42l-8.35 6.48C6.4 42.62 14.6 47 24 47z"/>
            </svg>
            <span>Login com Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Ainda não possui uma conta?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Criar conta
            </Link>
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}


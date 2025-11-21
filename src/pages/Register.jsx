
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const nav = useNavigate()
  const { register, login } = useAuth()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }
    setError('')
    try {
      await register(nickname, email, password)
      await login(email, password) 
      nav('/contents')
    } catch {
      setError('Não foi possível criar a conta (e-mail já usado).')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Criar conta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1">Apelido</label>
            <input className="w-full border px-3 py-2 rounded"
              value={nickname} onChange={e=>setNickname(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Usuário (e-mail)</label>
            <input type="email" className="w-full border px-3 py-2 rounded"
              value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Senha</label>
            <input type="password" className="w-full border px-3 py-2 rounded"
              value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Confirmar senha</label>
            <input type="password" className="w-full border px-3 py-2 rounded"
              value={confirm} onChange={e=>setConfirm(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Criar conta
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já possui conta?{' '}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../hooks/useAuth'

export default function OAuthCallback() {
  const [sp] = useSearchParams()
  const nav = useNavigate()
  const { applyToken } = useAuth()

  useEffect(() => {
    const t = sp.get('token')
    if (t) {
      applyToken(t)
      // opcional: preencher o contexto chamando /auth/me
      api.get('/auth/me').finally(() => nav('/contents'))
    } else {
      nav('/')
    }
  }, [nav, sp, applyToken])

  return <div className="p-6">Processando login com Google…</div>
}

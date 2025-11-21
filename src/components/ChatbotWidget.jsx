import { useEffect, useRef, useState } from 'react'

export default function ChatbotWidget({ context, topicSlug }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Bem-vindo! Pergunte sobre ${context}` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    setError('')
    const userMsg = { from: 'user', text }
    setMessages(msgs => [...msgs, userMsg])
    setInput('')

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: topicSlug, question: text })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.detail || `Erro ${res.status}`)
      }

      const data = await res.json()
      const botText = data?.answer || 'Não encontrei nada sobre isso neste tópico.'
      const botMsg = { from: 'bot', text: botText }
      setMessages(msgs => [...msgs, botMsg])

    } catch (err) {
      setError(err.message || 'Falha ao consultar o chat')
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Ops, algo deu errado ao consultar o chat.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col h-full">
      <div className="flex-1 space-y-2 overflow-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[90%] ${
              m.from === 'bot' ? 'bg-gray-100' : 'bg-blue-100 ml-auto'
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded bg-gray-100 text-gray-600">pensando…</div>
        )}
        {error && (
          <div className="p-2 rounded bg-red-100 text-red-700">{error}</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send() }}
          placeholder="Digite sua dúvida"
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          title={loading ? 'Aguarde…' : 'Enviar'}
        >
          →
        </button>
      </div>
    </div>
  )
}

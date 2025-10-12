import { useState } from 'react'

export default function ChatbotWidget({ context }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Bem-vindo! Pergunte sobre ${context}` }
  ])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(msgs => [...msgs, userMsg])
    setInput('')
    // TODO: chamar API OpenAI passando `context` e `input`
    const botReply = { from: 'bot', text: 'Resposta da IA aqui...' }
    setTimeout(() => setMessages(msgs => [...msgs, botReply]), 500)
  }

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col h-full">
      <div className="flex-1 space-y-2 overflow-auto mb-4">
        {messages.map((m,i) => (
          <div key={i} className={`p-2 rounded ${m.from==='bot'?'bg-gray-100':'bg-blue-100 self-end'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Digite sua dúvida"
        />
        <button onClick={send} className="bg-blue-600 text-white px-4 py-2 rounded">
          →
        </button>
      </div>
    </div>
  )
}

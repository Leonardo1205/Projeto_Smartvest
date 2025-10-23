import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ChatbotWidget from '../components/ChatbotWidget'
import { TOPICS } from '../data/topics'

export default function ContentDetail() {
  const { slug } = useParams()

  const topic = useMemo(() => TOPICS.find(t => t.slug === slug), [slug])

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">Conteúdo não encontrado</h1>
          <Link to="/contents" className="text-blue-600 underline">Voltar para conteúdos</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">{topic.title}</h1>
        <p className="text-gray-700">{topic.subtitle}</p>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Fontes oficiais</h2>
          <ul className="list-disc pl-5 space-y-1">
            {topic.sources.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  {u}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="aspect-video bg-blue-200 rounded flex items-center justify-center">
          <span className="text-white text-xl">Vídeo Embed Aqui</span>
        </div>
      </div>

      <aside className="lg:col-span-1">
        {/* mantém a API do seu ChatbotWidget como está */}
        <ChatbotWidget context={topic.title} />
      </aside>
    </div>
  )
}

import { useParams } from 'react-router-dom'
import ChatbotWidget from '../components/ChatbotWidget'

export default function ContentDetail() {
  const { id } = useParams()
  // TODO: buscar conteúdo real via API
  const content = {
    title: id === '1' ? 'Entenda o CDI' : 'Outro Conteúdo',
    text: 'Parágrafo explicativo sobre o tema...'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p>{content.text}</p>
        <div className="aspect-video bg-blue-200 rounded flex items-center justify-center">
          <span className="text-white text-xl">Vídeo Embed Aqui</span>
        </div>
      </div>
      <aside className="lg:col-span-1">
        <ChatbotWidget context={content.title} />
      </aside>
    </div>
  )
}

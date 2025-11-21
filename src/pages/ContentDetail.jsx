import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ChatbotWidget from '../components/ChatbotWidget'
import { TOPICS } from '../data/topics'

const TOPIC_VIDEOS = {
  "renda-fixa-vs-variavel": "9T6OOSRWSZI",
  "risco-vs-retorno": "5rHUluawbi0",       
  "liquidez": "7NkvpkUBARc",               
  "bolsa-de-valores": "8K_eJ_8vqHM",
  "fips": "LqY66hH9TcU", 
  "fidcs": "QmXUEnizap4",
  "fundos-imobiliarios": "z6uxHx-2Gcw",
  "etfs": "pRxzYxZ9myk",
  "fundos-de-investimentos": "IoAfqDAY6bM",
  "acoes": "opcvBOwASqE",
  "tesouro-selic": "Dugg9Eb_mhw",
  "tesouro-pre-fixado": "lnDIecuFLk0",
  "tesouro-ipca+": "xxmQz3DO-5E",
  "caderneta-de-poupanca": "hlI_SupDcpE",
  "cdb": "zkcpFhsgOaY",
  "lci-lca": "pW6IHuR5Ugw"
};

export default function ContentDetail() {
  const { slug } = useParams()

  const topic = useMemo(() => TOPICS.find(t => t.slug === slug), [slug])

  const videoId = TOPIC_VIDEOS[slug];

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


        <div className="aspect-video bg-black rounded overflow-hidden shadow-lg">
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              style={{ border: 'none' }}
              title={`Vídeo sobre ${topic.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              <span>Vídeo indisponível para este tópico.</span>
            </div>
          )}
        </div>
      </div>

      <aside className="lg:col-span-1">
        <ChatbotWidget topicSlug={slug} context={topic.title} />
      </aside>
    </div>
  )
}

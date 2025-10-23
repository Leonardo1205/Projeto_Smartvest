import { Link, useSearchParams } from 'react-router-dom'
import { TOPICS } from '../data/topics'

const PAGE_SIZE = 5

export default function Contents() {
  const [params, setParams] = useSearchParams()
  const page = Math.max(1, parseInt(params.get('page') || '1', 10))
  const totalPages = Math.max(1, Math.ceil(TOPICS.length / PAGE_SIZE))

  const start = (page - 1) * PAGE_SIZE
  const items = TOPICS.slice(start, start + PAGE_SIZE)

  const goto = (p) => {
    const safe = Math.min(Math.max(p, 1), totalPages)
    setParams({ page: String(safe) })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Conteúdos</h1>
      
      <div className="space-y-4">
        {items.map(c => (
          <Link
            key={c.slug}
            to={`/contents/${c.slug}`}
            className="block bg-white p-4 rounded shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-600">{c.subtitle}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => goto(page - 1)}
          disabled={page <= 1}
        >
          ← Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => goto(page + 1)}
          disabled={page >= totalPages}
        >
          Próxima →
        </button>
      </div>
    </div>
  )
}

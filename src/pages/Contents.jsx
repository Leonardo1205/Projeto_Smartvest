import { Link } from 'react-router-dom'

const fakeContents = [
  { id: 1, title: 'Entenda o CDI', subtitle: 'Guia para iniciantes sobre CDI' },
  { id: 2, title: 'Diferença entre IPCA e IGP-M', subtitle: 'Indices de inflação' },
  { id: 3, title: 'O que são ações?', subtitle: 'Básico sobre ações' },
]

export default function Contents() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Conteúdos</h1>
      <div className="space-y-4">
        {fakeContents.map(c => (
          <Link
            key={c.id}
            to={`/contents/${c.id}`}
            className="block bg-white p-4 rounded shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-600">{c.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

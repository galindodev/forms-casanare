import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-r from-dark to-accent-blue text-light flex flex-col justify-center items-center px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Página No Encontrada</h2>
        <p className="text-xl mb-8 text-light/80">
          La página que buscas no existe en nuestra comunidad.
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-primary text-dark px-8 py-4 text-lg font-bold rounded hover:bg-yellow-400 transition mx-auto"
        >
          <Home size={24} />
          Volver al Inicio
        </button>
      </div>
    </div>
  )
}

import { GiTiger } from 'react-icons/gi'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-100 bg-dark text-light px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-2xl font-bold text-primary">
        <GiTiger size={32} />
        ABELARDISTA
      </div>
      <ul className="hidden md:flex gap-8 list-none">
        <li><a href="#inicio" className="hover:text-primary transition">Inicio</a></li>
        <li><a href="#quienes" className="hover:text-primary transition">Quiénes Somos</a></li>
        <li><a href="#principios" className="hover:text-primary transition">Principios</a></li>
        <li><a href="#unete" className="hover:text-primary transition">Únete</a></li>
      </ul>
      <button
        onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
        className="bg-primary text-dark px-6 py-2 rounded font-bold hover:bg-yellow-400 transition"
      >
        ÚNETE
      </button>
    </nav>
  )
}

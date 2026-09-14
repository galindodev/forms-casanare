import { GiTiger } from 'react-icons/gi'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-12 px-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <GiTiger size={32} className="text-primary" />
        <h3 className="text-2xl font-bold text-primary">COMUNIDAD ABELARDISTA CASANARE</h3>
      </div>
      <p className="mb-4">Desde el Llano, por Colombia.</p>
      <div className="flex justify-center gap-6 mb-6 flex-wrap">
        <a href="#inicio" className="text-primary hover:underline">Inicio</a>
        <a href="#quienes" className="text-primary hover:underline">Quiénes Somos</a>
        <a href="#principios" className="text-primary hover:underline">Principios</a>
        <a href="#unete" className="text-primary hover:underline">Únete</a>
      </div>
      <p className="text-sm">© 2026 Comunidad Abelardista Casanare</p>
    </footer>
  )
}

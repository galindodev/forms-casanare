import { GiTiger } from 'react-icons/gi'

export default function Hero() {
  return (
    <section id="inicio" className="bg-gradient-to-r from-dark to-accent-blue text-light py-24 px-8 text-center min-h-screen flex flex-col justify-center items-center">
      <GiTiger size={80} className="mb-4 text-primary" />
      <h1 className="text-5xl font-bold text-primary mb-4">COMUNIDAD ABELARDISTA CASANARE</h1>
      <p className="text-3xl mb-8 text-light">DESDE EL LLANO, POR COLOMBIA</p>
      <p className="max-w-2xl mx-auto text-lg mb-8">
        Una comunidad de ciudadanos que creen, participan y quieren ser protagonistas del futuro de Colombia.
      </p>
      <button
        onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
        className="bg-primary text-dark px-8 py-4 text-lg font-bold rounded hover:bg-yellow-400 transition"
      >
        QUIERO SER PARTE
      </button>
      <p className="mt-8 text-sm">19 municipios · Una comunidad · Una voz</p>
    </section>
  )
}

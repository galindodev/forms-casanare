import { FaShield, FaBalanceScale, FaDove, FaBriefcase, FaHeart, FaFlag } from 'react-icons/fa'

const principles = [
  { Icon: FaShield, title: 'SEGURIDAD', desc: 'Una Colombia donde las familias puedan vivir y trabajar con tranquilidad.' },
  { Icon: FaBalanceScale, title: 'AUTORIDAD', desc: 'El respeto por la ley, las instituciones y el orden como bases de una sociedad.' },
  { Icon: FaDove, title: 'LIBERTAD', desc: 'La defensa de las libertades individuales y de una sociedad democrática.' },
  { Icon: FaBriefcase, title: 'TRABAJO', desc: 'El esfuerzo, el emprendimiento y la generación de oportunidades.' },
  { Icon: FaHeart, title: 'FAMILIA', desc: 'La familia como uno de los pilares fundamentales de nuestra sociedad.' },
  { Icon: FaFlag, title: 'COLOMBIA', desc: 'Orgullo por nuestro país, nuestras regiones, nuestra cultura e identidad.' },
]

export default function Principles() {
  return (
    <section id="principios" className="bg-gray-100 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-accent-blue text-center mb-16">NUESTROS PRINCIPIOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow hover:shadow-lg hover:translate-y-[-5px] transition">
              <p.Icon size={48} className="mb-4 text-accent-blue mx-auto" />
              <h3 className="text-2xl font-bold text-accent-blue mb-4">{p.title}</h3>
              <p className="text-gray-700">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

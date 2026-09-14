const principles = [
  { icon: '🛡️', title: 'SEGURIDAD', desc: 'Una Colombia donde las familias puedan vivir y trabajar con tranquilidad.' },
  { icon: '⚖️', title: 'AUTORIDAD', desc: 'El respeto por la ley, las instituciones y el orden como bases de una sociedad.' },
  { icon: '🕊️', title: 'LIBERTAD', desc: 'La defensa de las libertades individuales y de una sociedad democrática.' },
  { icon: '💼', title: 'TRABAJO', desc: 'El esfuerzo, el emprendimiento y la generación de oportunidades.' },
  { icon: '❤️', title: 'FAMILIA', desc: 'La familia como uno de los pilares fundamentales de nuestra sociedad.' },
  { icon: '🇨🇴', title: 'COLOMBIA', desc: 'Orgullo por nuestro país, nuestras regiones, nuestra cultura e identidad.' },
]

export default function Principles({ isDark }) {
  return (
    <section id="principios" style={{ backgroundColor: isDark ? '#0f172a' : '#f3f4f6', padding: '80px 32px', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#003087', textAlign: 'center', marginBottom: '64px' }}>NUESTROS PRINCIPIOS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {principles.map((p, i) => (
            <div key={i} style={{ backgroundColor: isDark ? '#1e293b' : 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s', transform: 'translateY(0)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>{p.icon}</p>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#003087', marginBottom: '16px' }}>{p.title}</h3>
              <p style={{ color: isDark ? '#cbd5e1' : '#4b5563' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

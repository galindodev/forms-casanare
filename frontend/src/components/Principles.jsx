import { FiShield, FiAward, FiWind, FiBriefcase, FiHome, FiGlobe } from 'react-icons/fi'

const principles = [
  { icon: FiShield, title: 'SEGURIDAD', desc: 'Una Colombia donde las familias puedan vivir y trabajar con tranquilidad.' },
  { icon: FiAward, title: 'AUTORIDAD', desc: 'El respeto por la ley, las instituciones y el orden como bases de una sociedad.' },
  { icon: FiWind, title: 'LIBERTAD', desc: 'La defensa de las libertades individuales y de una sociedad democrática.' },
  { icon: FiBriefcase, title: 'TRABAJO', desc: 'El esfuerzo, el emprendimiento y la generación de oportunidades.' },
  { icon: FiHome, title: 'FAMILIA', desc: 'La familia como uno de los pilares fundamentales de nuestra sociedad.' },
  { icon: FiGlobe, title: 'COLOMBIA', desc: 'Orgullo por nuestro país, nuestras regiones, nuestra cultura e identidad.' },
]

export default function Principles({ isDark }) {
  return (
    <section id="principios" style={{
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 100%)',
      padding: 'clamp(80px, 12vw, 120px) 5vw',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 10vw, 80px)' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 7vw, 52px)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            letterSpacing: '2px'
          }}>
            NUESTROS PRINCIPIOS
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 3vw, 18px)',
            color: isDark ? '#94a3b8' : '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: '500'
          }}>
            Los valores que guían nuestra comunidad hacia un futuro mejor
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(24px, 4vw, 32px)',
        }}>
          {principles.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={i}
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 250, 252, 0.9) 100%)',
                  padding: 'clamp(28px, 5vw, 40px)',
                  borderRadius: '16px',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateY(0)',
                  cursor: 'pointer',
                  border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(255, 195, 0, 0.15)'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)'
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 20px 60px rgba(255, 195, 0, 0.2)'
                    : '0 20px 60px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255, 195, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(255, 195, 0, 0.15)'
                }}
              >
                {/* Decorative background */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(255, 195, 0, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }} />

                {/* Icon */}
                <div style={{
                  background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                  width: 'fit-content',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(255, 195, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={32} color="#1a1a1a" style={{ fontWeight: 'bold' }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '14px',
                  letterSpacing: '1px'
                }}>
                  {p.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: isDark ? '#cbd5e0' : '#64748b',
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {p.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[data-principle] {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}

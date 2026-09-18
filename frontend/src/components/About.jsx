export default function About({ isDark }) {
  return (
    <section id="quienes" style={{
      padding: 'clamp(80px, 12vw, 120px) 5vw',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 100%)',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(32px, 7vw, 52px)',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          letterSpacing: '2px'
        }}>
          ¿QUIÉNES SOMOS?
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(16px, 3.5vw, 18px)',
          marginBottom: 'clamp(24px, 4vw, 32px)',
          color: isDark ? '#cbd5e0' : '#4b5563',
          lineHeight: '1.8',
          fontWeight: '500'
        }}>
          La Comunidad Abelardista Casanare es un espacio ciudadano creado para conectar a personas que comparten una visión de país y desean participar activamente en la construcción del futuro de Colombia.
        </p>

        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(16px, 3.5vw, 18px)',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          color: isDark ? '#cbd5e0' : '#4b5563',
          lineHeight: '1.8',
          fontWeight: '500'
        }}>
          Somos ciudadanos de diferentes municipios, profesiones, edades y experiencias, unidos por el deseo de participar, aportar ideas y fortalecer nuestra comunidad.
        </p>

        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(255, 195, 0, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(0, 48, 135, 0.1) 0%, rgba(0, 102, 204, 0.08) 100%)',
          border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
          borderRadius: '16px',
          padding: 'clamp(24px, 5vw, 40px)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '1px',
            lineHeight: '1.4'
          }}>
            CASANARE TIENE VOZ.<br />Y QUEREMOS QUE COLOMBIA LA ESCUCHE.
          </p>
        </div>
      </div>
    </section>
  )
}

import { FiArrowDown } from 'react-icons/fi'
import portadaTigre from '../assets/portada_tigre.jpeg'

export default function Hero({ isDark }) {
  return (
    <section id="inicio" style={{
      background: isDark ? '#0f172a' : '#111827',
      color: '#f5f5f5',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Portada - primera pantalla, imagen full-width lado a lado */}
      <div style={{
        width: '100%',
        display: 'block',
        position: 'relative'
      }}>
        <img
          src={portadaTigre}
          alt="Casanare Milagro - Comunidad Abelardista"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(16px, 3vw, 28px)',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          <FiArrowDown size={24} color="#FFC300" />
        </div>
      </div>

      {/* Resto del contenido */}
      <div style={{
        width: '100%',
        padding: 'clamp(40px, 8vw, 80px) 5vw clamp(60px, 10vw, 100px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 56px)',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          letterSpacing: '2px',
          lineHeight: '1.2'
        }}>
          COMUNIDAD ABELARDISTA<br />CASANARE
        </h1>

        <p style={{
          fontSize: 'clamp(20px, 5vw, 28px)',
          marginBottom: 'clamp(24px, 5vw, 40px)',
          color: '#cbd5e0',
          fontWeight: '600',
          letterSpacing: '1.5px'
        }}>
          DESDE EL LLANO, POR COLOMBIA
        </p>

        <p style={{
          maxWidth: '700px',
          margin: '0 auto clamp(32px, 6vw, 48px)',
          fontSize: 'clamp(15px, 3.5vw, 18px)',
          color: '#cbd5e0',
          lineHeight: '1.8',
          fontWeight: '500'
        }}>
          Una comunidad de ciudadanos que creen, participan y quieren ser protagonistas del futuro de Colombia.
        </p>

        <button
          onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
            color: '#1a1a1a',
            padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 48px)',
            fontSize: 'clamp(15px, 3vw, 18px)',
            fontWeight: '800',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 12px 40px rgba(255, 195, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 16px 50px rgba(255, 195, 0, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 195, 0, 0.4)'
          }}
        >
          QUIERO SER PARTE
          <FiArrowDown size={20} />
        </button>

        <p style={{
          marginTop: 'clamp(32px, 6vw, 48px)',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          color: '#94a3b8',
          letterSpacing: '1px'
        }}>
          19 municipios · Una comunidad · Una voz
        </p>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}

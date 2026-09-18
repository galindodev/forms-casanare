import { FiArrowDown } from 'react-icons/fi'

export default function Hero({ isDark }) {
  return (
    <section id="inicio" style={{
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)'
        : 'linear-gradient(135deg, #1a1a1a 0%, #003087 50%, #1a1a1a 100%)',
      color: '#f5f5f5',
      padding: 'clamp(60px, 10vw, 120px) 5vw',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,195,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '-100px',
        left: '-100px',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0,102,204,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '-50px',
        right: '-50px',
        pointerEvents: 'none'
      }} />

      {/* Logo */}
      <div style={{
        fontSize: 'clamp(70px, 18vw, 120px)',
        marginBottom: 'clamp(20px, 4vw, 32px)',
        animation: 'float 3s ease-in-out infinite'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
          width: 'fit-content',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '30px',
          boxShadow: '0 20px 60px rgba(255, 195, 0, 0.4)'
        }}>
          🐯
        </div>
      </div>

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
          e.target.style.transform = 'scale(1.05) translateY(-3px)'
          e.target.style.boxShadow = '0 16px 50px rgba(255, 195, 0, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1) translateY(0)'
          e.target.style.boxShadow = '0 12px 40px rgba(255, 195, 0, 0.4)'
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

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        animation: 'bounce 2s ease-in-out infinite'
      }}>
        <FiArrowDown size={24} color="#FFC300" />
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}

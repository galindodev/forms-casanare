export default function Hero({ isDark }) {
  return (
    <section id="inicio" style={{ background: isDark ? 'linear-gradient(to right, #0f172a, #1e3a8a)' : 'linear-gradient(to right, #1a1a1a, #003087)', color: '#f5f5f5', padding: 'clamp(40px, 8vw, 96px) 5vw', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeInDown 0.8s ease-out' }}>
      <span style={{ fontSize: 'clamp(60px, 15vw, 80px)', marginBottom: 'clamp(12px, 3vw, 16px)' }}>🐯</span>
      <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 'bold', color: '#FFC300', marginBottom: 'clamp(12px, 2vw, 16px)' }}>COMUNIDAD ABELARDISTA CASANARE</h1>
      <p style={{ fontSize: 'clamp(18px, 5vw, 24px)', marginBottom: 'clamp(20px, 4vw, 32px)' }}>DESDE EL LLANO, POR COLOMBIA</p>
      <p style={{ maxWidth: '700px', margin: '0 auto clamp(20px, 4vw, 32px)', fontSize: 'clamp(14px, 3vw, 16px)' }}>Una comunidad de ciudadanos que creen, participan y quieren ser protagonistas del futuro de Colombia.</p>
      <button
        onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
        style={{ backgroundColor: '#FFC300', color: '#1a1a1a', padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 32px)', fontSize: 'clamp(13px, 3vw, 16px)', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
      >
        QUIERO SER PARTE
      </button>
      <p style={{ marginTop: 'clamp(20px, 4vw, 32px)', fontSize: 'clamp(10px, 2vw, 12px)' }}>19 municipios · Una comunidad · Una voz</p>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

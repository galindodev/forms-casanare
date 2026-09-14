export default function Footer({ isDark }) {
  return (
    <footer style={{ backgroundColor: isDark ? '#0f172a' : '#1a1a1a', color: '#f5f5f5', padding: '48px 32px', textAlign: 'center', transition: 'background-color 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '32px' }}>🐯</span>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFC300', margin: 0 }}>COMUNIDAD ABELARDISTA CASANARE</h3>
      </div>
      <p style={{ marginBottom: '16px' }}>Desde el Llano, por Colombia.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <a href="#inicio" style={{ color: '#FFC300', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Inicio</a>
        <a href="#quienes" style={{ color: '#FFC300', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Quiénes Somos</a>
        <a href="#principios" style={{ color: '#FFC300', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Principios</a>
        <a href="#unete" style={{ color: '#FFC300', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Únete</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>📘</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>𝕏</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>📷</a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>🎬</a>
      </div>
      <p style={{ fontSize: '12px' }}>© 2026 Comunidad Abelardista Casanare</p>
    </footer>
  )
}

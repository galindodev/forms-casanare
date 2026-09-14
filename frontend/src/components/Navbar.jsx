import { useState } from 'react'

export default function Navbar({ isDark, setIsDark }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: isDark ? '#0f172a' : '#1a1a1a', color: '#f5f5f5', padding: '12px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'background-color 0.3s' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold', color: '#FFC300' }}>
          <span style={{ fontSize: 'clamp(22px, 4vw, 28px)' }}>🐯</span>
          {!isMobile && <span>ABELARDISTA</span>}
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0 }}>
            <li><a href="#inicio" style={{ color: '#f5f5f5', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.target.style.color = '#FFC300'} onMouseLeave={(e) => e.target.style.color = '#f5f5f5'}>Inicio</a></li>
            <li><a href="#quienes" style={{ color: '#f5f5f5', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.target.style.color = '#FFC300'} onMouseLeave={(e) => e.target.style.color = '#f5f5f5'}>Quiénes</a></li>
            <li><a href="#principios" style={{ color: '#f5f5f5', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.target.style.color = '#FFC300'} onMouseLeave={(e) => e.target.style.color = '#f5f5f5'}>Principios</a></li>
            <li><a href="#unete" style={{ color: '#f5f5f5', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.target.style.color = '#FFC300'} onMouseLeave={(e) => e.target.style.color = '#f5f5f5'}>Únete</a></li>
          </ul>
        )}

        {/* Right Side - Desktop */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ backgroundColor: '#FFC300', color: '#1a1a1a', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) rotate(20deg)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
              style={{ backgroundColor: '#FFC300', color: '#1a1a1a', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              ÚNETE
            </button>
          </div>
        )}

        {/* Right Side - Mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ backgroundColor: '#FFC300', color: '#1a1a1a', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ backgroundColor: 'transparent', color: '#FFC300', border: 'none', padding: '6px', cursor: 'pointer', fontSize: '22px' }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div style={{ backgroundColor: isDark ? '#1e293b' : '#2a2a2a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,195,0,0.2)' }}>
          <a href="#inicio" style={{ color: '#FFC300', textDecoration: 'none', fontSize: '16px', padding: '8px' }} onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#quienes" style={{ color: '#FFC300', textDecoration: 'none', fontSize: '16px', padding: '8px' }} onClick={() => setMenuOpen(false)}>Quiénes Somos</a>
          <a href="#principios" style={{ color: '#FFC300', textDecoration: 'none', fontSize: '16px', padding: '8px' }} onClick={() => setMenuOpen(false)}>Principios</a>
          <button
            onClick={() => { document.getElementById('unete').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}
            style={{ backgroundColor: '#FFC300', color: '#1a1a1a', padding: '10px 16px', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px', width: '100%' }}
          >
            ÚNETE
          </button>
        </div>
      )}
    </>
  )
}

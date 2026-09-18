import { useState } from 'react'
import { FiSun, FiMoon, FiMenu, FiX, FiLock } from 'react-icons/fi'

export default function Navbar({ isDark, setIsDark }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#quienes', label: 'Quiénes' },
    { href: '#principios', label: 'Principios' },
    { href: '#unete', label: 'Únete' }
  ]

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#f5f5f5',
        padding: '16px 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Logo */}
        <button
          onClick={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '8px 12px',
            borderRadius: '10px',
            background: 'transparent',
            border: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {!isMobile && (
            <span style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}>
              ABELARDISTA
            </span>
          )}
        </button>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} style={{
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  paddingBottom: '4px',
                  borderBottom: '2px solid transparent',
                  display: 'inline-block'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FFC300'
                    e.target.style.borderBottomColor = '#FFC300'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#e2e8f0'
                    e.target.style.borderBottomColor = 'transparent'
                  }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right Side - Desktop */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                color: '#1a1a1a',
                border: 'none',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(20deg)'
                e.target.style.boxShadow = '0 6px 20px rgba(255, 195, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)'
                e.target.style.boxShadow = '0 4px 12px rgba(255, 195, 0, 0.3)'
              }}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                color: '#1a1a1a',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 6px 20px rgba(255, 195, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 4px 12px rgba(255, 195, 0, 0.3)'
              }}
            >
              ÚNETE
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                color: '#1a1a1a',
                border: 'none',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(255, 195, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 24px rgba(255, 195, 0, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 16px rgba(255, 195, 0, 0.4)'
              }}
              title="Acceso administrador"
            >
              <FiLock size={16} style={{ fontWeight: 'bold' }} />
            </button>
          </div>
        )}

        {/* Right Side - Mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                color: '#1a1a1a',
                border: 'none',
                padding: '8px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                backgroundColor: 'transparent',
                color: '#FFC300',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
          padding: '20px 5vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          borderTop: '2px solid rgba(255, 195, 0, 0.2)',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '600',
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 195, 0, 0.1)'
                e.target.style.color = '#FFC300'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#e2e8f0'
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              document.getElementById('unete').scrollIntoView({ behavior: 'smooth' })
              setMenuOpen(false)
            }}
            style={{
              background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
              color: '#1a1a1a',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              width: '100%',
              transition: 'all 0.3s',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            ÚNETE
          </button>
          <button
            onClick={() => {
              window.location.href = '/admin'
              setMenuOpen(false)
            }}
            style={{
              background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
              color: '#1a1a1a',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              width: '100%',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(255, 195, 0, 0.4)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)'
              e.target.style.boxShadow = '0 6px 20px rgba(255, 195, 0, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 4px 16px rgba(255, 195, 0, 0.4)'
            }}
            title="Acceso administrador"
          >
            <FiLock size={18} style={{ fontWeight: 'bold' }} /> Acceso
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

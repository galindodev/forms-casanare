import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer({ isDark }) {
  return (
    <footer style={{
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: '#f5f5f5',
      padding: 'clamp(60px, 10vw, 100px) 5vw',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Brand Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <h3 style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '1px'
          }}>
            ABELARDISTA CASANARE
          </h3>
        </div>

        <p style={{
          textAlign: 'center',
          marginBottom: '48px',
          color: '#cbd5e0',
          fontSize: 'clamp(14px, 2.5vw, 16px)',
          fontWeight: '500'
        }}>
          Desde el Llano, por Colombia
        </p>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(20px, 4vw, 32px)',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {[
            { href: '#inicio', label: 'Inicio' },
            { href: '#quienes', label: 'Quiénes Somos' },
            { href: '#principios', label: 'Principios' },
            { href: '#unete', label: 'Únete' }
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              style={{
                color: '#cbd5e0',
                textDecoration: 'none',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
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
                e.target.style.color = '#cbd5e0'
                e.target.style.borderBottomColor = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(16px, 3vw, 24px)',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com', color: '#1877F2' },
            { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: '#000' },
            { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
            { icon: FaYoutube, label: 'YouTube', url: 'https://youtube.com', color: '#FF0000' }
          ].map((social, i) => {
            const Icon = social.icon
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{
                  background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 24px rgba(255, 195, 0, 0.2)',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-6px)'
                  e.target.style.boxShadow = '0 12px 32px rgba(255, 195, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 24px rgba(255, 195, 0, 0.2)'
                }}
              >
                <Icon size={20} />
              </a>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 195, 0, 0.3) 50%, transparent 100%)',
          marginBottom: '32px'
        }} />

        {/* Copyright & Info */}
        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: 'clamp(12px, 2vw, 14px)',
            color: '#94a3b8',
            margin: '8px 0',
            fontWeight: '500'
          }}>
            © 2026 Comunidad Abelardista Casanare. Todos los derechos reservados.
          </p>
          <p style={{
            fontSize: '12px',
            color: '#64748b',
            margin: '8px 0'
          }}>
            19 municipios · Una comunidad · Una voz
          </p>
        </div>
      </div>
    </footer>
  )
}

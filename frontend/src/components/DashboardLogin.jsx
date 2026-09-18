import { useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const DASHBOARD_PASSWORD = 'casanare2026'

export default function DashboardLogin({ isDark }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      sessionStorage.setItem('dashboardAuth', 'true')
      window.location.href = '/admin'
    } else {
      setError('Contraseña incorrecta')
      setPassword('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      transition: 'all 0.3s'
    }}>
      <div style={{
        background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        padding: 'clamp(40px, 8vw, 60px)',
        borderRadius: '16px',
        border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
        boxShadow: isDark
          ? '0 20px 60px rgba(0, 0, 0, 0.3)'
          : '0 20px 60px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(255, 195, 0, 0.3)'
          }}>
            <FiLock size={40} color="#1a1a1a" style={{ fontWeight: 'bold' }} />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#FFC300',
            margin: '0 0 8px 0'
          }}>
            Dashboard
          </h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#94a3b8' : '#64748b',
            margin: 0
          }}>
            Acceso restringido
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontWeight: '700',
              marginBottom: '8px',
              color: isDark ? '#cbd5e0' : '#2d3748',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Ingresa la contraseña"
                style={{
                  width: '100%',
                  border: 'none',
                  padding: '14px 16px',
                  paddingRight: '46px',
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#2d3748' : '#f7fafc',
                  color: isDark ? '#e2e8f0' : '#1a202c',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.3s',
                  boxShadow: isDark ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)',
                  borderColor: error ? '#ef4444' : 'transparent'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(255, 195, 0, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = isDark ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#94a3b8' : '#64748b',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#FFC300'}
                onMouseLeave={(e) => e.target.style.color = isDark ? '#94a3b8' : '#64748b'}
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {error && (
              <p style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
              color: '#1a1a1a',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)'
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
            Acceder
          </button>
        </form>

        <p style={{
          fontSize: '12px',
          color: isDark ? '#64748b' : '#94a3b8',
          textAlign: 'center',
          marginTop: '20px',
          margin: '20px 0 0 0'
        }}>
          Acceso para administradores
        </p>
      </div>
    </div>
  )
}

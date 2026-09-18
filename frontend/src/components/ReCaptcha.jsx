import { useEffect, useRef } from 'react'

export default function ReCaptcha({ onVerify, isDark }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.warn('VITE_RECAPTCHA_SITE_KEY no está configurada')
      return
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: 'submit' }).then(token => {
        onVerify(token)
      })
    })
  }, [onVerify])

  return (
    <div ref={containerRef} style={{ fontSize: '11px', textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b', padding: '8px 0' }}>
      <a href="https://www.google.com/intl/es/policies/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</a>
      {' - '}
      <a href="https://www.google.com/intl/es/policies/terms/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</a>
      <br />
      Este sitio está protegido por reCAPTCHA y se aplican la
      <br />
      Política de Privacidad y los Términos de Servicio de Google.
    </div>
  )
}

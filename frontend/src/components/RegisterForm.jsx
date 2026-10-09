import { useState, useCallback, useEffect, useRef } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiAlertCircle, FiCheckCircle, FiX, FiCopy, FiCheck, FiDownload, FiSearch, FiUsers } from 'react-icons/fi'
import { QRCodeCanvas } from 'qrcode.react'
import ReferralSection from './ReferralSection'

const API_URL = import.meta.env.VITE_API_URL

export default function RegisterForm({ isDark }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+57',
    phone: '',
    identificationNumber: '',
    email: '',
    address: '',
    neighborhood: '',
    municipality: '',
    ageGroup: '',
    gender: '',
    populationType: '',
    acceptedTerms: false,
    referredById: '',
  })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [referralUrl, setReferralUrl] = useState('')
  const [referrerName, setReferrerName] = useState('')
  const [copied, setCopied] = useState(false)
  const qrRef = useRef(null)

  const [lookupCedula, setLookupCedula] = useState('')
  const [lookupResult, setLookupResult] = useState(null)
  const [lookupError, setLookupError] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupCopied, setLookupCopied] = useState(false)
  const lookupQrRef = useRef(null)

  const lookupReferralUrl = lookupResult
    ? `${window.location.origin}?referredBy=${lookupResult.id}&referrerName=${encodeURIComponent(lookupResult.fullName)}`
    : ''

  const copyLookupLink = async () => {
    try {
      await navigator.clipboard.writeText(lookupReferralUrl)
      setLookupCopied(true)
      setTimeout(() => setLookupCopied(false), 2000)
    } catch {
      /* noop */
    }
  }

  const checkReferrals = async () => {
    const cedula = lookupCedula.trim()
    setLookupResult(null)
    setLookupError('')

    if (!/^\d{5,15}$/.test(cedula)) {
      setLookupError('Ingresa una cédula válida (solo números).')
      return
    }

    setLookupLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/registrations/referrals/${cedula}`)
      const result = await response.json()
      if (response.ok && result.success) {
        setLookupResult(result.data)
      } else {
        setLookupError(result.error || 'No se encontró un registro con esa cédula.')
      }
    } catch {
      setLookupError('Error consultando. Intenta de nuevo.')
    } finally {
      setLookupLoading(false)
    }
  }

  const downloadQR = (ref, personName) => {
    const qrCanvas = ref.current?.querySelector('canvas')
    if (!qrCanvas) return

    const scale = 4
    const W = 440
    const H = 520
    const out = document.createElement('canvas')
    out.width = W * scale
    out.height = H * scale
    const ctx = out.getContext('2d')
    ctx.scale(scale, scale)
    ctx.textAlign = 'center'

    // Background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)

    // Top brand band
    ctx.fillStyle = '#003087'
    ctx.fillRect(0, 0, W, 90)
    ctx.fillStyle = '#FFC300'
    ctx.fillRect(0, 90, W, 6)

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = '800 28px Arial, sans-serif'
    ctx.fillText('Abelardistas Casanare', W / 2, 56)

    // QR (centered)
    const qrSize = 280
    const qrX = (W - qrSize) / 2
    const qrY = 130
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20)
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)

    // Name (shrink to fit)
    const name = personName || 'Abelardista'
    ctx.fillStyle = '#003087'
    let nameSize = 26
    ctx.font = `800 ${nameSize}px Arial, sans-serif`
    while (ctx.measureText(name).width > W - 40 && nameSize > 12) {
      nameSize -= 1
      ctx.font = `800 ${nameSize}px Arial, sans-serif`
    }
    ctx.fillText(name, W / 2, qrY + qrSize + 56)

    const safeName = (personName || 'abelardista')
      .toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const link = document.createElement('a')
    link.download = `qr-referido-${safeName}.png`
    link.href = out.toDataURL('image/png')
    link.click()
  }
  const [municipalities, setMunicipalities] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/registrations/municipalities`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setMunicipalities(data.data)
      })
      .catch(err => console.error('Error fetching municipalities:', err))
  }, [])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying:', err)
    }
  }

  const validateField = (name, value) => {
    let error = ''
    const requiredFields = ['fullName', 'phone', 'identificationNumber', 'email', 'address', 'neighborhood', 'municipality', 'ageGroup', 'gender', 'populationType']
    if (!value && requiredFields.includes(name)) {
      error = 'Campo requerido'
    }
    if (name === 'fullName' && value && value.length < 3) error = 'Mínimo 3 caracteres'
    else if (name === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) error = 'Email inválido'
    else if (name === 'phone' && value && (value.length < 7 || value.length > 15)) error = 'Entre 7 y 15 dígitos'
    else if (name === 'identificationNumber' && value && value.length < 5) error = 'Mínimo 5 caracteres'
    else if (name === 'address' && value && value.length < 5) error = 'Mínimo 5 caracteres'
    else if (name === 'neighborhood' && value && value.length < 2) error = 'Mínimo 2 caracteres'
    return error
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: newValue }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, newValue) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const fieldLabels = {
    fullName: 'Nombre Completo', phone: 'Teléfono',
    identificationNumber: 'Número de documento', email: 'Email', address: 'Dirección',
    neighborhood: 'Barrio o Vereda', municipality: 'Municipio', ageGroup: 'Edad', gender: 'Género',
    populationType: 'Tipo de población',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requiredFields = Object.keys(fieldLabels)
    const newErrors = {}
    const newTouched = {}
    requiredFields.forEach(field => {
      newTouched[field] = true
      const err = validateField(field, formData[field])
      if (err) newErrors[field] = err
    })
    setTouched(prev => ({ ...prev, ...newTouched }))
    setErrors(prev => ({ ...prev, ...newErrors }))

    const missing = requiredFields.filter(field => newErrors[field])
    if (missing.length > 0 || !formData.acceptedTerms) {
      const parts = []
      if (missing.length > 0) {
        parts.push(`Faltan o son inválidos: ${missing.map(f => fieldLabels[f]).join(', ')}`)
      }
      if (!formData.acceptedTerms) {
        parts.push('Debes aceptar los términos y condiciones')
      }
      setMessage({ type: 'error', title: 'Revisa el formulario', text: parts.join('. ') })
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, department: 'Casanare' })
      })

      if (response.ok) {
        const result = await response.json()
        const url = `${window.location.origin}?referredBy=${result.id}&referrerName=${encodeURIComponent(formData.fullName)}`
        setReferralUrl(url)
        setReferrerName(formData.fullName)
        setMessage({ type: 'success', title: '¡Registro exitoso!', text: 'Comparte tu enlace de referido:' })
        setFormData({
          fullName: '', countryCode: '+57', phone: '',
          identificationNumber: '', email: '', address: '', neighborhood: '', municipality: '',
          ageGroup: '', gender: '', populationType: '', acceptedTerms: false, referredById: '',
        })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', title: 'No se pudo registrar', text: error.error || 'Verifica los datos e intenta de nuevo.' })
      }
    } catch (err) {
      setMessage({ type: 'error', title: 'Algo salió mal', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    border: 'none',
    padding: '14px 16px',
    borderRadius: '12px',
    backgroundColor: isDark ? '#2d3748' : '#f7fafc',
    color: isDark ? '#e2e8f0' : '#1a202c',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDark ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)',
  }

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '700',
    marginBottom: '10px',
    color: isDark ? '#cbd5e0' : '#2d3748',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    cursor: 'pointer',
    paddingRight: '40px',
    color: isDark ? '#e2e8f0' : '#1a202c',
  }

  return (
    <section id="unete" style={{
      padding: 'clamp(60px, 10vw, 100px) 5vw',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 100%)',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 7vw, 52px)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            ÚNETE A LA COMUNIDAD
          </h2>
          <p style={{
            fontSize: '16px',
            color: isDark ? '#94a3b8' : '#64748b',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Registrate ahora y sé parte de nuestro movimiento
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(32px, 6vw, 48px)',
          borderRadius: '20px',
          boxShadow: isDark
            ? '0 20px 60px rgba(0, 0, 0, 0.3)'
            : '0 20px 60px rgba(0, 0, 0, 0.08)',
          border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(255, 195, 0, 0.15)'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fadeIn 0.6s ease-out'
        }}>

          {/* Row 1 - Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <InputField
              icon={FiUser}
              label="Nombre Completo"
              required
              name="fullName"
              placeholder="Juan García López"
              value={formData.fullName}
              error={errors.fullName}
              touched={touched.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              isDark={isDark}
            />
            <InputField
              icon={FiMail}
              label="Email"
              required
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              isDark={isDark}
            />
          </div>

          {/* Row 2 - Phone & Document number */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 0.4fr) 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Código</label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+34">🇪🇸 +34</option>
                </select>
              </div>
              <InputField
                icon={FiPhone}
                label="Teléfono"
                required
                name="phone"
                type="tel"
                placeholder="3001234567"
                value={formData.phone}
                error={errors.phone}
                touched={touched.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                inputStyle={inputStyle}
                labelStyle={labelStyle}
                isDark={isDark}
              />
            </div>
            <InputField
              icon={FiMapPin}
              label="Número de documento"
              required
              name="identificationNumber"
              placeholder="1023456789"
              value={formData.identificationNumber}
              error={errors.identificationNumber}
              touched={touched.identificationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              isDark={isDark}
            />
          </div>

          {/* Row 3 - Municipality & Age */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Municipio<span style={{ color: '#ef4444' }}> *</span></label>
              <select
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...selectStyle,
                  backgroundColor: errors.municipality && touched.municipality ? (isDark ? '#7f1d1d' : '#fee2e2') : selectStyle.backgroundColor,
                  borderLeft: errors.municipality && touched.municipality ? '4px solid #ef4444' : 'none',
                }}
              >
                <option value="">Seleccionar municipio...</option>
                {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.municipality && touched.municipality && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                  <FiAlertCircle size={14} /> {errors.municipality}
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>Edad<span style={{ color: '#ef4444' }}> *</span></label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle, appearance: 'none', cursor: 'pointer',
                  backgroundColor: errors.ageGroup && touched.ageGroup ? (isDark ? '#7f1d1d' : '#fee2e2') : inputStyle.backgroundColor,
                  borderLeft: errors.ageGroup && touched.ageGroup ? '4px solid #ef4444' : 'none',
                }}
              >
                <option value="">Rango de edad...</option>
                <option value="18-25">18 - 25 años</option>
                <option value="25-35">25 - 35 años</option>
                <option value="35-45">35 - 45 años</option>
                <option value="45-55">45 - 55 años</option>
                <option value="55+">55+ años</option>
              </select>
              {errors.ageGroup && touched.ageGroup && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                  <FiAlertCircle size={14} /> {errors.ageGroup}
                </div>
              )}
            </div>
          </div>

          {/* Row 4 - Address & Neighborhood */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <InputField
              icon={FiMapPin}
              label="Dirección"
              required
              name="address"
              placeholder="Calle 10 #5-30, Apartamento 401"
              value={formData.address}
              error={errors.address}
              touched={touched.address}
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              isDark={isDark}
            />
            <InputField
              icon={FiMapPin}
              label="Barrio o Vereda"
              required
              name="neighborhood"
              placeholder="Ej: Centro, Obrero, La Esmeralda"
              value={formData.neighborhood}
              error={errors.neighborhood}
              touched={touched.neighborhood}
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              isDark={isDark}
            />
          </div>

          {/* Row 5 - Gender & Population type */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Género<span style={{ color: '#ef4444' }}> *</span></label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...inputStyle, appearance: 'none', cursor: 'pointer',
                backgroundColor: errors.gender && touched.gender ? (isDark ? '#7f1d1d' : '#fee2e2') : inputStyle.backgroundColor,
                borderLeft: errors.gender && touched.gender ? '4px solid #ef4444' : 'none',
              }}
            >
              <option value="">Seleccionar...</option>
              <option value="Male">Hombre</option>
              <option value="Female">Mujer</option>
            </select>
            {errors.gender && touched.gender && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                <FiAlertCircle size={14} /> {errors.gender}
              </div>
            )}
          </div>

          {/* Population type */}
          <div>
            <label style={labelStyle}>Tipo de población<span style={{ color: '#ef4444' }}> *</span></label>
            <select
              name="populationType"
              value={formData.populationType}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...inputStyle, appearance: 'none', cursor: 'pointer',
                backgroundColor: errors.populationType && touched.populationType ? (isDark ? '#7f1d1d' : '#fee2e2') : inputStyle.backgroundColor,
                borderLeft: errors.populationType && touched.populationType ? '4px solid #ef4444' : 'none',
              }}
            >
              <option value="">Seleccionar...</option>
              <option value="Empresario">Empresario</option>
              <option value="Población víctima del conflicto">Población víctima del conflicto</option>
              <option value="Indígena">Indígena</option>
              <option value="Ninguna de las anteriores">Ninguna de las anteriores</option>
            </select>
            {errors.populationType && touched.populationType && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                <FiAlertCircle size={14} /> {errors.populationType}
              </div>
            )}
          </div>
          </div>

          {/* Referral */}
          <ReferralSection isDark={isDark} onChange={useCallback((data) => setFormData(prev => ({ ...prev, referredById: data.referredById || '' })), [])} />

          {/* Checkbox */}
          <div style={{
            background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.04)',
            padding: '16px 18px',
            borderRadius: '12px',
            borderLeft: '4px solid #FFC300',
            transition: 'all 0.3s'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0, fontWeight: '600', color: isDark ? '#e2e8f0' : '#1a202c' }}>
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#FFC300' }}
              />
              Acepto términos y condiciones
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
              color: '#1a202c',
              fontWeight: '700',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(15px, 3vw, 17px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: loading ? 0.7 : 1,
              transform: loading ? 'scale(0.98)' : 'scale(1)',
              boxShadow: !loading ? '0 10px 30px rgba(255, 195, 0, 0.3)' : 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => !loading && (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Registrando...' : 'REGISTRARME'}
          </button>

          {/* Message */}
          {message && (() => {
            const ok = message.type === 'success'
            const accent = ok ? '#22c55e' : '#ef4444'
            return (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '18px 20px',
              borderRadius: '14px',
              background: isDark
                ? (ok ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                : (ok ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.06)'),
              border: `1px solid ${ok ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`,
              borderLeft: `4px solid ${accent}`,
              boxShadow: isDark ? 'none' : '0 4px 16px rgba(0,0,0,0.05)',
              animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                flexShrink: 0,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: accent,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {ok ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                  {message.title && (
                    <div style={{ fontWeight: '800', fontSize: '15px', color: isDark ? '#f1f5f9' : '#1a202c', marginBottom: '4px' }}>
                      {message.title}
                    </div>
                  )}
                  <div style={{ fontSize: '14px', lineHeight: 1.5, color: isDark ? '#cbd5e0' : '#475569', marginBottom: ok && referralUrl ? '14px' : '0' }}>
                    {message.text}
                  </div>
                  {referralUrl && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.1)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        wordBreak: 'break-all',
                        fontFamily: 'monospace',
                        fontWeight: '500'
                      }}>
                        {referralUrl}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(referralUrl)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px 20px',
                          background: copied
                            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                            : 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '13px',
                          transition: 'all 0.3s',
                          width: 'fit-content',
                        }}
                      >
                        {copied ? (
                          <>
                            <FiCheck size={16} /> Copiado
                          </>
                        ) : (
                          <>
                            <FiCopy size={16} /> Copiar URL
                          </>
                        )}
                      </button>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                        <div ref={qrRef} style={{ background: '#fff', padding: '12px', borderRadius: '12px', lineHeight: 0 }}>
                          <QRCodeCanvas value={referralUrl} size={512} level="H" marginSize={1} style={{ width: '180px', height: '180px' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.8 }}>
                          Escanea o descarga tu código QR
                        </span>
                        <button
                          type="button"
                          onClick={() => downloadQR(qrRef, referrerName)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                            color: '#1a1a1a',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '13px',
                            transition: 'all 0.3s',
                            width: 'fit-content',
                          }}
                        >
                          <FiDownload size={16} /> Descargar QR
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
          )})()}
        </form>

        {/* Public referral lookup */}
        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.15)' : 'rgba(0, 48, 135, 0.12)'}`,
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '18px',
            fontWeight: '800',
            color: isDark ? '#e2e8f0' : '#1a202c',
            margin: '0 0 8px 0',
          }}>
            <FiUsers size={20} color="#FFC300" /> Consulta tus referidos
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: isDark ? '#94a3b8' : '#64748b' }}>
            Ingresa tu número de cédula para ver cuántas personas has referido.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 220px' }}>
              <FiSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#FFC300' }} />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Número de cédula"
                value={lookupCedula}
                onChange={(e) => setLookupCedula(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); checkReferrals() } }}
                style={{ ...inputStyle, paddingLeft: '44px' }}
              />
            </div>
            <button
              type="button"
              onClick={checkReferrals}
              disabled={lookupLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: lookupLoading ? 'default' : 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                opacity: lookupLoading ? 0.7 : 1,
                transition: 'all 0.3s',
              }}
            >
              {lookupLoading ? 'Consultando...' : 'Consultar'}
            </button>
          </div>

          {lookupError && (
            <div style={{
              marginTop: '14px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: isDark ? 'rgba(239, 68, 68, 0.12)' : '#fee2e2',
              color: isDark ? '#fca5a5' : '#991b1b',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <FiAlertCircle size={18} style={{ flexShrink: 0 }} /> {lookupError}
            </div>
          )}

          {lookupResult && (
            <div style={{
              marginTop: '14px',
              padding: '18px 20px',
              borderRadius: '12px',
              background: isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(0, 48, 135, 0.05)',
              border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.25)' : 'rgba(0, 48, 135, 0.15)'}`,
              animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: isDark ? '#cbd5e0' : '#64748b', fontWeight: '600' }}>
                {lookupResult.fullName}
              </p>
              <p style={{ margin: 0, fontSize: '15px', color: isDark ? '#e2e8f0' : '#1a202c' }}>
                Tienes{' '}
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#FFC300' }}>{lookupResult.referrals}</span>
                {' '}{lookupResult.referrals === 1 ? 'referido' : 'referidos'}.
              </p>

              {/* Recuperar link + QR para referir de nuevo */}
              <div style={{
                marginTop: '18px',
                paddingTop: '18px',
                borderTop: `1px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.12)'}`,
              }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: isDark ? '#e2e8f0' : '#1a202c' }}>
                  Tu enlace para referir:
                </p>
                <div style={{
                  background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.06)',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  color: isDark ? '#cbd5e0' : '#1a202c',
                }}>
                  {lookupReferralUrl}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '14px' }}>
                  <div ref={lookupQrRef} style={{ background: '#fff', padding: '12px', borderRadius: '12px', lineHeight: 0 }}>
                    <QRCodeCanvas value={lookupReferralUrl} size={512} level="H" marginSize={1} style={{ width: '180px', height: '180px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={copyLookupLink}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '10px 18px',
                        background: lookupCopied
                          ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                          : 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
                        color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
                        fontWeight: '700', fontSize: '13px', transition: 'all 0.3s',
                      }}
                    >
                      {lookupCopied ? <><FiCheck size={16} /> Copiado</> : <><FiCopy size={16} /> Copiar enlace</>}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadQR(lookupQrRef, lookupResult.fullName)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '10px 18px',
                        background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                        color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer',
                        fontWeight: '700', fontSize: '13px', transition: 'all 0.3s',
                      }}
                    >
                      <FiDownload size={16} /> Descargar QR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFC300' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 14px center;
            padding-right: 40px;
          }
          select option {
            background: #2d3748;
            color: #e2e8f0;
          }
          select option:checked {
            background: #FFC300;
            color: #1a1a1a;
          }
          input:focus, select:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 195, 0, 0.1), 0 4px 12px rgba(255, 195, 0, 0.2);
          }
        `}</style>
      </div>
    </section>
  )
}

function InputField({ icon: Icon, label, name, type = 'text', placeholder, value, error, touched, onChange, onBlur, inputStyle, labelStyle, isDark, required }) {
  return (
    <div>
      <label style={labelStyle}>
        <Icon size={16} style={{ opacity: 0.8 }} />
        {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          ...inputStyle,
          backgroundColor: error && touched
            ? (isDark ? '#7f1d1d' : '#fee2e2')
            : inputStyle.backgroundColor,
          borderLeft: error && touched ? '4px solid #ef4444' : 'none',
        }}
      />
      {error && touched && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
          <FiAlertCircle size={14} /> {error}
        </div>
      )}
    </div>
  )
}

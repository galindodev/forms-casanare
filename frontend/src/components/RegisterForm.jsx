import { useState, useCallback } from 'react'
import ReferralSection from './ReferralSection'

const API_URL = import.meta.env.VITE_API_URL

const fieldIcons = {
  fullName: '',
  countryCode: '',
  phone: '',
  identificationType: '',
  identificationNumber: '',
  email: '',
  address: '',
  municipality: '',
  ageGroup: '',
  gender: '',
}

export default function RegisterForm({ isDark }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+57',
    phone: '',
    identificationType: '',
    identificationNumber: '',
    email: '',
    address: '',
    municipality: '',
    ageGroup: '',
    gender: '',
    acceptedTerms: false,
    referredById: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const municipalities = [
    'Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey', 'Paz de Ariporo',
    'Maní', 'Orocué', 'Pore', 'Chámeza', 'Hato Corozal', 'La Salina', 'Nunchía',
    'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Trinidad'
  ]

  const validateField = (name, value) => {
    let error = ''

    // Campos requeridos
    const requiredFields = ['fullName', 'phone', 'identificationType', 'identificationNumber', 'email', 'address', 'municipality', 'ageGroup', 'gender']
    if (!value && requiredFields.includes(name)) {
      error = 'Campo requerido'
    }

    // Validaciones específicas
    if (name === 'fullName' && value && value.length < 3) {
      error = 'Mínimo 3 caracteres'
    } else if (name === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      error = 'Email inválido'
    } else if (name === 'phone' && value && (value.length < 7 || value.length > 15)) {
      error = 'Entre 7 y 15 dígitos'
    } else if (name === 'identificationNumber' && value && value.length < 5) {
      error = 'Mínimo 5 caracteres'
    } else if (name === 'address' && value && value.length < 5) {
      error = 'Mínimo 5 caracteres'
    } else if (name === 'countryCode' && !value) {
      error = 'Selecciona un código'
    }

    return error
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, newValue)
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }))
  }

  const isFormValid = () => {
    const requiredFields = ['fullName', 'phone', 'identificationType', 'identificationNumber', 'email', 'address', 'municipality', 'ageGroup', 'gender']
    const hasErrors = Object.values(errors).some(error => error)
    const allFieldsFilled = requiredFields.every(field => formData[field])
    const termsAccepted = formData.acceptedTerms

    return allFieldsFilled && !hasErrors && termsAccepted
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      setMessage('❌ Por favor completa todos los campos correctamente')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          department: 'Casanare'
        })
      })

      if (response.ok) {
        setMessage('✅ ¡Bienvenido! Tu registro ha sido exitoso.')
        setFormData({
          fullName: '', countryCode: '+57', phone: '', identificationType: '',
          identificationNumber: '', email: '', address: '', municipality: '',
          ageGroup: '', gender: '', acceptedTerms: false, referredById: '',
        })
      } else {
        const error = await response.json()
        setMessage(`❌ Error: ${error.error || 'No se pudo registrar'}`)
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    border: `2px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    padding: '12px 14px',
    borderRadius: '8px',
    backgroundColor: isDark ? '#1e293b' : '#fff',
    color: isDark ? '#f5f5f5' : '#000',
    fontSize: '14px',
    transition: 'all 0.2s'
  }

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
    marginBottom: '8px',
    color: isDark ? '#f5f5f5' : '#000',
    fontSize: '14px'
  }

  return (
    <section id="unete" style={{ padding: 'clamp(40px, 8vw, 80px) 5vw', backgroundColor: isDark ? '#1e293b' : '#f9fafb', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 'bold', color: '#003087', textAlign: 'center', marginBottom: 'clamp(30px, 6vw, 48px)' }}>✨ ÚNETE A LA COMUNIDAD</h2>
        <form onSubmit={handleSubmit} style={{
          background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: `1px solid ${isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(255, 195, 0, 0.2)'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'all 0.3s'
        }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Nombre Completo *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Juan García López"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderColor: errors.fullName && touched.fullName ? '#ef4444' : inputStyle.borderColor
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFC300'}
              />
              {errors.fullName && touched.fullName && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.fullName}</p>}
            </div>

            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderColor: errors.email && touched.email ? '#ef4444' : inputStyle.borderColor
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFC300'}
              />
              {errors.email && touched.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.email}</p>}
            </div>
          </div>

          {/* Row 2 - Teléfono */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 0.3fr) 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Código *</label>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  cursor: 'pointer',
                  paddingRight: '30px'
                }}
              >
                <option value="+57">🇨🇴 +57</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+34">🇪🇸 +34</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Teléfono *</label>
              <input
                type="tel"
                name="phone"
                placeholder="3001234567"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderColor: errors.phone && touched.phone ? '#ef4444' : inputStyle.borderColor
                }}
              />
              {errors.phone && touched.phone && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.phone}</p>}
            </div>
          </div>

          {/* Row 3 - Identificación */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Tipo de ID *</label>
              <select
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  cursor: 'pointer',
                  paddingRight: '30px',
                  borderColor: errors.identificationType && touched.identificationType ? '#ef4444' : inputStyle.borderColor
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="CC">Cédula Ciudadanía</option>
                <option value="CE">Cédula Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
              {errors.identificationType && touched.identificationType && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.identificationType}</p>}
            </div>

            <div>
              <label style={labelStyle}>Número ID *</label>
              <input
                type="text"
                name="identificationNumber"
                placeholder="1023456789"
                value={formData.identificationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderColor: errors.identificationNumber && touched.identificationNumber ? '#ef4444' : inputStyle.borderColor
                }}
              />
              {errors.identificationNumber && touched.identificationNumber && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.identificationNumber}</p>}
            </div>
          </div>

          {/* Row 4 */}
          <div>
            <label style={labelStyle}>Dirección *</label>
            <input
              type="text"
              name="address"
              placeholder="Calle 10 #5-30, Apartamento 401"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                borderColor: errors.address && touched.address ? '#ef4444' : inputStyle.borderColor
              }}
            />
            {errors.address && touched.address && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ {errors.address}</p>}
          </div>

          {/* Row 5 - Municipio y Edad */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Municipio *</label>
              <select
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  cursor: 'pointer',
                  paddingRight: '30px',
                  borderColor: errors.municipality && touched.municipality ? '#ef4444' : inputStyle.borderColor
                }}
              >
                <option value="">Seleccionar municipio...</option>
                {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Edad *</label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  cursor: 'pointer',
                  paddingRight: '30px',
                  borderColor: errors.ageGroup && touched.ageGroup ? '#ef4444' : inputStyle.borderColor
                }}
              >
                <option value="">Rango de edad...</option>
                <option value="18-25">18 - 25 años</option>
                <option value="25-35">25 - 35 años</option>
                <option value="35-45">35 - 45 años</option>
                <option value="45-55">45 - 55 años</option>
                <option value="55+">55+ años</option>
              </select>
            </div>
          </div>

          {/* Row 6 - Género */}
          <div>
            <label style={labelStyle}>Género *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                appearance: 'none',
                cursor: 'pointer',
                paddingRight: '30px',
                borderColor: errors.gender && touched.gender ? '#ef4444' : inputStyle.borderColor
              }}
            >
              <option value="">Seleccionar...</option>
              <option value="Male">Hombre</option>
              <option value="Female">Mujer</option>
            </select>
          </div>

          {/* Referral */}
          <ReferralSection isDark={isDark} onChange={useCallback((data) => setFormData(prev => ({ ...prev, referredById: data.referredById || '' })), [])} />

          {/* Checkbox */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', backgroundColor: isDark ? '#0f172a' : '#f1f5f9', borderRadius: '8px', border: !formData.acceptedTerms && touched.acceptedTerms ? '2px solid #ef4444' : 'none' }}>
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                onBlur={() => setTouched(prev => ({ ...prev, acceptedTerms: true }))}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#FFC300' }}
              />
              <label style={{ fontWeight: '600', margin: 0, cursor: 'pointer', color: isDark ? '#f5f5f5' : '#000' }}>
                Acepto términos y condiciones *
              </label>
            </div>
            {!formData.acceptedTerms && touched.acceptedTerms && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>⚠️ Debes aceptar los términos</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isFormValid()}
            style={{
              width: '100%',
              backgroundColor: isFormValid() ? '#FFC300' : '#ccc',
              color: '#1a1a1a',
              fontWeight: '700',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading || !isFormValid() ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
              transition: 'all 0.2s',
              opacity: loading || !isFormValid() ? 0.6 : 1,
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
            onMouseEnter={(e) => isFormValid() && !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => isFormValid() && !loading && (e.target.style.transform = 'scale(1)')}
            title={!isFormValid() ? 'Completa todos los campos requeridos' : ''}
          >
            {loading ? 'Registrando...' : 'REGISTRARME'}
          </button>

          {message && (
            <div style={{ padding: '14px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b', animation: 'slideIn 0.3s ease-out' }}>
              {message}
            </div>
          )}
        </form>

        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFC300' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            padding-right: 30px;
          }
        `}</style>
      </div>
    </section>
  )
}

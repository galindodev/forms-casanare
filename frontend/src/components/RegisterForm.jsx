import { useState, useCallback, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiAlertCircle, FiCheckCircle, FiX, FiCopy, FiCheck } from 'react-icons/fi'
import ReferralSection from './ReferralSection'

const API_URL = import.meta.env.VITE_API_URL

export default function RegisterForm({ isDark }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+57',
    phone: '',
    identificationType: '',
    identificationNumber: '',
    email: '',
    address: '',
    neighborhood: '',
    municipality: '',
    ageGroup: '',
    gender: '',
    acceptedTerms: false,
    referredById: '',
  })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [referralUrl, setReferralUrl] = useState('')
  const [copied, setCopied] = useState(false)
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
    const requiredFields = ['fullName', 'phone', 'identificationType', 'identificationNumber', 'email', 'address', 'neighborhood', 'municipality', 'ageGroup', 'gender']
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

  const isFormValid = () => {
    const requiredFields = ['fullName', 'phone', 'identificationType', 'identificationNumber', 'email', 'address', 'neighborhood', 'municipality', 'ageGroup', 'gender']
    const hasErrors = Object.values(errors).some(error => error)
    const allFieldsFilled = requiredFields.every(field => formData[field])
    return allFieldsFilled && !hasErrors && formData.acceptedTerms
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid()) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos correctamente' })
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
        setMessage({ type: 'success', text: '¡Bienvenido! Comparte tu URL de referido:' })
        setFormData({
          fullName: '', countryCode: '+57', phone: '', identificationType: '',
          identificationNumber: '', email: '', address: '', neighborhood: '', municipality: '',
          ageGroup: '', gender: '', acceptedTerms: false, referredById: '',
        })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: `Error: ${error.error || 'No se pudo registrar'}` })
      }
    } catch (err) {
      setMessage({ type: 'error', text: `Error: ${err.message}` })
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
          gap: '28px',
          animation: 'fadeIn 0.6s ease-out'
        }}>

          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <InputField
              icon={FiUser}
              label="Nombre Completo"
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

          {/* Row 2 - Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 0.35fr) 1fr', gap: '16px' }}>
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

          {/* Row 3 - ID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Tipo de ID</label>
              <select
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...selectStyle,
                  borderColor: errors.identificationType && touched.identificationType ? '#ef4444' : 'transparent',
                  backgroundColor: errors.identificationType && touched.identificationType
                    ? (isDark ? '#7f1d1d' : '#fee2e2')
                    : selectStyle.backgroundColor
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="CC">Cédula Ciudadanía</option>
                <option value="CE">Cédula Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
              {errors.identificationType && touched.identificationType && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                  <FiAlertCircle size={14} /> {errors.identificationType}
                </div>
              )}
            </div>

            <InputField
              icon={FiMapPin}
              label="Número ID"
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

          {/* Row 4 - Municipality & Age */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Municipio</label>
              <select
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                onBlur={handleBlur}
                style={selectStyle}
              >
                <option value="">Seleccionar municipio...</option>
                {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Edad</label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
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

          {/* Row 4.5 - Address */}
          <InputField
            icon={FiMapPin}
            label="Dirección"
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

          {/* Row 5 - Neighborhood */}
          <InputField
            icon={FiMapPin}
            label="Barrio o Vereda"
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

          {/* Row 6 - Gender */}
          <div>
            <label style={labelStyle}>Género</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Seleccionar...</option>
              <option value="Male">Hombre</option>
              <option value="Female">Mujer</option>
              <option value="Other">Prefiero no decirlo</option>
            </select>
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
            disabled={loading || !isFormValid()}
            style={{
              width: '100%',
              background: isFormValid()
                ? 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)'
                : 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)',
              color: '#1a202c',
              fontWeight: '700',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: loading || !isFormValid() ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(15px, 3vw, 17px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: loading || !isFormValid() ? 0.7 : 1,
              transform: loading ? 'scale(0.98)' : 'scale(1)',
              boxShadow: isFormValid() && !loading
                ? '0 10px 30px rgba(255, 195, 0, 0.3)'
                : 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) => isFormValid() && !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => isFormValid() && !loading && (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Registrando...' : 'REGISTRARME'}
          </button>

          {/* Message */}
          {message && (
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: message.type === 'success'
                ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
                : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              color: message.type === 'success' ? '#166534' : '#991b1b',
              animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `2px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                {message.type === 'success' ? (
                  <FiCheckCircle size={24} style={{ marginTop: '2px', flexShrink: 0 }} />
                ) : (
                  <FiX size={24} style={{ marginTop: '2px', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', marginBottom: message.type === 'success' && referralUrl ? '14px' : '0' }}>
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>

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

function InputField({ icon: Icon, label, name, type = 'text', placeholder, value, error, touched, onChange, onBlur, inputStyle, labelStyle, isDark }) {
  return (
    <div>
      <label style={labelStyle}>
        <Icon size={16} style={{ opacity: 0.8 }} />
        {label}
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

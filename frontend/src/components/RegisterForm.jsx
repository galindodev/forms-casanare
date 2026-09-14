import { useState } from 'react'
import ReferralSection from './ReferralSection'

const API_URL = 'https://7qymrivws0.execute-api.us-east-1.amazonaws.com/dev'

export default function RegisterForm() {
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

  const municipalities = [
    'Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey', 'Paz de Ariporo',
    'Maní', 'Orocué', 'Pore', 'Chámeza', 'Hato Corozal', 'La Salina', 'Nunchía',
    'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Trinidad'
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleReferralChange = (data) => {
    setFormData(prev => ({
      ...prev,
      referredById: data.referredById || ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        setMessage('¡Bienvenido! Tu registro ha sido exitoso.')
        setFormData({
          fullName: '', countryCode: '+57', phone: '', identificationType: '',
          identificationNumber: '', email: '', address: '', municipality: '',
          ageGroup: '', gender: '', acceptedTerms: false, referredById: '',
        })
      } else {
        const error = await response.json()
        setMessage(`Error: ${error.error || 'No se pudo registrar'}`)
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="unete" className="py-20 px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold text-accent-blue text-center mb-12">ÚNETE A LA COMUNIDAD</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label className="block font-semibold mb-2">Nombres Completos *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Indicativo *</label>
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary">
                <option value="+57">+57 (Colombia)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+34">+34 (España)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Teléfono *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Tipo de Identificación *</label>
              <select name="identificationType" value={formData.identificationType} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary">
                <option value="">Seleccionar...</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Número de ID *</label>
              <input type="text" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block font-semibold mb-2">Dirección *</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block font-semibold mb-2">Municipio *</label>
            <select name="municipality" value={formData.municipality} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary">
              <option value="">Seleccionar...</option>
              {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Grupo de Edad *</label>
              <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary">
                <option value="">Seleccionar...</option>
                <option value="18-25">18 - 25</option>
                <option value="25-35">25 - 35</option>
                <option value="35-45">35 - 45</option>
                <option value="45-55">45 - 55</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Género *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-primary">
                <option value="">Seleccionar...</option>
                <option value="Male">Hombre</option>
                <option value="Female">Mujer</option>
              </select>
            </div>
          </div>

          <ReferralSection onChange={handleReferralChange} />

          <div className="flex items-center gap-3">
            <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} required className="w-5 h-5" />
            <label className="font-semibold">Acepto términos y condiciones *</label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50">
            {loading ? 'Registrando...' : 'REGISTRARME'}
          </button>

          {message && (
            <div className={`p-4 rounded text-center font-semibold ${message.includes('exitoso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

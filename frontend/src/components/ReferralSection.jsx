import { useState, useEffect, memo } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function ReferralSection({ onChange, isDark }) {
  const [referredById, setReferredById] = useState('')
  const [referrerName, setReferrerName] = useState('')
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlReferrerId = params.get('referredBy')

    if (urlReferrerId) {
      setReferredById(urlReferrerId)
      setReferrerName(urlReferrerId)
      onChange?.({ referredById: urlReferrerId })
      setLoading(false)
    } else {
      fetchUsers()
    }
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/registrations`)
      const result = await response.json()
      if (result.success && result.data) {
        setUsers(result.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim().length >= 2) {
      const filtered = users.filter(u =>
        u.fullName.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredUsers(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setFilteredUsers([])
      setShowDropdown(false)
    }
  }

  const selectUser = (user) => {
    setReferredById(user.id)
    setReferrerName(user.fullName)
    setSearchTerm('')
    setShowDropdown(false)
    onChange?.({ referredById: user.id })
  }

  const clearSelection = () => {
    setReferredById('')
    setReferrerName('')
    setSearchTerm('')
    onChange?.({ referredById: '' })
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '16px' }}>Cargando...</div>

  if (referredById) {
    return (
      <div style={{ backgroundColor: isDark ? 'rgba(30, 58, 138, 0.2)' : 'rgba(0, 48, 135, 0.1)', padding: '16px', borderRadius: '8px', border: `2px solid #003087` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#4b5563' }}>Referido por:</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#003087' }}>{referrerName}</p>
          </div>
          <button
            type="button"
            onClick={clearSelection}
            style={{ color: '#dc2626', fontSize: '14px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Cambiar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <label style={{ fontWeight: '600', marginBottom: '8px', color: isDark ? '#f5f5f5' : '#000', fontSize: '14px', display: 'block' }}>
        ¿Quién te refirió? (Opcional)
      </label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="Busca por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm && setShowDropdown(true)}
          style={{ width: '100%', border: `2px solid ${isDark ? '#475569' : '#e2e8f0'}`, paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', backgroundColor: isDark ? '#1e293b' : '#fff', color: isDark ? '#f5f5f5' : '#000' }}
        />
      </div>

      {showDropdown && filteredUsers.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10, maxHeight: '240px', overflowY: 'auto' }}>
          {filteredUsers.map(user => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectUser(user)}
              style={{ width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', borderBottom: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <p style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{user.fullName}</p>
            </button>
          ))}
        </div>
      )}

      {showDropdown && filteredUsers.length === 0 && searchTerm && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10, padding: '16px', textAlign: 'center', color: '#4b5563' }}>
          No se encontraron usuarios
        </div>
      )}
    </div>
  )
}

export default memo(ReferralSection)

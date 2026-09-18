import { useState, useEffect, memo } from 'react'
import { FiSearch, FiX, FiUser } from 'react-icons/fi'

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
    const urlReferrerName = params.get('referrerName')

    if (urlReferrerId) {
      setReferredById(urlReferrerId)
      setReferrerName(urlReferrerName || urlReferrerId)
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

  const inputStyle = {
    width: '100%',
    border: 'none',
    padding: '14px 16px 14px 44px',
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

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: isDark ? '#94a3b8' : '#64748b',
        fontWeight: '500'
      }}>
        Cargando referidos...
      </div>
    )
  }

  if (referredById) {
    return (
      <div style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)'
          : 'linear-gradient(135deg, rgba(0, 48, 135, 0.1) 0%, rgba(0, 102, 204, 0.08) 100%)',
        padding: 'clamp(20px, 4vw, 28px)',
        borderRadius: '12px',
        border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.3)'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
            padding: '10px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 195, 0, 0.2)'
          }}>
            <FiUser size={18} color="#1a1a1a" style={{ fontWeight: 'bold' }} />
          </div>
          <div>
            <p style={{
              fontSize: '12px',
              color: isDark ? '#94a3b8' : '#64748b',
              margin: '0 0 4px 0',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              Referido por:
            </p>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '800',
              color: isDark ? '#FFC300' : '#003087',
              margin: 0
            }}>
              {referrerName}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)'
          }}
        >
          <FiX size={16} /> Cambiar
        </button>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>
        <FiUser size={16} style={{ opacity: 0.8 }} />
        ¿Quién te refirió? (Opcional)
      </label>

      <div style={{ position: 'relative' }}>
        <FiSearch
          size={18}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isDark ? '#94a3b8' : '#64748b',
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />
        <input
          type="text"
          placeholder="Busca por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          style={{
            ...inputStyle,
            position: 'relative',
            zIndex: 1
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowDropdown(false)
              setSearchTerm('')
            }
          }}
        />
      </div>

      {showDropdown && filteredUsers.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #fff 0%, #f7fafc 100%)',
          border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
          borderRadius: '12px',
          boxShadow: isDark
            ? '0 12px 40px rgba(0, 0, 0, 0.3)'
            : '0 12px 40px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          maxHeight: '300px',
          overflowY: 'auto',
          marginTop: '8px',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {filteredUsers.map((user, index) => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectUser(user)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '14px 16px',
                border: 'none',
                borderBottom: index < filteredUsers.length - 1 ? `1px solid ${isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(0, 48, 135, 0.1)'}` : 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(0, 48, 135, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
              }}
            >
              <FiUser size={16} color="#FFC300" />
              <p style={{
                fontWeight: '600',
                color: isDark ? '#e2e8f0' : '#1a202c',
                margin: 0,
                fontSize: '14px'
              }}>
                {user.fullName}
              </p>
            </button>
          ))}
        </div>
      )}

      {showDropdown && filteredUsers.length === 0 && searchTerm && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #fff 0%, #f7fafc 100%)',
          border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
          borderRadius: '12px',
          boxShadow: isDark
            ? '0 12px 40px rgba(0, 0, 0, 0.3)'
            : '0 12px 40px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          padding: '20px',
          textAlign: 'center',
          color: isDark ? '#94a3b8' : '#64748b',
          marginTop: '8px',
          fontWeight: '500'
        }}>
          No se encontraron usuarios
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default memo(ReferralSection)

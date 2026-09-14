import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

const API_URL = 'https://7qymrivws0.execute-api.us-east-1.amazonaws.com/dev'

export default function ReferralSection({ onChange }) {
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
      onChange({ referredById: urlReferrerId })
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
    if (term.trim()) {
      const filtered = users.filter(u =>
        u.fullName.toLowerCase().includes(term.toLowerCase()) ||
        u.email.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredUsers(filtered)
      setShowDropdown(true)
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
    onChange({ referredById: user.id })
  }

  const clearSelection = () => {
    setReferredById('')
    setReferrerName('')
    setSearchTerm('')
    onChange({ referredById: '' })
  }

  if (loading) return <div className="text-center py-4">Cargando...</div>

  if (referredById) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border border-accent-blue">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Referido por:</p>
            <p className="text-lg font-bold text-accent-blue">{referrerName}</p>
          </div>
          <button
            type="button"
            onClick={clearSelection}
            className="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Cambiar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <label className="block font-semibold mb-2">¿Quién te refirió? (Opcional)</label>
      <div className="relative">
        <FaSearch className="absolute left-4 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Busca por nombre o correo..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm && setShowDropdown(true)}
          className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      {showDropdown && filteredUsers.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredUsers.map(user => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectUser(user)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
            >
              <p className="font-semibold text-dark">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </button>
          ))}
        </div>
      )}

      {showDropdown && filteredUsers.length === 0 && searchTerm && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-10 p-4 text-center text-gray-600">
          No se encontraron usuarios
        </div>
      )}
    </div>
  )
}

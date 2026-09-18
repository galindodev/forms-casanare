import { useState, useEffect } from 'react'
import { FiDownload, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard({ isDark, onLogout }) {
  const [registrations, setRegistrations] = useState([])
  const [topReferrers, setTopReferrers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedRows, setExpandedRows] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/registrations`)
      const data = await response.json()
      if (data.success && data.data) {
        setRegistrations(data.data)
        calculateTopReferrers(data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateTopReferrers = (regs) => {
    const referrerMap = {}
    regs.forEach(reg => {
      if (reg.fullName) {
        referrerMap[reg.fullName] = (referrerMap[reg.fullName] || 0) + 1
      }
    })
    const sorted = Object.entries(referrerMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    setTopReferrers(sorted)
  }

  const downloadExcel = async () => {
    try {
      const response = await fetch(`${API_URL}/api/registrations/excel`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `registrations_${new Date().toISOString().split('T')[0]}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading Excel:', error)
    }
  }

  const filteredRegistrations = registrations.filter(reg =>
    reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 100%)',
      padding: 'clamp(40px, 5vw, 60px)',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Dashboard Registrados
          </h1>
          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'all 0.3s',
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
            <FiLogOut size={18} /> Salir
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {/* Stats */}
          <div style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            padding: '24px',
            borderRadius: '12px',
            border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
            textAlign: 'center'
          }}>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', margin: '0 0 8px 0', fontWeight: '600' }}>Total Registrados</p>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#FFC300', margin: 0 }}>{registrations.length}</p>
          </div>
          <div style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            padding: '24px',
            borderRadius: '12px',
            border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
            textAlign: 'center'
          }}>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', margin: '0 0 8px 0', fontWeight: '600' }}>Con Referidor</p>
            <p style={{ fontSize: '32px', fontWeight: '900', color: '#FFC300', margin: 0 }}>{registrations.filter(r => r.referredById).length}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }} >
          {/* Top Referrers */}
          <div style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            padding: '24px',
            borderRadius: '12px',
            border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFC300', marginTop: 0, marginBottom: '16px' }}>Top Referrers</h3>
            {topReferrers.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topReferrers.map((ref, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(0, 48, 135, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <p style={{ margin: 0, fontWeight: '600', color: isDark ? '#e2e8f0' : '#1a202c' }}>{ref.name}</p>
                    <span style={{
                      background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                      color: '#1a1a1a',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontWeight: '700',
                      fontSize: '12px'
                    }}>
                      {ref.count} referidos
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: isDark ? '#94a3b8' : '#64748b', margin: 0 }}>Sin referidos aún</p>
            )}
          </div>

          {/* Export */}
          <div style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            padding: '24px',
            borderRadius: '12px',
            border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFC300', margin: 0 }}>Exportar Datos</h3>
            <button
              onClick={downloadExcel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)',
                color: '#1a1a1a',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '700',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 6px 16px rgba(255, 195, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 4px 12px rgba(255, 195, 0, 0.3)'
              }}
            >
              <FiDownload size={18} /> Descargar Excel
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isDark ? '#2d3748' : '#f7fafc',
              color: isDark ? '#e2e8f0' : '#1a202c',
              fontSize: '14px',
              boxShadow: isDark ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(255, 195, 0, 0.1)'}
            onBlur={(e) => e.target.style.boxShadow = isDark ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)'}
          />
        </div>

        {/* Table */}
        <div style={{
          background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          border: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.2)' : 'rgba(0, 48, 135, 0.2)'}`,
          overflow: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{
                background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(0, 48, 135, 0.08)',
                borderBottom: `2px solid ${isDark ? 'rgba(255, 195, 0, 0.1)' : 'rgba(0, 48, 135, 0.1)'}`
              }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300', width: '40px' }}></th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Nombre</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300', display: 'none', '@media (min-width: 768px)': { display: 'table-cell' } }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>Teléfono</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>Municipio</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}>Cargando...</td>
                </tr>
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg, i) => (
                  <tbody key={i}>
                    <tr
                      style={{
                        borderBottom: `1px solid ${isDark ? 'rgba(255, 195, 0, 0.05)' : 'rgba(0, 48, 135, 0.05)'}`,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255, 195, 0, 0.05)' : 'rgba(0, 48, 135, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setExpandedRows({...expandedRows, [i]: !expandedRows[i]})}>
                        <span style={{ color: '#FFC300', fontWeight: 'bold' }}>{expandedRows[i] ? '−' : '+'}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#e2e8f0' : '#1a202c', fontWeight: '600' }}>{reg.fullName}</td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b', display: 'none', '@media (min-width: 768px)': { display: 'table-cell' } }}>{reg.email}</td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>{reg.countryCode} {reg.phone}</td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>{reg.municipality}</td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b', display: 'none', '@media (min-width: 1024px)': { display: 'table-cell' } }}>{reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('es-CO') : '-'}</td>
                    </tr>
                    {expandedRows[i] && (
                      <tr style={{ background: isDark ? 'rgba(255, 195, 0, 0.03)' : 'rgba(0, 48, 135, 0.02)' }}>
                        <td></td>
                        <td colSpan="5" style={{ padding: '16px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <p style={{ margin: '0 0 4px 0', color: '#FFC300', fontWeight: '700', fontSize: '12px' }}>EMAIL</p>
                              <p style={{ margin: 0, color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.email}</p>
                            </div>
                            <div>
                              <p style={{ margin: '0 0 4px 0', color: '#FFC300', fontWeight: '700', fontSize: '12px' }}>TELÉFONO</p>
                              <p style={{ margin: 0, color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.countryCode} {reg.phone}</p>
                            </div>
                            <div>
                              <p style={{ margin: '0 0 4px 0', color: '#FFC300', fontWeight: '700', fontSize: '12px' }}>MUNICIPIO</p>
                              <p style={{ margin: 0, color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.municipality}</p>
                            </div>
                            <div>
                              <p style={{ margin: '0 0 4px 0', color: '#FFC300', fontWeight: '700', fontSize: '12px' }}>FECHA</p>
                              <p style={{ margin: 0, color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('es-CO') : '-'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}>No hay registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

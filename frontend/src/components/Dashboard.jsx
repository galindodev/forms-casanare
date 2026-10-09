import { useState, useEffect, Fragment } from 'react'
import { FiDownload, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard({ isDark, onLogout }) {
  const [registrations, setRegistrations] = useState([])
  const [topReferrers, setTopReferrers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedRows, setExpandedRows] = useState({})
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.identificationNumber?.includes(searchTerm)
  )

  const colCount = isMobile ? 3 : 8
  // Keys already shown in the main row — the expand only reveals the rest
  const visibleKeys = new Set(
    isMobile
      ? ['fullName', 'referralCount']
      : ['fullName', 'identificationNumber', 'email', 'phone', 'municipality', 'referralCount', 'createdAt']
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }} >
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
                {!isMobile && <>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Documento</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Teléfono</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Municipio</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#FFC300' }}>Referidos</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', color: '#FFC300' }}>Fecha</th>
                </>}
                {isMobile && <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', color: '#FFC300' }}>Ref.</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={colCount} style={{ padding: '24px', textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}>Cargando...</td>
                </tr>
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg, i) => (
                  <Fragment key={i}>
                    <tr
                      style={{
                        borderBottom: `1px solid ${isDark ? 'rgba(255, 195, 0, 0.05)' : 'rgba(0, 48, 135, 0.05)'}`,
                        transition: 'background 0.2s',
                        cursor: 'pointer'
                      }}
                      onClick={() => setExpandedRows({...expandedRows, [i]: !expandedRows[i]})}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255, 195, 0, 0.05)' : 'rgba(0, 48, 135, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{ color: '#FFC300', fontWeight: 'bold' }}>{expandedRows[i] ? '−' : '+'}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: isDark ? '#e2e8f0' : '#1a202c', fontWeight: '600' }}>{reg.fullName}</td>
                      {!isMobile && <>
                        <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.identificationNumber}</td>
                        <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.email}</td>
                        <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.countryCode} {reg.phone}</td>
                        <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.municipality}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}><ReferralBadge count={reg.referralCount} /></td>
                        <td style={{ padding: '14px 16px', color: isDark ? '#cbd5e0' : '#64748b' }}>{reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('es-CO') : '-'}</td>
                      </>}
                      {isMobile && <td style={{ padding: '14px 16px', textAlign: 'center' }}><ReferralBadge count={reg.referralCount} /></td>}
                    </tr>
                    {expandedRows[i] && (
                      <tr style={{ background: isDark ? 'rgba(255, 195, 0, 0.03)' : 'rgba(0, 48, 135, 0.02)' }}>
                        <td></td>
                        <td colSpan={colCount - 1} style={{ padding: '16px 16px 20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                            {[
                              { key: 'fullName', label: 'NOMBRE', val: reg.fullName },
                              { key: 'identificationNumber', label: 'DOCUMENTO', val: reg.identificationNumber },
                              { key: 'email', label: 'EMAIL', val: reg.email },
                              { key: 'phone', label: 'TELÉFONO', val: `${reg.countryCode || ''} ${reg.phone || ''}` },
                              { key: 'address', label: 'DIRECCIÓN', val: reg.address },
                              { key: 'neighborhood', label: 'BARRIO / VEREDA', val: reg.neighborhood },
                              { key: 'municipality', label: 'MUNICIPIO', val: reg.municipality },
                              { key: 'department', label: 'DEPARTAMENTO', val: reg.department },
                              { key: 'ageGroup', label: 'EDAD', val: reg.ageGroup },
                              { key: 'gender', label: 'GÉNERO', val: reg.gender === 'Male' ? 'Hombre' : reg.gender === 'Female' ? 'Mujer' : reg.gender },
                              { key: 'populationType', label: 'TIPO DE POBLACIÓN', val: reg.populationType },
                              { key: 'referralCount', label: 'REFERIDOS', val: String(reg.referralCount ?? 0) },
                              { key: 'createdAt', label: 'FECHA', val: reg.createdAt ? new Date(reg.createdAt).toLocaleString('es-CO') : '-' },
                            ].filter(f => !visibleKeys.has(f.key)).map(f => (
                              <div key={f.key}>
                                <p style={{ margin: '0 0 4px 0', color: '#FFC300', fontWeight: '700', fontSize: '11px', letterSpacing: '0.5px' }}>{f.label}</p>
                                <p style={{ margin: 0, color: isDark ? '#e2e8f0' : '#1a202c', fontSize: '14px', wordBreak: 'break-word' }}>{f.val || '-'}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={colCount} style={{ padding: '24px', textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}>No hay registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ReferralBadge({ count }) {
  const n = count ?? 0
  const active = n > 0
  return (
    <span style={{
      display: 'inline-block',
      minWidth: '28px',
      padding: '3px 10px',
      borderRadius: '999px',
      fontWeight: '800',
      fontSize: '13px',
      color: active ? '#1a1a1a' : '#94a3b8',
      background: active
        ? 'linear-gradient(135deg, #FFC300 0%, #FFB700 100%)'
        : 'rgba(148, 163, 184, 0.15)',
    }}>
      {n}
    </span>
  )
}

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Principles from './components/Principles'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './components/Dashboard'
import DashboardLogin from './components/DashboardLogin'

function Landing({ isDark, setIsDark }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: isDark ? '#0f172a' : '#fff', color: isDark ? '#f5f5f5' : '#000', transition: 'background-color 0.3s' }}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Principles isDark={isDark} />
      <RegisterForm isDark={isDark} />
      <Footer isDark={isDark} />
      <ScrollToTop />
    </div>
  )
}

function DashboardWrapper({ isDark }) {
  const handleLogout = () => {
    sessionStorage.removeItem('dashboardAuth')
    window.location.href = '/'
  }
  return <Dashboard isDark={isDark} onLogout={handleLogout} />
}

function NotFound() {
  return (
    <div style={{ background: 'linear-gradient(to right, #1a1a1a, #003087)', color: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px', textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <h1 style={{ fontSize: '96px', fontWeight: 'bold', color: '#FFC300', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Página No Encontrada</h2>
      <p style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '500px' }}>
        La página que buscas no existe en nuestra comunidad.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFC300', color: '#1a1a1a', padding: '12px 32px', fontSize: '16px', fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
      >
        🏠 Volver al Inicio
      </button>
    </div>
  )
}

function DashboardWrapper({ isDark }) {
  const handleLogout = () => {
    sessionStorage.removeItem('dashboardAuth')
    window.location.href = '/'
  }
  return <Dashboard isDark={isDark} onLogout={handleLogout} />
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  useEffect(() => {
    localStorage.setItem('darkMode', isDark)
  }, [isDark])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing isDark={isDark} setIsDark={setIsDark} />} />
        <Route
          path="/admin"
          element={
            sessionStorage.getItem('dashboardAuth')
              ? <DashboardWrapper isDark={isDark} />
              : <DashboardLogin isDark={isDark} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Principles from './components/Principles'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Principles />
      <RegisterForm />
      <Footer />
    </div>
  )
}

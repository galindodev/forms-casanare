export default function About({ isDark }) {
  return (
    <section id="quienes" style={{ padding: '80px 32px', maxWidth: '900px', margin: '0 auto', backgroundColor: isDark ? '#1e293b' : '#fff', transition: 'background-color 0.3s' }}>
      <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#003087', textAlign: 'center', marginBottom: '32px' }}>¿QUIÉNES SOMOS?</h2>
      <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '24px' }}>
        La Comunidad Abelardista Casanare es un espacio ciudadano creado para conectar a personas que comparten una visión de país y desean participar activamente en la construcción del futuro de Colombia.
      </p>
      <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '24px' }}>
        Somos ciudadanos de diferentes municipios, profesiones, edades y experiencias, unidos por el deseo de participar, aportar ideas y fortalecer nuestra comunidad.
      </p>
      <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#003087' }}>
        CASANARE TIENE VOZ. Y QUEREMOS QUE COLOMBIA LA ESCUCHE.
      </p>
    </section>
  )
}

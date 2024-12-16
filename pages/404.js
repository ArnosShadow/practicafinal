import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>¡Oops! La página que buscas no existe.</p>
      <Link href="/" passHref>
        <a style={{ color: 'blue', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}

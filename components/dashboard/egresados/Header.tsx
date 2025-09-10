import Link from 'next/link';

const Header = () => (
  <header style={{ padding: '1rem', background: '#f5f5f5' }}>
    <nav>
      <Link href="/dashboard/header" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Egresados
      </Link>
    </nav>
  </header>
);

export default Header;
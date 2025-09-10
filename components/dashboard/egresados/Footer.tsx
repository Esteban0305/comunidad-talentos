import React from 'react';

const Footer: React.FC = () => (
  <footer style={{
    background: '#f5f5f5',
    padding: '1.5rem 0',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    fontSize: '1rem'
  }}>
    <strong>Comunidad Talentos</strong>
    <div>
      Contacto: <a href="mailto:dev@turdo.bid">dev@turdo.bid</a>
    </div>
  </footer>
);

export default Footer;
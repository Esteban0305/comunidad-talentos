import React from 'react';

const Loading: React.FC = () => (
  <div
    style={{
      flex: 1,
      marginTop: '10rem',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: '1.5rem', fontWeight: 500 }} className='text-blue-700'>
      Cargando ...
    </div>
  </div>
);

export default Loading;

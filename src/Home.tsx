import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) navigate('/');
    else setUser(auth.currentUser);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hola, {user?.displayName}</h1>
      <img src={user?.photoURL || ''} alt="foto" width={100} style={{ borderRadius: '50%' }} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/miscartas')}>Ir a Mis Cartas</button>
      </div>
    </div>
  );
}

export default Home;

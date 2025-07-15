import { auth, provider, db } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;

      const userRef = doc(db, 'usuarios', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Usuario nuevo: crear con cartas [1, 2, 3]
        await setDoc(userRef, {
          nombre: user.displayName,
          mail: user.email,
          tusCartas: [1, 2, 3],
        });
      }

      navigate('/home');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Bienvenido a FUT CHAMPS</h1>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
}

export default Login;

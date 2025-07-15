import { auth, provider, db } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const obtenerCartasAleatorias = (cantidad: number, max: number): number[] => {
    const cartas = new Set<number>();
    while (cartas.size < cantidad) {
      const num = Math.floor(Math.random() * max) + 1;
      cartas.add(num);
    }
    return Array.from(cartas);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;

      const userRef = doc(db, 'usuarios', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Usuario nuevo: asignar 3 cartas aleatorias del 1 al 23
        const cartasAleatorias = obtenerCartasAleatorias(3, 23);
        await setDoc(userRef, {
          nombre: user.displayName,
          mail: user.email,
          tusCartas: cartasAleatorias,
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

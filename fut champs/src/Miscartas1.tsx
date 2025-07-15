import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function MisCartas() {
  const [cartas, setCartas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartas = async () => {
      if (!auth.currentUser) {
        setError('Usuario no logueado');
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'usuarios', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          if (data.tusCartas && Array.isArray(data.tusCartas)) {
            setCartas(data.tusCartas);
          } else {
            setCartas([]);
          }
        } else {
          setCartas([]);
        }
      } catch (err) {
        console.error('Error fetching cartas:', err);
        setError('Error al cargar las cartas');
      }

      setLoading(false);
    };

    fetchCartas();
  }, []);

  if (loading) return <div>Cargando cartas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Mis Cartas</h1>
      {cartas.length === 0 ? (
        <p>No tenés cartas cargadas.</p>
      ) : (
        <ul>
          {cartas.map((carta, idx) => (
            <li key={idx}>{carta}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisCartas;

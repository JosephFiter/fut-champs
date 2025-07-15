import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './MisCartas.css';

interface CartaInfo {
  id: number;
  nombre: string;
  tipo: string;
  global: number;
}

function MisCartas() {
  const [cartasIds, setCartasIds] = useState<number[]>([]);
  const [cartasInfo, setCartasInfo] = useState<CartaInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartasUsuario = async () => {
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
            setCartasIds(data.tusCartas);
          } else {
            setCartasIds([]);
          }
        } else {
          setCartasIds([]);
        }
      } catch (err) {
        console.error('Error fetching cartas:', err);
        setError('Error al cargar las cartas');
      }
    };

    fetchCartasUsuario();
  }, []);

  useEffect(() => {
    const fetchCartasCSV = async () => {
      if (cartasIds.length === 0) {
        setCartasInfo([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/cartas.csv');
        const csvText = await response.text();

        const lines = csvText.trim().split('\n');
        const cartasParsed: CartaInfo[] = lines.slice(1).map(line => {
          const [idStr, nombre, tipo, globalStr] = line.split(',');
          return {
            id: parseInt(idStr, 10),
            nombre,
            tipo,
            global: parseInt(globalStr, 10),
          };
        });

        const cartasUsuario = cartasParsed.filter(carta => cartasIds.includes(carta.id));
        setCartasInfo(cartasUsuario);
      } catch (err) {
        console.error('Error cargando cartas CSV:', err);
        setError('Error al cargar datos de cartas');
      }
      setLoading(false);
    };

    fetchCartasCSV();
  }, [cartasIds]);

  if (loading) return <div>Cargando cartas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="MisCartas-container">
      <button className="MisCartas-button" onClick={() => navigate('/home')}>
        Ir a Home
      </button>

      <h1>Mis Cartas</h1>

      {cartasInfo.length === 0 ? (
        <p>No tenés cartas cargadas.</p>
      ) : (
        <div className="MisCartas-cards">
          {cartasInfo.map(carta => (
            <div key={carta.id} className="MisCartas-card">
              <p>Nombre: {carta.nombre}</p>
              <p>Tipo: {carta.tipo}</p>
              <p>Global: {carta.global}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisCartas;

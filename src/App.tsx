import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import MisCartas2 from './Miscartas1'; // Con M y C mayúscula, igual que el archivo

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <div style={{ textAlign: 'center' }}>
            <Home />
          </div>
        }
      />
      <Route path="/miscartas" element={<MisCartas2 />} />
    </Routes>
  );
}

export default App;
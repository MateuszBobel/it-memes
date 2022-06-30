import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
    </Routes>
  );
}

export default App;

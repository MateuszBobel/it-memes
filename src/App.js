import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './views/Dashboard';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const isLoaded = useSelector((state) => state.auth.isLoaded);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
    </Routes>
  );
}

export default App;

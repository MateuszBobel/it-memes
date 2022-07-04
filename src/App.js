import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import PublicRote from './hoc/PublicRoute';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const isLoaded = useSelector((state) => state.auth.isLoaded);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route
        element={
          <PublicRote>
            <Login />
          </PublicRote>
        }
        path="/login"
      />
    </Routes>
  );
}

export default App;

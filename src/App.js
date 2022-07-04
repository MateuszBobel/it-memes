import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './store/authSlice/auth.actions';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import PublicRote from './hoc/PublicRoute';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

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

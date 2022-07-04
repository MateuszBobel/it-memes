import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/authSlice/auth.actions';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import PublicRote from './hoc/PublicRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

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

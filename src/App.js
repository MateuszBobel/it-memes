import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/authSlice/auth.actions';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
import PublicRote from './hoc/PublicRoute';
import NavBar from './components/NavBar';

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
      <Route
        element={
          <NavBar>
            <Dashboard />
          </NavBar>
        }
        path="/"
      />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
    </Routes>
  );
}

export default App;

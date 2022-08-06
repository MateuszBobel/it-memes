import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/authSlice/auth.actions';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
import Settings from './views/Settings';
import NavBar from './components/NavBar';
import PublicRoute from './hoc/PublicRoute';
import PrivateRoute from './hoc/PrivateRoute';

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
      <Route path="/" element={<NavBar />}>
        <Route element={<Dashboard />} index />
        <Route
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
          path="/settings"
        />
      </Route>
      <Route
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        path="/login"
      />
      <Route
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
        path="/register"
      />
      <Route
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
        path="/forgot-password"
      />
    </Routes>
  );
}

export default App;

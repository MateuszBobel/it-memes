import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children, redirectPath }) {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectPath: '/',
};

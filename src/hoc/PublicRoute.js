import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function PublicRoute({ children, redirectPath }) {
  const { isLogin } = useSelector((state) => state.auth);
  if (isLogin) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

PublicRoute.defaultProps = {
  redirectPath: '/',
};

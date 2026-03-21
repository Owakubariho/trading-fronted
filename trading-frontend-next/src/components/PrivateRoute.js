import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);

    // If there's no user (and not loading, implied by context structure), redirect.
    // Ideally, AuthContext should also provide a loading state to prevent premature redirects,
    // but based on current context snippet, direct user check is the primary gate.

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;

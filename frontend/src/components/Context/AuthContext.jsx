// in frontend/src/context/AuthContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import api from '../../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await api.get('/dashboard');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user', err);
        localStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.common['x-auth-token'];
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['x-auth-token'] = token;
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['x-auth-token'];
  };

  const authContextValue = {
    user,
    loading,
    login,
    logout,
    refetchUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
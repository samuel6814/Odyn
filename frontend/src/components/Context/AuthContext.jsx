// in frontend/src/context/AuthContext.js
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
  } from 'react'; // THIS LINE IS FIXED
  import api from '../../services/api';
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchUser = useCallback(async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set the header for this specific call, as this runs before interceptors might
          api.defaults.headers.common['x-auth-token'] = token;
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
  
    const login = (token) => {
      localStorage.setItem('token', token);
      // We don't need to call fetchUser here, the page will reload/navigate which triggers the context
      // For a smoother UX, we could call fetchUser(), but a redirect is fine.
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
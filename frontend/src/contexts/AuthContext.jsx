import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(userData) {
    localStorage.setItem('token', userData.token);
    setCurrentUser(userData.user);
    setLoading(false);
  }
  

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {

          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          
          const data = await response.json();
          // console.log(data.user);

          setCurrentUser(data.user);
        } catch (error) {
          console.log('Failed to fetch user:', error);
          console.error('Error details:', error.message);
        }
      }
      setLoading(false);
    };
  
    fetchUser();
  }, []);
  

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

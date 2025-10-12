import { useEffect, useState } from 'react';
import api from '../lib/api';
import { AuthContext } from './authContext';

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('sv_token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => logout());
  }, [token]);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('sv_token', data.access_token);
    setToken(data.access_token);
    return data;
  }

  async function register(nickname, email, password) {
    await api.post('/auth/register', { nickname, email, password });
  }

  function applyToken(newToken) {
     localStorage.setItem('sv_token', newToken);
     setToken(newToken);
   }

  function logout() {
    localStorage.removeItem('sv_token');
    setToken(null);
    setUser(null);
  }

  const isAuthenticated = !!token;
  const value = { token, user, isAuthenticated, login, register, logout, applyToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

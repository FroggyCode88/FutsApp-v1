import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
type RoleType = 'PLAYER' | 'ORGANIZER';
interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  codiceFiscale: string;
  dataNascita: string;
  telefono: string;
  ruolo: 'PLAYER' | 'ORGANIZER';
  roles: RoleType[];
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  activeRole: 'PLAYER' | 'ORGANIZER' | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    nome: string;
    cognome: string;
    codiceFiscale: string;
    dataNascita: string;
    email: string;
    telefono: string;
    ruolo: 'PLAYER' | 'ORGANIZER';
    password: string;
  }) => Promise<void>;
  logout: () => void;
  upgradeToOrganizer: () => Promise<void>;
  downgradeToPlayer: () => Promise<void>;
  switchRole: (role: 'PLAYER' | 'ORGANIZER') => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<'PLAYER' | 'ORGANIZER' | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

  // 1️⃣ LOGIN: chiama il BE e salva token+profilo
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {

      const res = await fetch(`${API_BASE}/rest/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      // se il backend restituisce 400/401 ecc res.ok===false
      if (!res.ok) {
        // prova a leggere il messaggio di errore dal body
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || 'Credenziali errate');
      }
      const data = await res.json();
      // es. data = { token: "...", id: "...", username: "...", user: { ... } }
      console.log('Login successful:', data); //solo per debug

      const rolesFromServer: string[] = data.roles;
      const roles: RoleType[] = rolesFromServer
        .filter((r): r is RoleType => r === 'PLAYER' || r === 'ORGANIZER');

      const usr: User = {
        id: data.user.id,
        nome: data.user.nome,
        cognome: data.user.cognome,
        email: data.user.email,
        codiceFiscale: data.user.codiceFiscale,
        dataNascita: data.user.dataNascita,
        telefono: data.telefono,
        ruolo: data.ruolo,
        roles,
        avatar_url: data.user.avatar_url,
      };
      // salva il token in localStorage
      localStorage.setItem('futsapp_token', data.token);
      setUser(usr);
      setActiveRole(usr.roles[0] || null);

    } catch (err: any) {
      // rilancio per farlo gestire al form
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ REGISTER: chiama il BE, poi esegue login automatico
  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/rest/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          nome: data.nome,
          cognome: data.cognome,
          codiceFiscale: data.codiceFiscale,
          dataNascita: data.dataNascita,
          telefono: data.telefono,
          ruolo: data.ruolo
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || 'Errore registrazione');
      }
    } catch (err: any) {
      // rilancio per farlo gestire al form
      throw err;
    }
    finally {
      setLoading(false);
    }
    // al successo facciamo login diretto
    await login(data.email, data.password);
  };

  // 3️⃣ LOGOUT: rimuovi token e utente
  const logout = () => {
    localStorage.removeItem('futsapp_token');
    setUser(null);
    setActiveRole(null);
    navigate('/login');

  };
  // Chiamata POST upgrade-to-organizer
  const upgradeToOrganizer = async () => {
    if (!user) throw new Error('Non autenticato');
    const res = await fetch(`${API_BASE}/rest/user/upgrade-to-organizer`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('futsapp_token')}` }
    });
    if (!res.ok) throw new Error('Impossibile diventare Organizer');
    // Aggiorna ruoli e activeRole
    const newRoles = Array.from(new Set([...(user.roles), 'ORGANIZER']));
    setUser({ ...user, roles: newRoles as RoleType[] });
    setActiveRole('ORGANIZER');
  };

  // Chiamata POST downgrade-to-player
  const downgradeToPlayer = async () => {
    if (!user) throw new Error('Non autenticato');
    const res = await fetch(`${API_BASE}/rest/user/downgrade-to-player`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('futsapp_token')}` }
    });
    if (!res.ok) throw new Error('Impossibile rimuovere ruolo Organizer');
    // Rimuovi ORGANIZER da ruoli
    const newRoles = user.roles.filter(r => r !== 'ORGANIZER');
    setUser({ ...user, roles: newRoles as RoleType[] });
    setActiveRole('PLAYER');
  };

  // Funzione per switchare da UI
  const switchRole = (role: 'PLAYER' | 'ORGANIZER') => {
    if (!user) return;
    if (!user.roles.includes(role)) return;
    setActiveRole(role);
  };
  // 4️⃣ Al mount potresti ricaricare il profilo se esiste il token
  useEffect(() => {
    const token = localStorage.getItem('futsapp_token');
    if (token && !user) {
      // se vuoi, chiama un endpoint /rest/auth/me per ricavare profile
    }
  }, []);
  return (
    <AuthContext.Provider value={{
      user, activeRole, loading,
      login,
      register,
      logout,
      upgradeToOrganizer,
      downgradeToPlayer,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);

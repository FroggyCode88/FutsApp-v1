
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'PLAYER' | 'ORGANIZER';
}

export default function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { user, activeRole } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && activeRole !== requiredRole) {
    // se l’utente non ha quel ruolo attivo, lo rimando alla sua home
    return <Navigate to={activeRole === 'ORGANIZER' ? '/home/organizer' : '/home/player'} replace />;
  }
  return <>{children}</>;
}
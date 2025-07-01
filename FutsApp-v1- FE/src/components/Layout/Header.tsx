import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';
import { Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
   const { user, activeRole, switchRole, upgradeToOrganizer, downgradeToPlayer } = useAuth();
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
     <Link to="/">
        <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-green-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">FutsApp</h1>
                  </div>
      </Link>
      {user && (
        <div className="flex items-center space-x-4">
          {/* Switch se ha entrambi i ruoli */}
          {user.roles.length > 1 && (
            <select
              value={activeRole!}
              onChange={e => switchRole(e.target.value as any)}
              className="border px-2 py-1 rounded"
            >
              {user.roles.includes('PLAYER') && <option value="PLAYER">Giocatore</option>}
              {user.roles.includes('ORGANIZER') && <option value="ORGANIZER">Organizzatore</option>}
            </select>
          )}

          {/* Pulsanti per upgrade/downgrade */}
          {!user.roles.includes('ORGANIZER') ? (
            <button onClick={upgradeToOrganizer} className="text-sm text-blue-600">
              Diventa Organizer
            </button>
          ) : (
            <button onClick={downgradeToPlayer} className="text-sm text-red-600">
              Rimuovi Organizer
            </button>
          )}

          <Link to="/profile" className="text-sm">{user.nome}</Link>
        </div>
      )}
    </header>
  );
}

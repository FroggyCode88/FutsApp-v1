import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';
import { Trophy } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-green-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">FutsApp</h1>
                  </div>
      </Link>
      <div>
        <Link to="/login" className="mr-4 text-sm text-gray-700">Accedi</Link>
        <Link to="/register" className="text-sm text-blue-600">Inizia Gratis</Link>
      </div>
    </header>
  );
}

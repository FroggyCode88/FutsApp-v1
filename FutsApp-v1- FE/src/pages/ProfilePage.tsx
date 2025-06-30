
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Camera, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '../components/Layout/BottomNavigation';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link to={user.ruolo === 'PLAYER' ? '/home/player' : '/home/organizer'}>
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Il Mio Profilo</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="relative">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                <Camera className="w-8 h-8" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-1">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.nome} {user.cognome}</h2>
            <p className="text-blue-100 capitalize">{user.ruolo === 'PLAYER' ? 'Giocatore' : 'Organizzatore'}</p>
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-4">
        {/* Personal Info */}
        <Card className="bg-white rounded-2xl shadow-lg p-4">
          <CardContent className="p-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Informazioni Personali</h3>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-1" />
                Modifica
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Telefono</label>
                <p className="font-medium">{user.telefono}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Codice Fiscale</label>
                <p className="font-medium">{user.codiceFiscale}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Data di Nascita</label>
                <p className="font-medium">{new Date(user.dataNascita).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {user.ruolo === 'PLAYER' && (
          <Card className="bg-white rounded-2xl shadow-lg p-4">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold mb-4">Le Mie Statistiche</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Tornei</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Vittorie</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">23</div>
                  <div className="text-sm text-gray-600">Gol</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {user.ruolo === 'ORGANIZER' && (
          <Card className="bg-white rounded-2xl shadow-lg p-4">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold mb-4">Le Mie Statistiche</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Tornei Creati</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">€2,400</div>
                  <div className="text-sm text-gray-600">Incassi Totali</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">156</div>
                  <div className="text-sm text-gray-600">Partecipanti</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <Card className="bg-white rounded-2xl shadow-lg p-4">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-4">Impostazioni</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                Notifiche Push
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                Privacy e Sicurezza
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                Supporto
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="bg-white rounded-2xl shadow-lg p-4">
          <CardContent className="p-0">
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Esci dall'Account
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;

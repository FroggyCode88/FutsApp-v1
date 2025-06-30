
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trophy, Users, Calendar, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '../../components/Layout/BottomNavigation';

const OrganizerHomePage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const myTournaments = [
    {
      id: '1',
      name: 'Torneo Estivo 2024',
      type: '5v5',
      startDate: '2024-07-15',
      registrations: 12,
      maxTeams: 16,
      revenue: 600,
      status: 'active'
    },
    {
      id: '2',
      name: 'Champions League Locale',
      type: '7v7',
      startDate: '2024-07-20',
      registrations: 8,
      maxTeams: 12,
      revenue: 800,
      status: 'registering'
    },
    {
      id: '3',
      name: 'Coppa Amatori',
      type: '11v11',
      startDate: '2024-07-25',
      registrations: 16,
      maxTeams: 16,
      revenue: 1600,
      status: 'full'
    }
  ];

  const stats = {
    totalTournaments: myTournaments.length,
    totalRevenue: myTournaments.reduce((sum, t) => sum + t.revenue, 0),
    totalParticipants: myTournaments.reduce((sum, t) => sum + t.registrations, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'registering': return 'bg-blue-100 text-blue-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'In corso';
      case 'registering': return 'Iscrizioni aperte';
      case 'full': return 'Completo';
      default: return 'Sconosciuto';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profile"
              className="w-16 h-16 rounded-full border-3 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              Ciao, {user?.nome} {user?.cognome}!
            </h1>
            <p className="text-green-100">Organizzatore</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalTournaments}</div>
            <div className="text-sm text-green-100">Tornei</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">€{stats.totalRevenue}</div>
            <div className="text-sm text-green-100">Incassi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalParticipants}</div>
            <div className="text-sm text-green-100">Partecipanti</div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/organizer/create">
            <Button className="w-full flex items-center justify-center space-x-2" size="lg">
              <Plus className="w-5 h-5" />
              <span>Crea Nuovo Torneo</span>
            </Button>
          </Link>
        </motion.div>

        {/* My Tournaments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">I Miei Tornei</h2>
          <div className="space-y-4">
            {myTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link to={`/organizer/tournament/${tournament.id}`}>
                  <Card className="hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{tournament.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">{tournament.type}</span>
                          <span>{new Date(tournament.startDate).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-sm ${getStatusColor(tournament.status)}`}>
                        {getStatusText(tournament.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {tournament.registrations}/{tournament.maxTeams}
                        </div>
                        <div className="text-xs text-gray-500">Squadre</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          €{tournament.revenue}
                        </div>
                        <div className="text-xs text-gray-500">Incassi</div>
                      </div>
                      <div className="text-center">
                        <Button size="sm" variant="outline">
                          Gestisci
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(tournament.registrations / tournament.maxTeams) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Attività Recente</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Nuova iscrizione al Torneo Estivo 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Torneo Primavera 2024 completato</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Prossimo torneo: 15 Luglio</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OrganizerHomePage;

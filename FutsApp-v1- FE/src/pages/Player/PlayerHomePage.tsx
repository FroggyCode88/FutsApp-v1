
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '../../components/Layout/BottomNavigation';

const PlayerHomePage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

useEffect(() => {
  if (user?.id) {
    fetch(`rest/home/player/upcoming-tournaments/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('futsapp_token')}`
      }
    })
      .then(res => res.json())
      .then(data => setUpcomingTournaments(data))
      .catch(err => console.error('Errore caricamento tornei:', err));
  }
}, [user]);

  const [stats, setStats] = useState({ tournaments: 0, wins: 0, goals: 0 });

useEffect(() => {
  if (user?.id) {
    fetch(`rest/home/player/stats/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('futsapp_token')}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Errore caricamento stats:', err));
  }
}, [user]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
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
              <Users className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              Ciao, {user?.nome} {user?.cognome}!
            </h1>
            <p className="text-blue-100">Giocatore</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.tournaments}</div>
            <div className="text-sm text-blue-100">Tornei</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.wins}</div>
            <div className="text-sm text-blue-100">Vittorie</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.goals}</div>
            <div className="text-sm text-blue-100">Gol</div>
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
          <Link to="/tournaments/search">
            <Button className="w-full flex items-center justify-center space-x-2" size="lg">
              <MapPin className="w-5 h-5" />
              <span>Cerca Tornei Vicini</span>
            </Button>
          </Link>
        </motion.div>

        {/* Upcoming Tournaments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Prossimi Tornei</h2>
          <div className="space-y-4">
            {upcomingTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link to={`/tournaments/${tournament.id}`}>
                  <Card className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                          {tournament.type}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tournament.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(tournament.date).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tournament.teams} squadre</span>
                        </div>
                      </div>
                    </CardContent>
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
          <Card className="bg-white rounded-2xl shadow-lg p-4">
            <CardContent className="p-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Vittoria nel Torneo Primavera 2024</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Iscrizione al Torneo Estivo 2024</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Prossima partita: 15 Luglio</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PlayerHomePage;

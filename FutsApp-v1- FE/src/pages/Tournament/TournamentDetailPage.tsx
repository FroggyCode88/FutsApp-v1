
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Users, Trophy, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

const TournamentDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  // Mock data - replace with actual API call
  const tournament = {
    id: '1',
    name: 'Torneo Estivo 2024',
    type: '5v5',
    location: 'Centro Sportivo Roma Nord',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    startDate: '2024-07-15',
    endDate: '2024-07-21',
    fee: 50,
    maxTeams: 16,
    registeredTeams: 12,
    organizer: {
      id: '2',
      name: 'Mario Bianchi'
    },
    description: 'Torneo estivo di calcio a 5 per squadre amatoriali. Si disputerà su campi in erba sintetica.',
    rules: 'Regolamento FIFA per calcio a 5. Ogni partita dura 30 minuti (15+15).',
    prizes: '1° posto: €500, 2° posto: €300, 3° posto: €100'
  };

  const teams = [
    { id: '1', name: 'Squadra Alfa', captain: 'Luca Verdi', players: 8 },
    { id: '2', name: 'Team Beta', captain: 'Marco Neri', players: 7 },
    { id: '3', name: 'Gli Invincibili', captain: 'Andrea Blu', players: 8 }
  ];

  const matches = [
    {
      id: '1',
      date: '2024-07-15',
      time: '18:00',
      teamA: 'Squadra Alfa',
      teamB: 'Team Beta',
      scoreA: 3,
      scoreB: 2,
      completed: true
    },
    {
      id: '2',
      date: '2024-07-15',
      time: '19:00',
      teamA: 'Gli Invincibili',
      teamB: 'Squadra Alfa',
      scoreA: null,
      scoreB: null,
      completed: false
    }
  ];

  const standings = [
    { position: 1, team: 'Squadra Alfa', played: 2, won: 2, drawn: 0, lost: 0, points: 6 },
    { position: 2, team: 'Gli Invincibili', played: 1, won: 1, drawn: 0, lost: 0, points: 3 },
    { position: 3, team: 'Team Beta', played: 1, won: 0, drawn: 0, lost: 1, points: 0 }
  ];

  const isRegistered = false; // Mock - check if user is registered
  const isOrganizer = user?.id === tournament.organizer.id;

  const tabs = [
    { id: 'info', label: 'Informazioni' },
    { id: 'teams', label: 'Squadre' },
    { id: 'calendar', label: 'Calendario' },
    { id: 'standings', label: 'Classifica' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="p-4 flex items-center space-x-4">
          <Link to={user?.ruolo === 'PLAYER' ? '/home/player' : '/home/organizer'}>
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{tournament.name}</h1>
            <p className="text-blue-100">Organizzato da {tournament.organizer.name}</p>
          </div>
          {isOrganizer && (
            <Link to={`/organizer/tournament/${id}`}>
              <Settings className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Registration Button */}
        {!isOrganizer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isRegistered ? (
              <Button variant="secondary" className="w-full" disabled>
                Già Iscritto
              </Button>
            ) : (
              <Button className="w-full" size="lg">
                Iscriviti al Torneo (€{tournament.fee})
              </Button>
            )}
          </motion.div>
        )}

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'info' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Dettagli Torneo</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{new Date(tournament.startDate).toLocaleDateString('it-IT')} - {new Date(tournament.endDate).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span>{tournament.registeredTeams}/{tournament.maxTeams} squadre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-gray-400" />
                    <span>Calcio {tournament.type}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Descrizione</h3>
                <p className="text-gray-700 mb-4">{tournament.description}</p>

                <h4 className="font-medium text-gray-900 mb-2">Regolamento</h4>
                <p className="text-gray-700 mb-4">{tournament.rules}</p>

                <h4 className="font-medium text-gray-900 mb-2">Premi</h4>
                <p className="text-gray-700">{tournament.prizes}</p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Posizione</h3>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <span className="text-gray-500">Mappa Google Maps</span>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Squadre Iscritte</h3>
                <span className="text-sm text-gray-500">
                  {teams.length}/{tournament.maxTeams}
                </span>
              </div>

              {teams.map((team) => (
                <Card key={team.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{team.name}</h4>
                      <p className="text-gray-600">Capitano: {team.captain}</p>
                      <p className="text-sm text-gray-500">{team.players} giocatori</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Visualizza
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Calendario Partite</h3>

              {matches.map((match) => (
                <Card key={match.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(match.date).toLocaleDateString('it-IT')} • {match.time}
                        </span>
                        {match.completed && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completata
                          </span>
                        )}
                      </div>
                      <div className="font-medium">
                        {match.teamA} vs {match.teamB}
                      </div>
                    </div>
                    <div className="text-right">
                      {match.completed ? (
                        <div className="text-xl font-bold text-gray-900">
                          {match.scoreA} - {match.scoreB}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Non giocata
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'standings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Classifica</h3>

              <Card className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Pos</th>
                        <th className="text-left py-2">Squadra</th>
                        <th className="text-center py-2">G</th>
                        <th className="text-center py-2">V</th>
                        <th className="text-center py-2">P</th>
                        <th className="text-center py-2">Pt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team) => (
                        <tr key={team.position} className="border-b border-gray-100">
                          <td className="py-2 font-medium">{team.position}</td>
                          <td className="py-2">{team.team}</td>
                          <td className="py-2 text-center">{team.played}</td>
                          <td className="py-2 text-center">{team.won}</td>
                          <td className="py-2 text-center">{team.lost}</td>
                          <td className="py-2 text-center font-bold">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;

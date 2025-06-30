
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, BarChart3, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {Card} from '../../components/ui/card';
import {Button} from '../../components/ui/button';

const TournamentManagementPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('teams');

  // Mock data - replace with actual API calls
  const tournament = {
    id: '1',
    name: 'Torneo Estivo 2024',
    type: '5v5',
    registrations: 12,
    maxTeams: 16,
    revenue: 600,
    startDate: '2024-07-15'
  };

  const teams = [
    { id: '1', name: 'Squadra Alfa', captain: 'Luca Verdi', players: 8, paid: true },
    { id: '2', name: 'Team Beta', captain: 'Marco Neri', players: 7, paid: false },
    { id: '3', name: 'Gli Invincibili', captain: 'Andrea Blu', players: 8, paid: true }
  ];

  const matches = [
    {
      id: '1',
      date: '2024-07-15',
      time: '18:00',
      teamA: 'Squadra Alfa',
      teamB: 'Team Beta',
      scoreA: null,
      scoreB: null,
      completed: false
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

  const tabs = [
    { id: 'teams', label: 'Squadre', icon: Users },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'stats', label: 'Statistiche', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="p-4 flex items-center space-x-4">
          <Link to="/home/organizer">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{tournament.name}</h1>
            <p className="text-green-100">Gestione Torneo</p>
          </div>
          <Settings className="w-6 h-6" />
        </div>

        {/* Stats Bar */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">{tournament.registrations}/{tournament.maxTeams}</div>
              <div className="text-xs text-green-100">Squadre</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">€{tournament.revenue}</div>
              <div className="text-xs text-green-100">Incassi</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{tournament.type}</div>
              <div className="text-xs text-green-100">Formato</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Squadre Iscritte</h3>
                <Button size="sm" className="flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Aggiungi Giocatore</span>
                </Button>
              </div>

              {teams.map((team) => (
                <Card key={team.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{team.name}</h4>
                      <p className="text-gray-600">Capitano: {team.captain}</p>
                      <p className="text-sm text-gray-500">{team.players} giocatori</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        team.paid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {team.paid ? 'Pagato' : 'Non pagato'}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center space-x-1">
                      <Edit className="w-4 h-4" />
                      <span>Modifica</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center space-x-1 text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      <span>Elimina</span>
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Add Player Form */}
              <Card>
                <h4 className="font-semibold text-gray-900 mb-3">Aggiungi Nuovo Giocatore</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Codice Fiscale"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Cognome"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button size="sm">Aggiungi Giocatore</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Calendario Partite</h3>
                <Button size="sm" className="flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Nuova Partita</span>
                </Button>
              </div>

              {matches.map((match) => (
                <Card key={match.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {match.teamA} vs {match.teamB}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(match.date).toLocaleDateString('it-IT')} • {match.time}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      match.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {match.completed ? 'Completata' : 'Programmata'}
                    </span>
                  </div>

                  {!match.completed && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <input
                          type="number"
                          placeholder="0"
                          className="px-2 py-1 border border-gray-300 rounded text-center"
                          min="0"
                        />
                        <div className="text-center text-sm text-gray-500">vs</div>
                        <input
                          type="number"
                          placeholder="0"
                          className="px-2 py-1 border border-gray-300 rounded text-center"
                          min="0"
                        />
                      </div>
                      <Button size="sm" className="w-full">
                        Salva Risultato
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Statistiche Torneo</h3>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{tournament.registrations}</div>
                    <div className="text-sm text-gray-600">Squadre Iscritte</div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">€{tournament.revenue}</div>
                    <div className="text-sm text-gray-600">Incassi Totali</div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{matches.length}</div>
                    <div className="text-sm text-gray-600">Partite Programmate</div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {teams.filter(t => t.paid).length}
                    </div>
                    <div className="text-sm text-gray-600">Squadre Pagate</div>
                  </div>
                </Card>
              </div>

              <Card>
                <h4 className="font-semibold text-gray-900 mb-3">Progressione Iscrizioni</h4>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                  <span className="text-gray-500">Grafico delle iscrizioni nel tempo</span>
                </div>
              </Card>

              <Card>
                <h4 className="font-semibold text-gray-900 mb-3">Comunicazioni Inviate</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Benvenuto al torneo</span>
                    <span className="text-xs text-gray-500">12 squadre</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Promemoria pagamento</span>
                    <span className="text-xs text-gray-500">3 squadre</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TournamentManagementPage;

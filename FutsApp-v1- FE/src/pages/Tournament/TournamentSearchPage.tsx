import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Tournament {
  id: string;
  name: string;
  tournament_type: 'league' | 'knockout' | 'mixed';
  location: string;
  start_date: string;
  entry_fee: number;
  organizer_id: string;
}

const TournamentSearchPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
  useEffect(() => {
    // 1) Ottieni posizione
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.error('Geolocation error:', err)
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchTournaments();
    }
  }, [userLocation]);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('futsapp_token');
      if (!token) throw new Error('Token mancante, effettua il login');

      const { lat, lng } = userLocation!;
      const res = await fetch(`${API_BASE}/rest/tournaments/near?lat=${lat}&lng=${lng}&radius=10km`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Errore nel caricamento dei tornei');
      }

      const data: Tournament[] = await res.json();
      setTournaments(data);
    } catch (e: any) {
      console.error('Error fetching tournaments:', e);
      toast({
        title: 'Errore',
        description: e.message || 'Errore di connessione',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (tournamentId: string) => {
    try {
      const token = localStorage.getItem('futsapp_token');
      if (!token) throw new Error('Devi essere loggato');

      const res = await fetch(`/api/tournaments/${tournamentId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 409) {
        toast({ title: 'Già iscritto', description: 'Sei già iscritto a questo torneo', variant: 'destructive' });
      } else if (!res.ok) {
        throw new Error('Errore durante l\'iscrizione');
      } else {
        toast({ title: 'Iscrizione completata', description: 'Iscrizione avvenuta con successo' });
      }
    } catch (e: any) {
      console.error('Error registering:', e);
      toast({ title: 'Errore', description: e.message, variant: 'destructive' });
    }
  };

  // filtro locale
  const filtered = tournaments.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || t.tournament_type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cerca Tornei</h1>
          <p className="text-gray-600">Trova tornei di calcio nella tua zona</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cerca per nome o città..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Tutti i tipi</option>
                <option value="league">League</option>
                <option value="knockout">Knockout</option>
                <option value="mixed">Misto</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filtri
              </Button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nessun torneo trovato</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(t => (
              <Card key={t.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded">
                      {t.tournament_type}
                    </span>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {t.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(t.start_date).toLocaleDateString('it-IT')}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">€{t.entry_fee}</span>
                      <span className="text-sm text-gray-500 ml-1">per squadra</span>
                    </div>
                    <Button size="sm" onClick={() => handleRegister(t.id)}>
                      Iscriviti
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentSearchPage;

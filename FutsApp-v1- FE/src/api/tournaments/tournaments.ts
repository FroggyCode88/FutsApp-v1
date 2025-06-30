// src/api/tournaments.ts
export interface TournamentDto {
  id: string;
  tourName: string;
  tourType: string;
  tourMtea: number;
  tourCity: string;
  tourSdat: string;
  tourEdat: string;
  tourEfee: number;
  tourPmat: number;
  tourNote: string;
  tourRule: string;
}

export interface TournamentCreate {
  tourName: string;
  tourType: string;
  tourMtea: number;
  tourCity: string;
  tourSdat: string;
  tourEdat: string;
  tourEfee: number;
  tourPmat: number;
  tourNote: string;
  tourRule: string;
}

const API = import.meta.env.VITE_API_BASE_URL;
function authHeader() {
  const token = localStorage.getItem('futsapp_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listTournaments(): Promise<TournamentDto[]> {
  const res = await fetch(`${API}/rest/organizer/tournaments`, {
    headers: { ...authHeader() }
  });
  if (!res.ok) throw new Error(`Errore ${res.status}`);
  return res.json();
}

export async function getTournament(id: string): Promise<TournamentDto> {
  const res = await fetch(`${API}/rest/organizer/tournaments/${id}`, {
    headers: { ...authHeader() }
  });
  if (!res.ok) throw new Error(`Errore ${res.status}`);
  return res.json();
}

export async function createTournament(data: TournamentCreate): Promise<TournamentDto> {
  const res = await fetch(`${API}/rest/organizer/tournaments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Errore ${res.status}`);
  return res.json();
}

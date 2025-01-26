export type User = { id: number; email: string; hasTeam: boolean } | null;
export type LoginValues = { email: string; password: string };

export type Player = {
    id: number;
    player_name: string;
    position: string;
    market_price: number;
    teamId: number;
    in_market: boolean;
    created_at: string;
    updated_at: string;
};
  
export type Team = {
    id: number;
    name: string;
    short_name: string;
    badge: string;
    budget: number;
    userId: number;
    created_at: string;
    updated_at: string;
    players: Player[];
};
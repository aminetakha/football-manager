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

export type Market = {
    id: number;
    player_id: number;
    player_name: string;
    player_position: string;
    player_price: number;
    in_team: string | null;
    in_team_id: number | null;
    in_team_short: string | null;
    in_team_badge: string | null;
    out_team: string | null;
    out_team_id: number | null;
    out_team_short: string | null;
    out_team_badge: string | null;
    price: number;
}

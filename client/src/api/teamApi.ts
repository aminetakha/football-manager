import { Team } from "../types";
import { apiUrl } from "./apiUrl";
import get from "./methods/get";

export default {
  getUserTeam: (userId: number) =>
    get<{ team: Team }>(`${apiUrl}/api/teams/${userId}`),
  getAllTeams: () =>
    get<{ value: string; label: string }[]>(`${apiUrl}/api/teams`),
  getUserTeamInfo: (userId: number) =>
    get<Omit<Team, "players">>(`${apiUrl}/api/teams/info/${userId}`),
};

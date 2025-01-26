import { apiUrl } from "./apiUrl";
import get from "./methods/get";

export default {
    getUserTeam: (userId: number) => get(`${apiUrl}/api/teams/${userId}`),
    getAllTeams: () => get(`${apiUrl}/api/teams`),
    getUserTeamInfo: (userId: number) => get(`${apiUrl}/api/teams/info/${userId}`)
}
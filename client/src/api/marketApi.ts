import { apiUrl } from "./apiUrl";
import get from "./methods/get";
import post from "./methods/post";

export default {
  getTransferMarketData: (params?: {
    teamId?: string;
    playerName?: string;
    price?: string;
    page: number;
  }) => {
    const url = new URL(`${apiUrl}/api/market`);
    if (params?.teamId) {
      url.searchParams.append("team_id", params.teamId);
    }
    if (params?.playerName) {
      url.searchParams.append("player_name", params.playerName);
    }
    if (params?.price) {
      url.searchParams.append("price", params.price);
    }
    url.searchParams.append("page", (params?.page || 1).toString());
    return get(url.toString());
  },
  addPlayerToMarket: (data: {
    playerId: number;
    outTeamId: number;
    price: number;
  }) => {
    return post(`${apiUrl}/api/market/add`, data);
  },
  removePlayerToMarket: (data: { playerId: number; outTeamId: number }) => {
    return post(`${apiUrl}/api/market/remove`, data);
  },
  buyPlayer: (data: {
    playerId: number;
    inTeamId: number;
    outTeamId: number;
    price: number;
  }) => post(`${apiUrl}/api/market/buy`, data),
};

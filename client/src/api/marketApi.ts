import { apiUrl } from "./apiUrl"
import post from "./methods/post"

export default {
    addPlayerToMarket: (data: { playerId: number, outTeamId: number, price: number }) => {
        return post(`${apiUrl}/api/market/add`, data);
    },
    removePlayerToMarket: (data: { playerId: number, outTeamId: number }) => {
        return post(`${apiUrl}/api/market/remove`, data);
    }
}
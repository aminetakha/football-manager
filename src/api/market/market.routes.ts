import { Router } from "express";
import {
  addPlayerToMarker,
  buyPlayer,
  canAddToMarket,
  getMarketTransfers,
  getTeamBudget,
  getTeamPlayersCount,
  removePlayerFromMarket,
} from "./market.services";

const marketRouter = Router();

marketRouter.get("/", async (req, res, next) => {
  try {
    const { player_name, team_id, price, page = "1", limit = "10" } = req.query;
    const results = await getMarketTransfers({
      player_name: player_name ? String(player_name) : undefined,
      team_id: team_id ? Number(team_id) : undefined,
      price: price ? Number(price) : undefined,
      page: Number(page),
      limit: Number(limit),
    });
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

marketRouter.post("/add", async (req, res) => {
  try {
    const { playerId, outTeamId, price } = req.body;
    const canAdd = await canAddToMarket(outTeamId);
    if (!canAdd) {
      res.status(400).json({
        message:
          "Can't put players in transfer marker, you should have at least 15 players in your team",
      });
      return;
    }
    await addPlayerToMarker({ outTeamId, playerId, price });
    res.status(201).json({
      message: "Player has been added to transfer market successfully",
    });
  } catch (error) {
    console.log("marketRouter.add ~ error:", error);
    res.status(400).json({
      message:
        "An error occurred while adding the player in the transfer market",
    });
  }
});

marketRouter.post("/remove", async (req, res) => {
  try {
    const { playerId, outTeamId } = req.body;
    await removePlayerFromMarket(playerId, outTeamId);
    res.status(200).json({
      message: "Player has been removed from the transfer market successfully",
    });
  } catch (error) {
    console.log("marketRouter.remove ~ error:", error);
    res.status(400).json({
      message:
        "An error occurred while removing the player in the transfer market",
    });
  }
});

marketRouter.post("/buy", async (req, res) => {
  try {
    const { playerId, inTeamId, outTeamId, price } = req.body;
    const teamPlayersCount = await getTeamPlayersCount(inTeamId);
    if (teamPlayersCount === 25) {
      res.status(400).json({
        message: "Your team is full, can't have more than 25 players",
      });
      return;
    }
    const inTeamBudget = await getTeamBudget(inTeamId);
    if (inTeamBudget - price < 0) {
      res.status(400).json({
        message: "Can't buy this player, you don't have enough money",
      });
      return;
    }
    await buyPlayer({ inTeamId, outTeamId, playerId, price });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("marketRouter.buy ~ error:", error);
    res.status(400).json({
      message:
        "An error occurred while adding the player in the transfer market",
    });
  }
});

export default marketRouter;

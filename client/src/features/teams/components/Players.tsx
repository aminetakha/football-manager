import React from "react";
import { Button, NumberFormatter, Table } from "@mantine/core";
import { Player } from "../../../types";
import useAddPlayerToMarket from "../hooks/useAddPlayerToMarket";
import useRemovePlayerFromMarket from "../hooks/useRemovePlayerFromMarket";

const Players: React.FC<{ players: Player[] }> = ({ players }) => {
  const addPlayerToMarket = useAddPlayerToMarket();
  const removePlayerToMarket = useRemovePlayerFromMarket();

  const rows = players.map((player) => (
    <Table.Tr key={player.id}>
      <Table.Td>{player.player_name}</Table.Td>
      <Table.Td>{player.position}</Table.Td>
      <Table.Td>
        <NumberFormatter
          value={player.market_price}
          thousandSeparator
          prefix="$"
        />
      </Table.Td>
      <Table.Td>
        {player.in_market ? (
          <Button
            color="red"
            variant="outline"
            onClick={() =>
              removePlayerToMarket.mutate({
                outTeamId: player.teamId,
                playerId: player.id,
              })
            }
          >
            Remove from market
          </Button>
        ) : (
          <Button
            color="green"
            variant="outline"
            onClick={() =>
              addPlayerToMarket.mutate({
                outTeamId: player.teamId,
                playerId: player.id,
                price: player.market_price,
              })
            }
          >
            Add to market
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Player name</Table.Th>
          <Table.Th>Position</Table.Th>
          <Table.Th>Market price</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default Players;

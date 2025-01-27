import React from "react";
import {
  Badge,
  Button,
  Flex,
  Image,
  NumberFormatter,
  Table,
  Tooltip,
} from "@mantine/core";
import { Market as MarketType } from "../../../types";
import { apiUrl } from "../../../api/apiUrl";

type MarketProps = {
  market: { result: MarketType[]; totalCount: number };
  userTeamId: number;
  onBuyPlayerHandler: (data: {
    playerId: number;
    outTeamId: number;
    price: number;
  }) => void;
};

const Market: React.FC<MarketProps> = ({
  market,
  userTeamId,
  onBuyPlayerHandler,
}) => {
  const renderTableAction = (transfer: MarketType) => {
    if (transfer.in_team !== null) {
      return <Badge color="green">Sold</Badge>;
    }
    if (transfer.out_team_id === userTeamId) {
      return "-";
    }
    if (transfer.in_team === null) {
      return (
        <Button
          color="red"
          variant="outline"
          onClick={() =>
            onBuyPlayerHandler({
              outTeamId: transfer.out_team_id!,
              playerId: transfer.player_id,
              price: transfer.price,
            })
          }
        >
          Buy Player
        </Button>
      );
    }
  };

  const rows = market.result.map((transfer) => (
    <Table.Tr key={transfer.id}>
      <Table.Td>
        {transfer.player_name} ({transfer.player_position})
      </Table.Td>
      <Table.Td>
        <Flex align="center" gap="xs">
          <Image
            src={`${apiUrl}/logos/${transfer.out_team_badge}`}
            w={25}
            h={25}
          />
          <Tooltip label={transfer.out_team} arrowSize={4}>
            <span>{transfer.out_team_short}</span>
          </Tooltip>
        </Flex>
      </Table.Td>
      <Table.Td>
        {transfer.in_team ? (
          <Flex align="center" gap="xs">
            <Image
              src={`${apiUrl}/logos/${transfer.in_team_badge}`}
              w={25}
              h={25}
            />
            <Tooltip label={transfer.in_team} arrowSize={4}>
              <span>{transfer.in_team_short}</span>
            </Tooltip>
          </Flex>
        ) : (
          "-"
        )}
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          value={transfer.price || "-"}
          thousandSeparator
          prefix={transfer.price ? "$" : undefined}
        />
      </Table.Td>
      <Table.Td>{renderTableAction(transfer)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table my="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Player</Table.Th>
            <Table.Th>Out</Table.Th>
            <Table.Th>In</Table.Th>
            <Table.Th>Market price</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default Market;

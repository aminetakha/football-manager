import { useEffect, useState } from "react";
import { Box, Loader, Text } from "@mantine/core";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useAuth } from "../../hooks/useAuth";
import { apiUrl } from "../../api/apiUrl";
import Team from "./components/Team";
import useUserTeam from "./hooks/useUserTeam";
import TableSkeleton from "../../components/TableSkeleton";

const TeamDasboard = () => {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [shouldFetchTeam, setShouldFetchTeam] = useState(false);
  const { user } = useAuth();
  const team = useUserTeam(shouldFetchTeam);

  useEffect(() => {
    let ctrl: AbortController | undefined;
    async function fetchTeamCreationStatus() {
      if (user && !user.hasTeam) {
        setIsCreatingTeam(true);
        ctrl = new AbortController();
        await fetchEventSource(`${apiUrl}/api/teams/team-status/${user.id}`, {
          onmessage(ev) {
            const receivedData = JSON.parse(ev.data);
            if (receivedData.type === "complete") {
              setIsCreatingTeam(false);
              setShouldFetchTeam(true);
            }
          },
          credentials: "include",
          signal: ctrl.signal,
        });
      }
    }

    fetchTeamCreationStatus();

    return () => {
      if (ctrl) {
        ctrl.abort();
      }
    };
  }, [user]);

  return (
    <Box pos="relative">
      {isCreatingTeam && (
        <Text c="dimmed">Please wait, your team is being created</Text>
      )}
      {team.isLoading && <TableSkeleton rows={10} />}
      {team.data && <Team team={team.data.team} />}
      {team.isFetching && !team.isLoading && (
        <Loader color="blue" pos="absolute" top={100} right={0} />
      )}
    </Box>
  );
};

export default TeamDasboard;

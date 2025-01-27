import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useAuth } from "../../hooks/useAuth";
import { apiUrl } from "../../api/apiUrl";
import Team from "./components/Team";
import useUserTeam from "./hooks/useUserTeam";

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
    <div>
      {isCreatingTeam && <p>Please wait, your team is being created</p>}
      {team.isLoading && <p>Loading your team</p>}
      {team.data && <Team team={team.data.team} />}
    </div>
  );
};

export default TeamDasboard;

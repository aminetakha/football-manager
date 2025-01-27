import { useQuery } from "react-query";
import teamApi from "../../../api/teamApi";
import keys from "../../../api/keys";

export default () => {
  return useQuery({
    queryFn: teamApi.getAllTeams,
    queryKey: keys.allTeamsKey(),
  });
};

import { ComboboxItem, Flex, Input, NumberInput, Select } from "@mantine/core";
import { useQuery } from "react-query";
import teamApi from "../../../api/teamApi";
import keys from "../../../api/keys";

type FiltersProps = {
    selectedTeam: ComboboxItem | undefined;
    onTeamChange: (option: ComboboxItem) => void;
    onPlayerChange: (name: string) => void;
    onPriceChange: (price: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ selectedTeam, onTeamChange, onPlayerChange, onPriceChange }) => {
    const { data } = useQuery({
        queryFn: teamApi.getAllTeams,
        queryKey: keys.allTeamsKey()
    });

    return (
        <Flex gap='md'>
            <Select
                label="Seach by team"
                data={data || []}
                value={selectedTeam ? selectedTeam.value : null}
                onChange={(_value, option) => onTeamChange(option)}
                searchable
                clearable
            />
            <Input.Wrapper label="Search by player">
                <Input onChange={e => onPlayerChange(e.target.value)} />
            </Input.Wrapper>
            <NumberInput
                label="Search by price"
                onChange={e => onPriceChange(e.toString())}
                min={0}
            />
        </Flex>
    )
}

export default Filters;
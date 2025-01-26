import { ActionIcon, Burger, Flex, Group, Image, Tooltip } from '@mantine/core';
import { useMutation } from 'react-query';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import logo from '../assets/football-manager.png';
import authApi from '../api/authApi';
import { useAuth } from '../hooks/useAuth';

type HeaderProps = {
    opened: boolean;
    toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
    const { signUser } = useAuth();

    const logoutHandler = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess(){
            signUser(null);
        }
    })

    return (
        <Flex justify='space-between' align='center' h="100%" px="md">
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image src={logo} w={60} radius={30} />
            </Group>
            <Group>
                <ActionIcon color='black' variant="white" onClick={() => logoutHandler.mutate()}>
                    <Tooltip label='logout' arrowSize={4}>
                        <Icon path={mdiLogout} size={1} />
                    </Tooltip>
                </ActionIcon>
            </Group>
        </Flex>
    )
}

export default Header
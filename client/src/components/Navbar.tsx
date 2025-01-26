import { NavLink } from '@mantine/core';
import Icon from '@mdi/react';
import { mdiSoccerField, mdiSwapHorizontal } from '@mdi/js';
import { useLocation } from 'react-router';

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <NavLink
                href="/"
                label="My Team"
                variant="filled"
                active={location.pathname === '/'}
                mb='md'
                leftSection={<Icon path={mdiSoccerField} size={1} />}
            />
            <NavLink
                href="/transfer"
                label="Transfer Market"
                variant="filled"
                active={location.pathname === '/transfer'}
                leftSection={<Icon path={mdiSwapHorizontal} size={1} />}
            />
        </>
    )
}

export default Navbar
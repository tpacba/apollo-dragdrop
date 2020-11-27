import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../utils/Auth';

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext);

    const path = window.location.pathname === "/" ? "home" : window.location.pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (event, { name }) => {
        setActiveItem(name);
    };

    const logoutButton =
        <Menu pointing secondary size="massive" color="red">
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>;

    const loginAndRegisterButton =
        <Menu pointing secondary size="massive" color="red">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>;

    return (
        <div>
            {user ? (logoutButton) : (loginAndRegisterButton)}
        </div>
    );
};

export default MenuBar;
import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { HomeTwoTone, EditTwoTone, ContactsTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const NavBarMenu = () => {

    const [current, setCurrent] = useState('mail');

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" theme="dark">
                <Menu.Item key="home" icon={<HomeTwoTone />}>
                    <Link to={'/'}>Home</Link>
                </Menu.Item>
                <Menu.Item key="registro" icon={<EditTwoTone />}>
                    <Link to={'/registro'}>Registro</Link>
                </Menu.Item>
                <Menu.Item key="registromodal" icon={<EditTwoTone />}>
                    <Link to={'/registromodal'}>Registro Modal</Link>
                </Menu.Item>
                <Menu.Item key="contacto" icon={<ContactsTwoTone />}>
                    <Link to={'/contacto'}>Contacto</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

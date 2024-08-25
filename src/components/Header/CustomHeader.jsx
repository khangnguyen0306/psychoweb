import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Drawer, Grid, Image, Dropdown } from "antd";
import "./CustomHeader.scss";
import { DoubleRightOutlined, FacebookOutlined, FormOutlined, InstagramOutlined, LoginOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import NameWeb from "../../../src/assets/image/logo.svg"
const { Header } = Layout;
const { useBreakpoint } = Grid;

const CustomHeader = () => {
    const screens = useBreakpoint();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const items = [
        {
            key: '1',
            label: (
                <Link to='/login' style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ paddingRight: '20px' }}>Login</p> <LoginOutlined /></Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/register' style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ paddingRight: '20px' }}>Register</p> <FormOutlined /></Link>
            ),
        },
    ];

    return (
        <Header id="header" className={visible ? "show" : "hidden"} style={{ zIndex: '1' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <Link to={"/"} style={{marginLeft:'6rem'}}>
                    <div className="header-logo">
                        <Image src={NameWeb} preview={false} />
                    </div>
                </Link>
                {screens.md ? (
                    <>
                        <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={{ width: 'fit-content', backgroundColor: 'none',marginLeft:'2.2rem' }}>
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="admin">About</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/"> Community</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="home">Search</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="admin">Pricing</Link>
                            </Menu.Item>
                            {/* <Menu.Item key="6">
                                <Button to="admin" type="primary" style={{ backgroundColor: '#30b2d2', height: '40px' }} >Booking<p><DoubleRightOutlined /></p></Button>
                            </Menu.Item> */}

                        </Menu>



                    </>



                ) : (
                    <Button className="menu-btn" onClick={() => setDrawerVisible(true)} style={{ marginRight: '40px' }}>
                        <MenuOutlined />
                    </Button>
                )}
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
                <div style={{display:'flex',gap:'20px',marginRight:'20px'}}>
                    <Link><FacebookOutlined style={{fontSize:'20px'}}/></Link>
                    <Link><InstagramOutlined style={{fontSize:'20px'}}/></Link>
                </div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    onOpenChange={(open) => setIsActive(open)}  
                >
                    <Button
                        className={`btn-user ${isActive ? 'active' : ''}`} // Toggle 'active' class based on state
                    >
                        <UserOutlined style={{ fontSize: '20px', color: isActive ? '#1f9bff' : '#000' }} />
                    </Button>
                </Dropdown>
            </div>
            <Drawer
                title="Navigation"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={["1"]}
                    style={{ width: '100%' }}
                    onClick={() => setDrawerVisible(false)}
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="admin">About</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/"> Community</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="home">Search</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="admin">Pricing</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Header>
    );
};

export default CustomHeader;

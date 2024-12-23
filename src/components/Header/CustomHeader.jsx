import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Drawer, Grid, Image, Dropdown, notification } from "antd";
import "./CustomHeader.scss";
import { DoubleRightOutlined, FacebookOutlined, FormOutlined, InstagramOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import NameWeb from "../../../src/assets/image/logo.svg"
import { logOut, selectCurrentToken, selectCurrentUser } from "../../slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const CustomHeader = () => {
    const screens = useBreakpoint();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const user = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector(selectCurrentUser)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const handleLogout = useCallback(() => {
        dispatch(logOut());

        notification.success({
            message: "Đăng xuất thành công",
            description: "Hẹn gặp lại!",
            duration: 1.5
        });
        navigate("/login");
    }, [dispatch, navigate]);

    const itemsNoLogin = useMemo(() => [
        {
            key: '1',
            label: (
                <Link to='/login' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ paddingRight: '20px' }}>Đăng nhập</p> <LoginOutlined />
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/register' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ paddingRight: '20px' }}>Đăng ký</p> <FormOutlined />
                </Link>
            ),
        },
    ], []);

    const items = useMemo(() => [
        {
            key: '1',
            label: (
                <Link to='/profile' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p style={{ paddingRight: '20px' }}>Hồ sơ</p> <UserOutlined />
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={handleLogout} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ paddingRight: '20px' }}>Đăng xuất</p> <LogoutOutlined />
                </p>
            ),
        },
    ], [handleLogout]);

    return (
        <Header id="header" className={`${visible} ? "show" : "hidden" w-full`} style={{ zIndex: '1000' }} >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={"/"} style={{ marginLeft: '6rem' }}>
                    <div className="header-logo">
                        <Image src={NameWeb} preview={false} />
                    </div>
                </Link>
                {screens.md ? (
                    <Menu mode="horizontal" selectedKeys={[location.pathname]} style={{ width: 'fit-content', backgroundColor: 'none', marginLeft: '2.2rem' }}>
                        <Menu.Item key="/">
                            <NavLink exact to="/" activeClassName="active">Trang chủ</NavLink>
                        </Menu.Item>
                        {userData?.role != "PSYCHIATRIST" && (
                            <Menu.Item key="/doctor" >

                                <NavLink to="/doctor" activeClassName="active">Bác sĩ</NavLink>
                            </Menu.Item>
                        )}
                        {userData?.role != "PSYCHIATRIST" ? (
                            <Menu.Item key="2" >
                                <NavLink to="/about">Giới thiệu</NavLink>
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="2" >
                                <NavLink to="/manageBooking">Quản lý lịch hẹn</NavLink>
                            </Menu.Item>
                        )}
                        
                    </Menu>
                ) : (
                    <Button className="menu-btn" onClick={() => setDrawerVisible(true)} style={{ marginRight: '40px' }} aria-label="Mở menu">
                        <MenuOutlined />
                    </Button>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', zIndex: '110000' }}>
                <div style={{ display: 'flex', gap: '20px', marginRight: '20px' }}>
                    <Link aria-label="Facebook"><FacebookOutlined style={{ fontSize: '20px' }} /></Link>
                    <Link aria-label="Instagram"><InstagramOutlined style={{ fontSize: '20px' }} /></Link>
                </div>
                <Dropdown
                    menu={{ items: user ? items : itemsNoLogin }}
                    placement="bottom"
                    onOpenChange={(open) => setIsActive(open)}
                >
                    <Button className={`btn-user ${isActive ? 'active' : ''}`} aria-label="Menu người dùng">
                        <UserOutlined style={{ fontSize: '20px', color: isActive ? '#1f9bff' : '#000' }} />
                    </Button>
                </Dropdown>
            </div>
            <Drawer
                className="w-full"
                title="Điều hướng"
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
                    <Menu.Item key="1" onClick={() => setActiveTab("1")}>
                        <Link to="/">Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => setActiveTab("3")}>
                        <Link to="/about">Giới thiệu</Link>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => setActiveTab("4")}>
                        <Link to="/">Cộng đồng</Link>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => setActiveTab("5")}>
                        <Link to="home">Tìm kiếm</Link>
                    </Menu.Item>
                    <Menu.Item key="6" onClick={() => setActiveTab("6")}>
                        <Link to="admin">Giá cả</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Header>
    );
};

export default CustomHeader;

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, HistoryOutlined, LockOutlined } from '@ant-design/icons';
import HistoryBooking from '../../components/profile/HistoryBooking';
import Privacy from '../../components/profile/Privacy';
import Profile from '../../components/profile/profile';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/auth.slice';

const { Sider, Content } = Layout;

const ProfilePage = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector(selectCurrentUser)
    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <Profile />;
            case '2':
                return <HistoryBooking />;
            case '3':
                return <Privacy />;
            default:
                return <Profile />;
        }
    };

    return (
        <Layout className="min-h-screen pt-[100px]">
            <Sider width={200} className="shadow-lg" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu
                    className='pt-10'
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedKey]}
                    onClick={(e) => setSelectedKey(e.key)}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Hồ sơ cá nhân
                    </Menu.Item>
                    {!user.role == "PSYCHIATRIST" && (
                        <Menu.Item key="2" icon={<HistoryOutlined />}>
                            Lịch sử đặt lịch
                        </Menu.Item>
                    )}
                    <Menu.Item key="3" icon={<LockOutlined />}>
                        Quyền riêng tư
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="p-6">
                <Content className="p-6 bg-white rounded-lg shadow-lg">
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfilePage;

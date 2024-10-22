import React from 'react';
import { Layout, Card, Form, Input, Button, DatePicker, Select, Skeleton, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, LockOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useEditProfileMutation, useGetUserProfileQuery } from '../../services/userAPI';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/auth.slice';
import moment from 'moment';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Option } = Select;

const Profile = () => {
    const userLocal = useSelector(selectCurrentUser)
    const { data: userData, isLoading, error, refetch } = useGetUserProfileQuery(userLocal.id);
    const [editUProfile, { isLoading: isLoadingEdit }] = useEditProfileMutation()

    console.log(userData)
    const onFinish = async (values) => {
        try {
            await editUProfile({ body: values, userId: userLocal.id }).unwrap();
            message.success("Cập nhật thông tin thành công !")
            refetch();
        } catch (error) {
            message.error("Cập nhật thông tin thất bại !")
        }
    };
    if (isLoading) {
        return <Skeleton active />
    }
    return (
        <Layout className="min-h-screen w-full flex justify-center items-center bg-gray-100">
            <Content className="w-full max-w-lg p-6">
                <Card className="rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-semibold mb-6">User Profile</h2>
                    <Form
                        name="profile"
                        initialValues={{
                            fullname: userData?.data?.fullname || '',
                            email: userData?.data?.email || '',
                            dateOfBirth: userData?.data?.dateOfBirth ? dayjs(userData.data.dateOfBirth) : null,
                            phoneNumber: userData?.data?.phonenumber || '',
                            address: userData?.data?.address || '',
                            gender: userData?.data?.gender.toLowerCase() || '',
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="fullname"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Full Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input readOnly prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="dateOfBirth"
                            label="Date of Birth"
                            rules={[{ required: true, message: 'Please input your date of birth!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input prefix={<HomeOutlined />} placeholder="Address" />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Select placeholder="Select Gender">
                                <Option value="male"><ManOutlined /> Male</Option>
                                <Option value="female"><WomanOutlined /> Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={isLoadingEdit} htmlType="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default Profile;

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { validationPatterns } from '../../utils/utils';

const Privacy = () => {
    const [showForm, setShowForm] = useState(false);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Privacy</h2>
            {!showForm ? (
                <Button type="primary" onClick={() => setShowForm(true)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Change Password
                </Button>
            ) : (
                <Form
                    name="change_password"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                              required: true,
                              pattern: validationPatterns.password.pattern,
                              message: validationPatterns.password.message
        
                            }
                          ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                              },
                            }),
                          ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default Privacy;
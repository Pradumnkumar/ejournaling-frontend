import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import Otp from "../Otp/Otp";
import { createUser } from "../../features/user/userActions";

function Registration({ setShowRegistration, showRegistration }) {
  const [showOtp, setShowOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0)
  const dispatch = useDispatch();
  const onClick = (params) => {
    const userData = {
      'email': params.email,
      'password': params.password,
      'name': params.firstName + ' ' + params.lastName,
      'phone': `${params.phone}`
    }
    dispatch(createUser(userData));
    setShowOtp(true);
    setShowRegistration(false);
  };
  const onCancel = (params) => {
    setShowRegistration(false);
  };
  return (
    <>
      <Modal
        open={showRegistration}
        onOk={onClick}
        onCancel={onCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>Registration Form</h1>
          <Form onFinish={onClick}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                label="First Name"
                name="firstName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "First name is required!",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter first name"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </div>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Email is requried!",
                },
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              type="password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password placeholder="Please enter password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Please enter password" />
            </Form.Item>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                label="Phone Number"
                name="phone"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Phone number is required!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <InputNumber
                  placeholder="Please enter phone number"
                  style={{ width: "90%" }}
                />
              </Form.Item>
              <Form.Item
                label="Standard"
                name="standard"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Please provide your class!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Graduated'].map((item)=>({
                    value: `${item.toLowerCase()}`,
                    label: `${item}`
                }))}
                />
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <Otp showOtp={showOtp} setShowOtp={setShowOtp} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
    </>
  );
}

export default Registration;

import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import "./SignUp.css";
import Registration from "../RegistrationForm/Registration";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userActions";


const FormPage = ({ showSignIn, setShowSignIn }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const onCloseFormPage = () => setShowSignIn(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
      dispatch(loginUser(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onRegisterClick = () => {
    setShowRegistration(true);
    setShowSignIn(false)
  };
  const forgotPassword = () => {
    notification.open({
      type: "success",
      message: "Password sent",
      description:
        "Link to generate password has been shared to registered email Id",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  return (
    <>
      <Modal open={showSignIn} footer={null} onCancel={onCloseFormPage}>
        <div id="signInForm">
          <h1 style={{ alignItems: "center" }}>Sign In</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input valid username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input valid password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <span
            onClick={forgotPassword}
            fontColor="blue"
            cursor="pointer"
            className="forget-password"
          >
            Forgot Password ?
          </span>
          <br />
          <div>Not Yet Registered ?</div>
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" onClick={onRegisterClick}>
              Register Now
            </Button>
          </div>
        </div>
      </Modal>
      <Registration
        setShowRegistration={setShowRegistration}
        showRegistration={showRegistration}
      />
    </>
  );
};

export default FormPage;

import { Button, Input, Modal, notification } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../features/user/userActions";

function Otp({ showOtp, setShowOtp }) {
  const [otpCode, setOtpCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(5)
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showOtp) setTimeLeft(() => 5);
  }, [showOtp]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }
    if(!isResendDisabled) setIsResendDisabled(true)

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isResendDisabled]);

  const handleResendOtp = () => {
    setTimeLeft(5); // set otp time
    setIsResendDisabled(true);
    notification.open({
      type: "success",
      description: "OTP has been shared to registered email Id",
      duration: 3,
    });
  };
  const onCancel = () => {
    setTimeLeft(0);
    setShowOtp(false);
  };
  const onClick = () => {
    const otpData = {
      'email': user.email,
      'otp': `${otpCode}`
    }
    dispatch(verifyUser(otpData));
  }
  const onChange = (text) => {
    setOtpCode(text);
  };

  const sharedProps = {
    onChange,
  };

  return (
    <Modal open={showOtp} onCancel={onCancel} destroyOnClose footer={null}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Please enter the OTP</h1>
        <Input.OTP length={6} {...sharedProps}/>
        <Button type="primary" onClick={onClick} style={{ marginTop: "10px" }}>
          Submit
        </Button>
        {isResendDisabled ? (
          <div>
            Resend OTP in: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </div>
        ) : (
          <Button
            type="text"
            onClick={handleResendOtp}
            style={{ marginTop: "10px" }}
          >
            Resend OTP
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default Otp;

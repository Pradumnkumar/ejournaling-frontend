import React, { useState } from "react";
import careerVoyagerIcon from "../../Icons/CareerVoyagerIcon.jpeg";
import careerVoyagerText from "../../Icons/careerVoyagerText.jpeg";
import { AiOutlineLogin } from "react-icons/ai";
import { Button, Tooltip, Layout } from "antd";
import FormPage from "../SignUpForm/FormPage";
import { useNavigate } from "react-router-dom";

function Header() {
    const { Header } = Layout;
    const navigate = useNavigate();
    const [showSignIn, setShowSignIn] = useState(false)
    const onIconClick = () => setShowSignIn(!showSignIn)
  return (
    <Header id="header">
      <img
        src={careerVoyagerIcon}
        style={{ width: "auto", height: "auto" }}
        alt="Not found"
      />
      <img
        src={careerVoyagerText}
        alt="Not found"
        style={{ width: "200px", height: "auto" }}
      />
      <Button onClick={()=>navigate("/sector-assessments")}>Take Assessment</Button>
      <Tooltip placement="bottom" title="Login">
        <AiOutlineLogin
          style={{ width: "200px", height: "auto", color: "rgb(5, 19, 168)" }}
          onClick={onIconClick}
        />
      </Tooltip>
      <FormPage showSignIn={showSignIn} setShowSignIn={setShowSignIn}/>
    </Header>
  );
}

export default Header;

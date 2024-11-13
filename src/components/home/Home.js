import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "./body.css";
// import MainContent from "./MainContent";
// import Insights from "./Insights"
// import DiscoverMore from "./DiscoverMore"

function Home() {
  const navigate = useNavigate();
  const btnClicked = () => {
    navigate("/signup");
  };
  return (
    <>
      <Header />
      {/* <Body /> */}
      {/* <MainContent />
      <Insights />
      <DiscoverMore />
      <Footer /> */}
      <button onClick={btnClicked}>Click me</button>
    </>
  );
}

export default Home;

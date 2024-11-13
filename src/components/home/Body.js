import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDot } from "react-icons/go";
import bodyImage1 from "../../bodyImages/bodyImage1.jpeg";
import bodyImage2 from "../../bodyImages/bodyImage2.jpeg";
import bodyImage3 from "../../bodyImages/bodyImage3.jpeg";
import bodyImage4 from "../../bodyImages/bodyImage4.jpeg";
import bodyImage5 from "../../bodyImages/bodyImage5.jpeg";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
function Body() {
  const [currentImage, setCurrentImage] = useState(0);
  const imageArr = [
    {
      src: bodyImage1,
    },
    {
      src: bodyImage2,
    },
    {
      src: bodyImage3,
    },
    {
      src: bodyImage4,
    },
    {
      src: bodyImage5,
    },
  ];
  const onRightArrowClick = () =>
    setCurrentImage((prev) => (prev + 1) % imageArr.length);
  const onLeftArrowClick = () =>
    setCurrentImage((prev) => {
      if (prev === 0) return imageArr.length - 1;
      return prev - 1;
    });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageArr.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageArr.length]);

  const { isLoggedIn, email } = useSelector((state) => state.user);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Row
        className="body"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Col span={24}>
        <MdKeyboardArrowLeft
          style={{ height: "50px", width: "50px", cursor: "pointer" }}
          onClick={onLeftArrowClick}
        />
        <div style={{ width: "600px", height: "600px", overflow: "hidden" }}>
          {console.log({ currentImage })}
          <img
            src={imageArr[currentImage].src}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt=""
            key={currentImage} // This will force the image to re-render and apply the transition
          />
          <li>isLoggedIn</li>
          <li>email</li>
        </div>
        <MdKeyboardArrowRight
          style={{ height: "50%", width: "50px", cursor: "pointer" }}
          onClick={onRightArrowClick}
        />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        {imageArr.map((item, index) => (
          <div
            key={index}
            style={{ color: index === currentImage ? "black" : "white" }}
          >
            <GoDot />
          </div>
        ))}
        </Col>
      </Row>
    </div>
  );
}

export default Body;

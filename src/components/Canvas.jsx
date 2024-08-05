import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import Links from "../components/Links";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/Canvas.css";

const Canvas = ({
  canvasRef,
  startDrawing,
  stopDrawing,
  Draw,
  handleColr,
  handlebg,
  handlefont,
  DownloadImg,
  clear,
  retrive,
  mouseLeave,
  rectangle,
  circle,
  line
}) => {
  return (
    <>
      <div className="container">
        <Navbar
        DownloadImg={DownloadImg}
        clear={clear}
        retrive={retrive}
        />
        <div className="btns">
          <div className="color-picker">
            <label>Font Color</label>
            <input
              type="color"
              id="fontColor"
              className="fontColr"
              onChange={(e) => handleColr(e)}
            />
          </div>
          <div className="color-picker">
            <label>Background Color</label>
            <input
              type="color"
              id="bgColor"
              className="bgColr"
              onChange={(e) => handlebg(e)}
            />
          </div>
          
        </div>
        <div className="mainBox">
          <SideBar
          rectangle={rectangle}   
          line={line}
          circle={circle}
          handlefont={handlefont}
          />
        <canvas
          ref={canvasRef}
          width={1300}
          height={600}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={Draw}
          onMouseLeave={mouseLeave}
        />
        <Links/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Canvas;

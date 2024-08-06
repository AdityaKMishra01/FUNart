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
  line,
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Get canvas dimensions from CSS
      const style = window.getComputedStyle(canvas);
      const width = parseInt(style.width, 10);
      const height = parseInt(style.height, 10);

      // Set canvas internal dimensions
      canvas.width = width;
      canvas.height = height;
    }
  }, [canvasRef]);
  return (
    <>
      <div className="container">
        <Navbar DownloadImg={DownloadImg} clear={clear} retrive={retrive} />
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
          <div className="canCont">
            <canvas
              className="canvas"
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={Draw}
              onMouseLeave={mouseLeave}
              onTouchStart={startDrawing}
              onTouchMove={Draw}
              onTouchEnd={stop}
            />
          </div>
          <Links />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Canvas;

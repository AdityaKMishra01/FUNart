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
  const canvas = canvasRef.current;
  useEffect(() => {
    const updatesize = ()=>{
      const ctx = canvas.getContext('2d');
      const Rect = canvas.getBoundingClientRect();
      const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      canvas.width = Rect.width;
      canvas.height = Rect.height;
      ctx.putImageData(imageData,0,0)
    }

    if(canvas){
    updatesize();
    window.addEventListener("resize",updatesize)

    const preventdefault = (e)=>{
      e.preventDefault();
    }

    window.addEventListener('scroll',preventdefault)
    canvas.addEventListener('touchstart',preventdefault,{ passive: false });
    canvas.addEventListener('touchmove',preventdefault,{ passive: false });
    canvas.addEventListener("touchend", preventdefault, { passive: false });

    return () => {
      window.removeEventListener("resize", updatesize);
      window.removeEventListener('scroll', preventdefault);
      canvas.removeEventListener('touchstart', preventdefault);
      canvas.removeEventListener('touchmove', preventdefault);
      canvas.removeEventListener("touchend", preventdefault);
    }
  }


  },[canvas]);
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

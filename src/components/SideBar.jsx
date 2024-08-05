import React, { useEffect, useRef, useState } from "react";
import '../components/Canvas.css';

const SideBar = ({
  handlefont,
  rectangle,
  circle,
  line}) => {
  const [inout, setInOut] = useState(false);
  // const [rightleft,setRightLeft] = useState('right');


  const clkbtn = () => {
    setInOut(!inout);
  };

  return (
    <>
      <div className={`oprBtns ${inout ? "visible" : ""}`}>
        <button className={`io ${inout ? "visible" : ""}`} onClick={clkbtn} title="Tools">
          <i class={`fa-solid fa-angle-${inout ? 'left' : 'right'}`}></i>
        </button>
        <select onChange={(e) => handlefont(e)} title="Brush Sizes">
          <option value="2px">2px</option>
          <option value="5px">5px</option>
          <option value="10px">10px</option>
          <option value="20px">20px</option>
        </select>
        <button onClick={line} className="shapes">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button onClick={rectangle} className="shapes">
          <i class="fa-regular fa-square"></i>
        </button>
        <button onClick={circle} className="shapes">
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </>
  );
};

export default SideBar;

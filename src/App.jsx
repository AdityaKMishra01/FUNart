import { useState, useRef, useEffect } from "react";
import SideBar from "../src/components/SideBar";
import Canvas from "../src/components/Canvas";
import Loader from "../src/components/Loader/Loader";

function App() {
  // preLoader
  const [loading,setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(2);
  const [fontcolor, setFontColor] = useState("#000000");
  const [shape, setShape] = useState("line");
  const [bgcolr, setBgColr] = useState("#FFFFFF");
  const [startP, setStartP] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [imgdata,setImgData] = useState()
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCtx(canvas.getContext("2d"));
    }
  });

  useEffect(()=>{
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setTimeout(()=>{
      setLoading(false);
    },3000);
  },[ctx,bgcolr])

  const getCordinates = (e)=>{
    if(e.type.includes('mouse')){
     return {x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}
    }else{
      const rect = canvasRef.current.getBoundingClientRect()
      return{
        x:e.touches[0].clientX - rect.left,
        y:e.touches[0].clientY - rect.top
      }
    }
  }

  const startDrawing = (e) => {
    const {x,y} = getCordinates(e);
    setImgData(ctx.getImageData(0,0,canvasRef.current.width,canvasRef.current.height));
    setStartP({ x, y });
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    Draw(e);
  };

  const Draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCordinates(e);

    if (shape === "line") {
      ctx.lineWidth = fontSize;
      ctx.lineTo(x, y);
      ctx.strokeStyle = fontcolor;
      ctx.stroke();
    } else if (shape === "rectangle") {
      ctx.putImageData(imgdata,0,0);
      let width = x - startP.x;
      let height = y - startP.y;
      ctx.lineWidth = fontSize;
      ctx.strokeStyle = fontcolor;
      ctx.strokeRect(startP.x,startP.y,width,height);
    }
    else if(shape === 'circle'){
      ctx.putImageData(imgdata,0,0);
      //Radius of Circle
      let radius = Math.abs((x-startP.x)*2);
      ctx.beginPath();
      ctx.lineWidth = fontSize;
      ctx.arc(startP.x,startP.y,radius,0,2*Math.PI);
      ctx.strokeStyle = fontcolor;
      ctx.stroke();
    }
  };
  
  const line = ()=>{
    setShape('line')
  }

  const rectangle = () => {
    setShape('rectangle');
  };

  const circle = ()=>{
    setShape('circle')
  }

  const stopDrawing = (e) => {
    setIsDrawing(false);
    ctx.closePath();
  };

  const mouseLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      ctx.closePath();
    }
  };

  const handleColr = (e) => {
    setFontColor(e.target.value);
  };
  const handlefont = (e) => {
    setFontSize(parseInt(e.target.value));
  };
  const handlebg = (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setBgColr(e.target.value);
  };

  const DownloadImg = () => {
    localStorage.setItem("canvasImg", canvasRef.current.toDataURL());
    let Img = document.createElement("a");
    Img.download = "Draw.png";
    Img.href = canvasRef.current.toDataURL();
    Img.click();
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const retrive = () => {
    let data = localStorage.getItem("canvasImg");
    if (data) {
      let img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = data;
    }
  };

  if(loading){
    return <Loader/>
   }

  return (
    <>
      <Canvas
        canvasRef={canvasRef}
        startDrawing={startDrawing}
        stopDrawing={stopDrawing}
        Draw={Draw}
        handleColr={handleColr}
        handlefont={handlefont}
        handlebg={handlebg}
        DownloadImg={DownloadImg}
        clear={clear}
        retrive={retrive}
        mouseLeave={mouseLeave}
        rectangle={rectangle}
        circle={circle}
        line={line}
        SideBar={SideBar}
      />
      
    </>
  );
}

export default App;

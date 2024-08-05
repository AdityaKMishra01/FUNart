import React from 'react'

const Navbar = ({DownloadImg,clear,retrive}) => {
  return (
    <>
     <div className="navBar">
          <img src="2024-08-04-FUNart (2).gif"/>
          <div class="inpCont">
            
            <button onClick={(e) => DownloadImg(e)} title="Save & Download">
              <i class="fa-solid fa-download"></i>
            </button>
            <button onClick={(e) => clear(e)} title="Clear">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button onClick={(e) => retrive(e)} title="Retrieve">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
    </>
  )
}

export default Navbar
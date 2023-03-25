import React from 'react';
import "./test.css";
import myimage from "./image.jpeg";
const Chatpage = () => {
  return (
    <div>
      <div className="wrap">
            <div className="header">
                <div className="image"><img src={myimage} alt="No pic"/></div>
                <div className="number">0791959876</div>
            </div>
            <div className="messages">
                <div className="message1">message1</div>
                <div className="message2">message2</div>
                <div className="message1">message1</div>               
            </div>
    </div>
    </div>
  )
}

export default Chatpage;
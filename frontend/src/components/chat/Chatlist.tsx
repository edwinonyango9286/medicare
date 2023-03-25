import React from 'react';
import "./test.css";
import "../../query/chat";
import myimageicon from "./image.jpeg";
import { useState } from "react";
import "./test.css";
import myimage from "./image.jpeg";
// import { useHistory  } from "react-router-dom";
import { Link } from 'react-router-dom';


function Chatlist(){
  // show and hide the div
  const [showDiv , setShowDiv] = useState(false);
  const [showChat , setShowChat] = useState(false);

  const handleDivClick = () => {
    setShowDiv(prevShowDiv => !prevShowDiv);
  };
  const renderchatpage = () =>{
    setShowChat(true);
    
  }
  //
  //render individual chat page
  // const useHistory = useHistory();

  return (

<div>
  <button onClick={handleDivClick}   >
    <img src={myimageicon} alt="" width="30px" height="30px" id="image" /> 
  </button>
{ showDiv && (
  <div className="container" id="chatimage" >
      <div className="container-header">
              CHAT LIST HEADER 
      </div>
          <hr />
          <div className="chat" id="chat1"></div><hr />
            {/* displaychats from the database */}
                <Link to="/chat/chatpage"><div className="chat">CHAT</div><hr /></Link>
                {/* <div className="chat" onClick={renderchatpage}>CHAT</div><hr />
                {
                  showChat && (
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
                  )
                } */}


      
  </div>)}


</div>
  );
}
// function displaychats(){
//   const chat = document.getElementById("chatimage");
//   var displays= chat.style.visibility;
//   var button=document.getElementById("image");
//   if(displays=="visible"){
//       chat.style.visibility='collapse';
//   }
//  else{
//   chat.style.visibility='visible';
//  }

//  document.getElementById("chatimage") = "visible";
// }

export default Chatlist;
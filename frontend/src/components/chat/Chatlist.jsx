import React from 'react';
import "./test.css";
import "./image.jpeg";

const Chatlist = () => {
  return (

<div>
  <div className="container" id="chatimage" >
      <div className="container-header">
              CHAT LIST HEADER
      </div>
          <hr />
          <div className="chat" id="chat1"> <a href="chat.html">CHAT</a> </div><hr />
            {/* displaychats from the database */}
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />
              <div className="chat">CHAT</div><hr />

  </div>
  <button
  //  onClick={displaychats}
   >
    <img src={'image.jpeg'} alt="" width="30px" height="30px" id="image" />
    </button>



</div>
  )
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
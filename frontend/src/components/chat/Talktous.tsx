import React, { useState } from 'react';
import "./talktous.css";
function Talktous() {
  const [showDiv, setShowDiv] = useState(false);
  const [showStartChat, setShowStartChat] = useState(false);

  const handlefirstClick = () => {
    setShowDiv(!showDiv);
  };

  const handlecloseClick = () => {
    setShowDiv(false);
  };

  const startchat = () => {
    setShowStartChat(true);
  };

  return (
    <>
      <h1>Make a consultation with one of our doctors</h1>

      <a className='blantershow-chat' onClick={handlefirstClick} title='Show Chat'>
        <i className='fab fa-whatsapp'></i>How can I help you?
      </a>
      {showDiv && (
        <div id='whatsapp-chat' className='show'>
          <div className='header-chat'>
            <div className='head-home'>
              <h3>Hello!</h3>
              <p>
                Click one of our representatives below to chat on WhatsApp or send us an email to rioblanter@gmail.com
              </p>
            </div>
          </div>

          <a className='informasi' title='Chat Whatsapp' onClick={startchat}>
            <div className='info-avatar'>
              <img src='https://2.bp.blogspot.com/-y6xNA_8TpFo/XXWzkdYk0MI/AAAAAAAAA5s/RCzTBJ_FbMwVt5AEZKekwQqiDNqdNQJjgCLcBGAs/s70/supportmale.png' />
            </div>
            <div className='info-chat'>
              <span className='chat-label'>Support</span>
              <span className='chat-nama'>Customer Service 1</span>
            </div>
            <span className='my-number'>6281977094280</span>
          </a>
          <div className='blanter-msg'>
            Call us to <b>+62123456789</b> from <i>0:00hs a 24:00hs</i>
          </div>
          <div id='get-number'></div>
          <a className='close-chat' onClick={handlecloseClick}>
            ×
          </a>

          {showStartChat && (
            <div id="whatsapp-chat" className='single-chat' >
            <div className="header-chat">
                <div className="get-new show">
                    <div id="get-label">Support</div>
                    <div id="get-nama">Customer Service 1</div>
                </div>
            </div>
            <div className="start-chat show" id='chat-slide'>
                <div>
                <div className="chat-area">
                    <div className="sender-text">Hello! What can I do for you? </div>
                    <div className="receiver-text">Hello! What can I do for you? </div>   
                    <div className="sender-text">Hello! What can I do for you? </div>   
                    <div className="receiver-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                    <div className="sender-text">Hello! What can I do for you?</div>   
                </div>          
                </div>
                
                <div className="blanter-msg">
                    <textarea id="chat-input" placeholder="Write a response" ></textarea>
                    <a href="javascript:void;" id="send-it">Send</a>
                </div>
            </div>
            <div id="get-number">6281977094280</div>
            <a className='close-chat' onClick={handlecloseClick}>
            ×
          </a>
        </div>
          )}
        </div>
      )}
    </>
  );
}

export default Talktous;

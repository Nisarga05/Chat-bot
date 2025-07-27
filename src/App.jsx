
import React, { useRef, useState,  useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";


const App = () => {
  const[chatHistory, setChatHistory] =useState([]);
  const chatBodyRef = useRef();

    
 const generateBotResponse = async (history) => {
  const updateHistory = (text) => {
  setChatHistory((prev) => [
    ...prev.filter((msg) => msg.text !== "thinking..."),
    { role: "model", text }
  ]);
};

  
  const formattedHistory = history.map(({ role, text }) => ({
    role,
    parts: [{ text }]
  }));

  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: formattedHistory })
  };

  try {
    
    const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);

    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    
    const data = await response.json();
    const apiResponseText= data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    updateHistory(apiResponseText);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
};


useEffect(() => {
  chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight,behavior:"smooth"});
},[chatHistory]);

  return ( 
  <div className= "container">
    <div className="chatbot-popup">
    {/* Chatbot Header */}
      <div className="chat-header">
        <div className="header-info">
          <ChatbotIcon />
          <h2 className="logo-text">Chatbot</h2>
        </div> 
        <button 
        className="material-symbols-rounded">keyboard_arrow_down</button>     
        </div> 
        {/* Chatbot Body */}  
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
          <ChatbotIcon />
          <p className="message-text">
            Hello!<br/> How can I assist you today?
          </p>
          </div>

          {chatHistory.map((chat,index) =>(
            <ChatMessage key={index} chat={chat}/>
          ))} 
      
        </div>

        {/* chatbot footer */}
        <div className="chat-footer">
        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory}generateBotResponse = {generateBotResponse}/>
        </div>
      </div>  
    </div>
    );
 
  
};

export default App


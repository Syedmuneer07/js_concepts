import React from "react";
import { useState } from "react";
import axios from "axios";



const Form = () => {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleNameChange = (e) => setName(e.target.value);

  const handleMessageChange = (e) =>setMessage(e.target.value);

    const handleSumbit = (e) => {
      e.preventDefault();

      const formName = name.trim();
      const formMessage = message.trim();

      if(formName === "" || formMessage === ""){
        alert("Please fill in all the fields");
        return;
      }
      if(formName.length < 3){
        alert("Name must be at least 3 characters long");
        return;
      }
      if(formMessage.length < 5){
        alert("Message must be at least 5 characters long");
        return;
      }
      if(formMessage.length > 100){
        alert("Message must be less than 100 characters long");
        return;
      }
      const response = axios.post("https://mypager-8b8c2-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json", {
        name: formName,
        message: formMessage,
      });
      console.log(response);
      console.log(name, message);
        setName("");
        setMessage("");
    }

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-title">Send a message to your friend</div>
        <div className="form-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>

          <input
            className="form-input"
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageChange}
          />

        </div>
        <div className="form-btn">
          <button type="submit" onClick={handleSumbit}>Send</button>
        </div>
        
      </form>
    </div>
  );
};

export default Form;

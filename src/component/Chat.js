import React from "react";
import { Outlet } from "react-router-dom";
import "./Chat.css"

const Chat = () => {


    return (
        <div>
            <div className="chat-container">
                <div className="chat-content">
                    <p>Username</p>
                    <p>Game: </p>
                    <p>Platform: </p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Chat
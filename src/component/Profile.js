import React from "react";
import { Outlet } from "react-router-dom";
import "./Profile.css"

const Profile = () => {

    return(
        <div>
            <div className="profile-container">
                <div className="profile-content">
                    
                    <p> User name</p>
                    <p> Total swaps: </p>
                    <p> ความคิดเห็นในการแลกเปลี่ยน: </p>
                    <p> รีพอร์ต: </p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile
import React from "react"
import "./Navbar.css"
import { Outlet,NavLink, useNavigate } from "react-router-dom"
import iconNoti from "./image/bell.png"
import iconSearch from "./image/search.png"
import iconFilter from "./image/filter.png"
import iconChat from "./image/chat.png"
import iconProfile from "./image/profile.png"
import iconLogout from "./image/logout.png"

function Navbar() {
    const navigate = useNavigate()
    const changePage = (value) => {
        //for Search
    }

    return(
        <div>
            <div className="container1" id="container1">
                <div className="logo">
                    <NavLink end to="/" className="pliangames">เปลี่ยนเกมส์</NavLink>
                </div>
                <div className="mypost">
                    <NavLink to="/mypost" className="icon-mypost">My Post</NavLink>
                </div>
                <div className="searchBar">
                    <div className="text-search">
                        <input type="text" placeholder="ค้นหาเกม" id="search"/>
                    </div>
                    <button className="btn-search">
                        <img src={iconSearch} alt="icon-search" className="icon-search"/>
                    </button>
                    <button className="btn-filter">
                        <img src={iconFilter} alt="icon-filter" className="icon-filter"/>
                    </button>
                </div>
                <div className="icon-group">
                    <button className="btn-noti">
                        <img src={iconNoti} alt="icon-noti" className="icon-noti"/>
                    </button>
                    <button className="btn-chat">
                        <NavLink to="/chat"> <img src={iconChat} alt="icon-chat" className="icon-chat"/> </NavLink>
                    </button>
                    <button className="btn-profile">
                        <NavLink to="/profile"> <img src={iconProfile} alt="icon-profile" className="icon-profile"/> </NavLink>
                    </button>
                    <button className="btn-logout">
                        <NavLink to="/profile"> <img src={iconLogout} alt="icon-logout" className="icon-logout"/> </NavLink>
                    </button>
                </div>
                

            </div>
            

            <Outlet />
        </div>
    )
}

export default Navbar
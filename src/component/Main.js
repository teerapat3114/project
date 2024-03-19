import React,{useEffect, useState} from "react";
import { Outlet} from 'react-router-dom'
import "./Main.css"
import iconChat from "./image/chat.png"
import  Axios  from "axios";


const Main = () => {

    const [post, setPost] = useState([])

    useEffect(()=>{
        Axios.get('/main')
        .then(res=>{
            setPost(prevPost => {
                return res.data
            })
        })
        .catch(err => console.log(err))
    },[])

    function checkPlace (place){
        if(place === "undefined"){
            return <br></br>
        }else{
            return "สถานที่: " + place
        }
    }

    const postList = post.map((e,i) => (
        <div className="post" key={e.id}>
            <div className="post-title">
                <p>{e.format}</p> 
                <p id="placeId">{checkPlace(e.place)}</p>
            </div>
            <div className="post-image">
                <img src={`http://localhost:4000/images/`+e.picture} alt="game"/>
            </div>
            <div className="post-detail">
                <p>Game: {e.game}</p>
                <p>Platform: {e.platform}</p>
                <br></br>
                <p>Wanted game: {e.wantedGame}</p>
                <p>Wanted platform: {e.wantedPlatform}</p>
                <button type="button" className="btn-message" >
                    <img src={iconChat} alt="icon-message" className="icon-message"/>
                    ส่งข้อความ</button>
            </div>
        </div>
    ))

    return(
        <div className="mainPage">
            <div className="post-container">
                <ul className="post-list">
                    {postList}
                </ul>
            </div>

            <Outlet />
        </div>
    )
}

export default Main

// export const MainLoader = async () => {
// 	const res = await fetch('/')
// 	if (!res.ok) {
// 		throw Error('Could not fetch the products')
// 	}
// 	return res.json()
// }
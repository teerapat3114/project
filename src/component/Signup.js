import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
    const [userName, setUserName] = useState('')
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [match, setMatch] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        document.getElementById('container1').style.display = "none"
    },[])

    return(
        <div className="signup-page">
            {success ? (
                <div className="signup-success">
                    <p>Sigup success, <a href="/login">Login</a></p>
                </div>
            ) : (
                <div className="signup-container">
                    <p className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                    <h1>Signup</h1>
                    <form>
                        <label htmlFor="userName">Username</label>
                        <input type="text" id="userName" autoComplete="off"/>
                    </form>
                </div>
                

            )}

            <Outlet />
        </div>
    )
}

export default Signup
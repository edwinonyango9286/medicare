import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IsAuthenticated } from '../libs/user'

function Base({children}){
    
    const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className="py-5 shadow-xl bg-transparent text-gray-300 text-2xl text-center">
                <Link className='mx-4' to="/">
                    <button className="medicare-nav-link">Home</button>
                </Link>
                {!IsAuthenticated && (
                    <React.Fragment>
                    <Link className='transition mx-4' to="/auth-user-login">
                        <button className="medicare-nav-link">Login</button>
                    </Link>

                    <Link className='mx-4' to="/auth-user-register">
                        <button className="medicare-nav-link">Register</button>
                    </Link>
                    </React.Fragment>
                )}
                {IsAuthenticated && (
                    <React.Fragment>
                        <Link className='mx-4' to="/profile">
                            <button className='medicare-nav-link'>Profile</button>
                        </Link>
                        <Link to="" onClick={() => {
                            Cookies.get("session_id")
                            navigate("/")
                            window.location.reload()
                        }}>
                            <button className='medicare-nav-link'>Logout</button>
                        </Link>
                    </React.Fragment>
                )}
            </div>
            <div className="p-5">{children}</div>
        </React.Fragment>
    )
}

export default Base;
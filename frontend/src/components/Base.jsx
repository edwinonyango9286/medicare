import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IsAuthenticated } from '../libs/user'
import { HomeIcon, QueueListIcon, UserPlusIcon } from '@heroicons/react/24/solid'

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
                            Cookies.remove("session_id")
                            navigate("/")
                            window.location.reload()
                        }}>
                            <button className='medicare-nav-link'>Logout</button>
                        </Link>
                    </React.Fragment>
                )}
            </div>
            <div className="flex flex-row">
                <div className='pt-3 basis-64 min-h-screen shadow-lg bg-gradient-to-r to-sky-700 from-violet-800'>
                    <Link to="/">
                        <p className='medicare-dashboard-link'>
                            <HomeIcon className='medicare-dashboard-link-icon'/> Dashboard
                        </p>
                    </Link>

                    <Link to="/doctor-list">
                        <p className='medicare-dashboard-link'>
                            <QueueListIcon className='medicare-dashboard-link-icon' /> Doctor List
                        </p>
                    </Link>
                    
                    <Link to="/add-doctor">
                       <p className='medicare-dashboard-link'>
                            <UserPlusIcon className='medicare-dashboard-link-icon' /> Add Doctor
                       </p>
                    </Link>

                    <Link to="/patient-list">
                        <p className='medicare-dashboard-link'>
                            <QueueListIcon className='medicare-dashboard-link-icon' /> Patient List
                        </p>
                    </Link>

                </div>
                <div className="p-3 w-full">{children}</div>
            </div>
        </React.Fragment>
    )
}

export default Base;
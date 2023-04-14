import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Talktous from './chat/Talktous';
import { IsAuthenticated, UserLogout } from '../libs/user';
import { user_profile } from '../query/user';

const Base = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const LoadUser = () => {
        user_profile()
            .then(response => {
                setUser(response.data.user)
            })
    }

    useEffect(() => {
        LoadUser()
        if (!IsAuthenticated()) {
            navigate("/auth-user-login")
        }
    }, [])

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className='nav-link text-white'>Home</Link>
                            </li>
                            {IsAuthenticated() ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/appointment">Appointment</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/user-profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/pay">make payment</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/auth-user-logout">Logout</Link>
                                    </li>
                                </React.Fragment> :
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/auth-user-login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/auth-user-register">Register</Link>
                                    </li>
                                </React.Fragment>
                            }
                        </ul>
                        {IsAuthenticated() && (
                            <div className="navbar-end is-flex">
                            <div className='d-flex flex-column'>
                                <span>{user?.username}</span>
                                <i>{user?.email}</i>
                            </div>
                                <div className="image" style={{maxWidth:"45px"}}>
                                    <img src={"http://localhost:8000"+user?.image} alt="" className="mx-2 is-rounded" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className='p-3 m-2 box'>{children}</div>
            <Talktous />
        </React.Fragment>
    )
}

export default Base
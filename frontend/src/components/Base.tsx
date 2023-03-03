import React,{ReactNode} from 'react'
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { UserLogout } from '../libs/user';

const Base: React.FC<{ children: ReactNode }> = ({children}) =>{  

  return (
    <React.Fragment>
        <nav className="navbar is-link has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            <span className="navbar-item is-size-4 has-text-primary">Medicare</span>
        
            <Link to="#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </Link>
            </div>
        
            <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
                <Link to="/" className="navbar-item">
                Home
                </Link>
        
                <Link to="#" className="navbar-item">
                Documentation
                </Link>
        
                <div className="navbar-item has-dropdown is-hoverable">
                <Link to="#" className="navbar-link">
                    Account
                </Link>
        
                <div className="navbar-dropdown px-2">
                    <Link to="#" className="navbar-item">Profile Setting</Link>
                    <hr className="navbar-divider" />
                    <Link to="/auth-user-login" 
                    onClick={() => {UserLogout()}} 
                    className="navbar-item">Logout</Link>
                </div>
                </div>
            </div>
        
            <div className="navbar-end">
                    <Link to="/auth-user-register" className="navbar-item">Sign up</Link>
                    <Link to="/auth-user-login" className="navbar-item">Log in</Link>
            </div>
            </div>
        </nav>
        <div className='p-4'>{children}</div>
    </React.Fragment>
  )
}

export default Base
import Cookies from 'js-cookies'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import "../../assets/Loginstyle.css"
import { user_login } from '../../query/user';

function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const { email, password } = input;
    const UpdateInput = (name) => (event) => {
        setInput({ ...input, [name]: event.target.value })
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordShown = () => {
        setPasswordShown(!passwordShown);
    }

    const [error, setError] = useState("")

    const SubmitForm = (event) => {
        event.preventDefault();
        if (email.length === 0 || password.length === 0) {
            alert("Please fill out all fields");
        } else {
            user_login(input)
                .then(response => {
                    if (response.data.success) {
                        Cookies.setItem("session_id", response.data.token)
                        navigate("/")
                    } else {
                        setError(response.data.error)
                    }
                })
        }
    }

    const [proceed, setProceed] = useState(true)
    useEffect(() => {
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh" }}>
            {proceed && (
                <div className="mdc-container">
                    <span className="is-size-3">Medicare</span>
                    <hr />
                    <div className="mdc-title">Login</div>
                    {error && (<div className="has-text-danger mt-2">{error}</div>)}
                    <div className="mdc-content">
                        <form onSubmit={SubmitForm} action="#">
                            <div className="mdc-user-details">
                                <div className="mdc-input-box" >
                                    <span className="mdc-details">Email</span>
                                    <input type="email" value={email} onChange={UpdateInput('email')} placeholder="Enter your email" required />
                                </div>

                                <div className="mdc-input-box">
                                    <span className="mdc-details">Password</span>
                                    <input type={passwordShown ? "text" : "password"} value={password} onChange={UpdateInput('password')} placeholder="Enter your password" required />
                                </div>
                            </div>
                            <div className="mt-3">
                                <input type="checkbox" className="mr-3 is-clickable" onClick={TogglePasswordShown} id="showpass" />
                                <label htmlFor="showpass" className="is-clickable">show password</label>
                            </div>
                            <div className="mdc-button">
                                <input type="submit" value="Login" />
                            </div>
                            <div className="mdc-auth-links">
                                <Link to="/auth-user-register">Create account ?</Link>
                                <Link to="/auth-forgot-password">Forgot password ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
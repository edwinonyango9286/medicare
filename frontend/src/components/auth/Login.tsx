import { useMutation } from "react-query";
import request, { gql } from 'graphql-request';
import Cookies from 'ts-cookies'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../backend'
import { useEffect, useState } from "react";
import "../../assets/Loginstyle.css"
import {IsAuthenticated} from '../../libs/user'

function Login() {
    const navigate = useNavigate();
    const [input,setInput] = useState({
        username : "",
        password : "",
    })

    const { username,password } = input;
    const UpdateInput = (name : string) => (event : any) =>{
        setInput({...input,[name]:event.target.value})
    }

    const [passwordShown,setPasswordShown] = useState(false);
    const TogglePasswordShown = () =>{
        setPasswordShown(!passwordShown);
    }

    const [error,setError] = useState("")

    const SignInMutation = gql`
        mutation{
            tokenAuth(email:"${username}",password:"${password}"){
              token
            }
          }
    `;

    const SignIn = useMutation(() => request(
        API_URL,
        SignInMutation,
    ),{
        onSuccess: (data : any) => {
            Cookies.set('session_id',data.tokenAuth.token)
            // window.location.reload()
            navigate('/')
        },onError(error, variables, context) {
            setError("please enter valid credentials");
        },
    });

    const SubmitForm = (event:any) =>{
        event.preventDefault();
        if(username.length===0 || password.length===0){
            alert("Please fill out all fields");
        }else{
            SignIn.mutate()
        }
    }

    const [proceed,setProceed] = useState(false)
    useEffect(() => {
        if(IsAuthenticated()){
            navigate("/")
        }else{
            setProceed(true);
        }
    },[])

    return (
        <div className="is-flex is-justify-content-center is-align-items-center" style={{width:"100vw",height:"100vh"}}>
            {proceed &&(
                <div className="mdc-container">
                    <span className="is-size-3">Medicare</span>
                    <hr />
                    <div className="mdc-title">Login</div>
                    {error &&(<div className="has-text-danger mt-2">{error}</div>)}
                    <div className="mdc-content">
                        <form onSubmit={SubmitForm} action="#">
                            <div className="mdc-user-details">
                                <div className="mdc-input-box" >
                                    <span className="mdc-details">Email</span>
                                    <input type="email" value={username} onChange={UpdateInput('username')} placeholder="Enter your email" required />
                                </div>
                                
                                <div className="mdc-input-box">
                                    <span className="mdc-details">Password</span>
                                    <input type={passwordShown ? "text" : "password"} value={password} onChange={UpdateInput('password')} placeholder="Enter your password" required />
                                </div>
                            </div>
                            <div className="mt-3">
                                <input type="checkbox" className="mr-3 is-clickable" onClick={TogglePasswordShown} id="showpass"/>
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
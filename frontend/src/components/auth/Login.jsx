import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from "react-query";
import request, { gql } from 'graphql-request';
import { Link, useNavigate } from 'react-router-dom'
import Base from '../Base'
import { API_URL } from '../../backend'
import Cookies from 'js-cookie'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { IsAuthenticated } from '../../libs/user';

function Login(){

    const navigate = useNavigate()

    const [error,setError] = useState(null)

    const [data,setData] = React.useState({
        username:"",
        password:"",
    })
    const {username,password} = data;
    const UpdateData = (name) => (event) =>{
        setData({...data,[name]:event.target.value})
    } 

    const [showpass,setShowPass] = React.useState(false)
    const TogglePassword = () => {
        setShowPass(!showpass)
    }

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
        onSuccess: (data) => {
            Cookies.set('session_id',data.tokenAuth.token)
            window.location.reload()
            navigate('/')
        },onError(error, variables, context) {
            setError("please enter valid credentials")
        },
    });

    const SubmitForm = (event) =>{
        event.preventDefault();
        if(username.length===0 || password.length===0){
            alert("Please fill out all fields");
        }else{
            SignIn.mutate()
        }
    } 

    const [proceed,setProceed] = useState(false)
    const [auth,setAuth] = useState(false)

    useEffect(() =>{
        setAuth(IsAuthenticated)
        setProceed(true)
    })

    if(auth){
        navigate("/")
    }

    else{
        return(
            <Base>
                {proceed &&(
                    <div className='flex justify-center align-middle text-2xl'>
                        <div className="flex flex-row justify-items-center w-max">
                            <div className="flex-col text-white flex self-center p-10 sm:max-w-5xl xl:max-w-2xl">
                                <div className="self-start hidden lg:flex flex-col text-dark">
                                <h1 className="mb-3 font-bold text-5xl">Welcome to Medicare </h1>
                                <p className="pr-3">some health info</p>
                                </div>
                            </div>
                            <div className="flex justify-center self-center text-xl">
                                <div className="p-12 bg-gradient-to-br from-violet-900 to-sky-600 shadow-2xl mx-auto rounded-2xl w-100 ">
                                    <div className="mb-4 text-white border-b-2 border-slate-700">
                                        <h3 className="font-semibold text-4xl">Sign In </h3>
                                        <p className='text-2xl'>Please sign in to your account.</p>
                                    </div>
                                    {error &&(<div className="my-3 text-center text-red-300">{error}</div>)}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Email</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="email" value={username} onChange={UpdateData('username')} placeholder="mail@gmail.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="mb-5 text-lg font-medium text-white tracking-wide">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input className="w-full bg-sky-400 content-center text-xl px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                                type={showpass ? "text" : "password"} value={password} onChange={UpdateData('password')} placeholder="Enter your password" />
                                                {showpass ? <EyeSlashIcon onClick={TogglePassword} className='h-6 w-6 absolute right-1 top-3 cursor-pointer'/> 
                                                : <EyeIcon onClick={TogglePassword} className='h-6 w-6 absolute right-1 top-3 cursor-pointer'/> }
                                            </div>
                                        </div>
                                        <div className="flex text-lg items-center justify-between">
                                            <div className="">
                                                <Link to="#" className="text-xl text-white hover:text-white">
                                                Forgot your password ?
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" onClick={SubmitForm} className="w-full flex justify-center bg-blue-500  hover:bg-blue-400 text-white p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                Sign in
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-5 text-center text-gray-400">
                                        <span>
                                            <Link to="/auth-user-register" className="text-white text-xl hover:text-white">Don't have an account?Sign up</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Base>
        )
    }
}

export default Login;
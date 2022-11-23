import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../Base'

function Login(){

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

    const SubmitForm = (event) =>{
        event.preventDefault();
        if(username.length===0 || password.length===0){
            alert("Please fill out all fields");
        }
    } 

    return(
        <Base>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className="self-start hidden lg:flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-5xl">Welcome to Medicare </h1>
                    <p className="pr-3">some health info</p>
                    </div>
                </div>
                <div className="flex justify-center self-center text-xl z-10">
                    <div className="p-12 bg-gray-100 mx-auto rounded-2xl w-100 ">
                        <div className="mb-4 border-b-2 border-slate-900">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                            <p className="text-gray-500">Please sign in to your account.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-lg font-medium text-gray-700 tracking-wide">Email</label>
                                <input className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type="email" value={username} onChange={UpdateData('username')} placeholder="mail@gmail.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="mb-5 text-lg font-medium text-gray-700 tracking-wide">
                                    Password
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type={showpass ? "text" : "password"} value={password} onChange={UpdateData('password')} placeholder="Enter your password" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="show_password" name="show_password" type="checkbox" onClick={TogglePassword} className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer" />
                                    <label htmlFor="show_password" className="ml-2 block text-lg text-gray-800">
                                        show password
                                    </label>
                                </div>
                                <div className="text-lg">
                                    <Link to="#" className="text-green-500 hover:text-green-700">
                                    Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <button type="submit" onClick={SubmitForm} className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <div className="pt-5 text-center text-gray-400 text-xs">
                            <span>
                                <Link to="/auth-user-register" className="text-slate-900 text-xl hover:text-green-700 ">Don't have an account?Sign up</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Login;
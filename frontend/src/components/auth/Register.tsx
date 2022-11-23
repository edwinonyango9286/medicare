import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../Base'
import {backgroundImage} from '../../assets/background-health.jpg'

function Register(){

    const [data,setData] = React.useState({
        email:"",
        password:"",
        first_name:"",
        last_name:"",
        confirm_password:"",
    })
    const {email,first_name,last_name,password,confirm_password} = data;

    // const validemail: RegExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z])

    const UpdateData = (name) => (event) =>{
        setData({...data,[name]:event.target.value})
    } 

    const [PasswordMatchError,setPasswordMatchError] = React.useState(false);

    const UpdatePassword = (name) => (event) => {
        setData({...data,[name]:event.target.value})
        if(name==="confirm_password"){
            if(password!==event.target.value){
                setPasswordMatchError(true);
            }else{
                setPasswordMatchError(false);
            }
        }else if(name==="password"){
            if(confirm_password!==event.target.value){
                setPasswordMatchError(true);
            }else{
                setPasswordMatchError(false);
            }
        }
    }

    const [showpass,setShowPass] = React.useState(false)
    const TogglePassword = () => {
        setShowPass(!showpass)
    }

    const SubmitForm = (event) =>{
        event.preventDefault();
        if(email.length===0 || password.length===0){
            alert("Please fill out all fields");
        }
    } 

    return(
        <Base>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex self-center p-10 sm:max-w-3xl xl:max-w-xl  z-10">
                    <div className="self-start hidden lg:flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-5xl">Welcome to Medicare </h1>
                    <p className="pr-3">some health info</p>
                    </div>
                </div>
                <div className="flex justify-center basis-1/3 w-100 self-center text-xl z-10 flex flex-row">
                    <div className="p-12 bg-gray-100 basis-3/4 mx-auto rounded-2xl w-100" style={{width:"100%"}}>
                        <div className="mb-4 border-b-2 border-slate-900">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
                            <p className="text-gray-500">Create your medicare account.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <input className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type="email" value={email} onChange={UpdateData('email')} placeholder="your email" />
                            </div>

                            <div className="space-y-2">
                                <input className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type="text" value={first_name} onChange={UpdateData('first_name')} placeholder="First name" />
                            </div>

                            <div className="space-y-2">
                                <input className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type="text" value={last_name} onChange={UpdateData('last_name')} placeholder="Last name" />
                            </div>

                            <div className="space-y-2">
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type={showpass ? "text" : "password"} value={password} onChange={UpdatePassword('password')} placeholder="Enter your password" />
                            </div>

                            <div className="space-y-2">
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                type={showpass ? "text" : "password"} value={confirm_password} onChange={UpdatePassword('confirm_password')} placeholder="Re-enter your password" />
                            </div>

                            {PasswordMatchError &&(
                                <div className="space-y-2 text-red-400">
                                    <p>Passwords do not match</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="show_password" name="show_password" type="checkbox" onClick={TogglePassword} className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer" />
                                    <label htmlFor="show_password" className="ml-2 block text-lg text-gray-800">
                                        show password
                                    </label>
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
                                <Link to="/auth-user-login" className="text-slate-900 text-xl hover:text-green-700 ">Already have an account?Sign In</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Register;
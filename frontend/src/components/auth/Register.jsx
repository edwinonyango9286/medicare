import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import request, {gql} from 'graphql-request';
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import Base from '../Base'
import { API_URL } from '../../backend'
import {setCookie} from 'typescript-cookie'
import { StoreContext } from '../../store/store';
import { IsAuthenticated } from '../../libs/user';
import { useGetCounties, useGetCountySubcounties } from '../../query/location';

function Register(){

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const [currentPage,setPage] = React.useState(0)

    const NextPage = () =>{
        setPage(currentPage+1)
    }

    const PreviousPage = () =>{
        setPage(currentPage-1)
    }

    setCookie('usercounty',1)

    const [data,setData] = React.useState({
        email:"",
        phoneNumber:"",
        nationalId:"",
        firstName:"",
        lastName:"",
        gender:"MALE",
        dateOfBirth:"",
        county:"",
        subcounty:"",
        password:"",
        password2:""
    })

    const {email,phoneNumber,firstName,lastName,gender,dateOfBirth,nationalId,county,subcounty,password,password2} = data;

    const [image,setImage] = React.useState(null)
    const ChangeImage = (event) =>{
        setImage(event.target.files[0])
    }

    const UpdateData = (name) => (event) =>{
        setData({...data,[name]:event.target.value})
        if(name==="county"){
            setCookie('usercounty',event.target.value)
            queryClient.invalidateQueries('countySubcounties')
        }
    } 

    const [showpass,setShowPass] = React.useState(false)
    const TogglePassword = () => {
        setShowPass(!showpass)
    }

    const SignUpMutation = gql`
        mutation registeruser($file: Upload!){
            registerUser(
                firstName:"${firstName}",
                lastName:"${lastName}",
                email:"${email}",
                nationalId:"${nationalId}",
                phoneNumber:"${phoneNumber}",
                dateOfBirth:"${dateOfBirth}",
                gender:"${gender}",
                image:$file,
                location:"${subcounty}",
                password:"${password}",
                password2:"${password2}"
            ){
                errors
            }
          }
    `;

    const SignUp = useMutation(() => request(
        API_URL,
        SignUpMutation,
        {
            file : image
        }
    ),{
        onSuccess: (data) => {
            console.log(data)
        },onError: (data) => {
            console.log(JSON.parse(data))
        }
    });

    const SubmitForm = (event) =>{
        event.preventDefault();
        if(email.length===0 || password.length===0){
            alert("Please fill out all fields");
        }else{
            SignUp.mutate()
        }
    } 

    const [proceed,setProceed] = useState(false)
    const [auth,setAuth] = useState(false)

    useEffect(() =>{
        setAuth(IsAuthenticated)
        setProceed(true)
    },[])


    const {data:countyData} = useGetCounties()
    const {data:subcountyData} = useGetCountySubcounties()

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

                            
                            <div className={currentPage == 0 ? "flex justify-center self-center text-xl" : "hidden"}>
                                <div className="p-12 bg-gradient-to-br from-violet-900 to-sky-600 shadow-2xl mx-auto rounded-2xl w-100">
                                    <div className="mb-4 text-white border-b-2 border-slate-700">
                                        <h3 className="font-semibold py-2 text-4xl">Create Account</h3>
                                        <p className='pb-2'>Personal Information</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">User Image</label>
                                            {image != null &&(
                                                <div className="flex flex-row justify-start">
                                                    <div className="basis-1/3">
                                                        <img src={URL.createObjectURL(image)} alt="" />
                                                    </div>
                                                </div>
                                            )}
                                        
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="file" accept='image/*' onChange={ChangeImage} placeholder="image" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">First Name</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="text" value={firstName} onChange={UpdateData('firstName')} placeholder="First Name" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Last Name</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="text" value={lastName} onChange={UpdateData('lastName')} placeholder="Last Name" />
                                        </div>

                                        <div className='flex flex-row justify-end'>
                                            <button type="button" onClick={NextPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-3xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                Next &gt;&gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={currentPage == 1 ? "flex justify-center self-center text-xl" : "hidden"}>
                                <div className="p-12 bg-gradient-to-br from-violet-900 to-sky-600 shadow-2xl mx-auto rounded-2xl w-100">
                                    <div className="mb-4 text-white border-b-2 border-slate-700">
                                        <h3 className="font-semibold py-2 text-4xl">Create Account</h3>
                                        <p className="pb-2">Personal Details</p>
                                    </div>
                                    <div className="space-y-6">

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Gender</label>
                                            <select className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            value={gender} onChange={UpdateData('gender')}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Date Of Birth</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="date" value={dateOfBirth} onChange={UpdateData('dateOfBirth')} />
                                        </div>


                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">National Id</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="text" value={nationalId} onChange={UpdateData('nationalId')} />
                                        </div>

                                        <div className='flex flex-row justify-between'>
                                            <button type="button" onClick={PreviousPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                &lt;&lt; Previous
                                            </button>

                                            <button type="button" onClick={NextPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                            Next &gt;&gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={currentPage == 2 ? "flex justify-center self-center text-xl" : "hidden"}>
                                <div className="p-12 bg-gradient-to-br from-violet-900 to-sky-600 shadow-2xl mx-auto rounded-2xl w-100 ">
                                    <div className="mb-4 text-white border-b-2 border-slate-700">
                                        <h3 className="font-semibold py-2 text-4xl">Create Account</h3>
                                        <p className="pb-2">Location and Address</p>
                                    </div>
                                    <div className="space-y-6">

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Phone Number</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="text" value={phoneNumber} onChange={UpdateData('phoneNumber')} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">County</label>
                                            <select className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            value={county} onChange={UpdateData('county')}>
                                                <option value="">-----------------------------------</option>
                                                {countyData &&(
                                                    <React.Fragment>
                                                        {countyData.counties.map((county,index) => (
                                                            <option key={index} value={county.countyCode}>{county.countyName}</option>
                                                        ))}
                                                    </React.Fragment>
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Sub County {subcounty}</label>
                                            <select className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            value={subcounty} onChange={UpdateData('subcounty')}>
                                            <option value="">-----------------------------------</option>
                                                {subcountyData && (
                                                    <React.Fragment>
                                                        {subcountyData.countySubcounties.map((subcounty,index) => (
                                                            <option key={index} value={subcounty.subcountyCode}>{subcounty.subcountyName}</option>
                                                        ))}
                                                    </React.Fragment>
                                                )}
                                            </select>
                                        </div>

                                        <div className='flex flex-row justify-between'>
                                            <button type="button" onClick={PreviousPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                &lt;&lt; Previous
                                            </button>

                                            <button type="button" onClick={NextPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                            Next &gt;&gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={currentPage == 3 ? "flex justify-center self-center text-xl" : "hidden"}>
                                <div className="p-12 bg-gradient-to-br from-violet-900 to-sky-600 shadow-2xl mx-auto rounded-2xl w-100 ">
                                    <div className="mb-4 text-white border-b-2 border-slate-700">
                                        <h3 className="font-semibold py-2 text-4xl">Create Account</h3>
                                        <p className="pb-2">Account Credentials</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xl font-medium text-white tracking-wide">Email</label>
                                            <input className="w-full text-xl  bg-sky-400 px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type="email" value={email} onChange={UpdateData('email')} placeholder="mail@gmail.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="mb-5 text-lg font-medium text-white tracking-wide">
                                                Password
                                            </label>
                                            <input className="w-full bg-sky-400 content-center text-xl px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type={showpass ? "text" : "password"} value={password} onChange={UpdateData('password')} placeholder="Enter your password" />
                                        </div>


                                        <div className="space-y-2">
                                            <label className="mb-5 text-lg font-medium text-white tracking-wide">
                                                Confirm Password
                                            </label>
                                            <input className="w-full bg-sky-400 content-center text-xl px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" 
                                            type={showpass ? "text" : "password"} value={password2} onChange={UpdateData('password2')} placeholder="Enter your password" />
                                        </div>

                                        <div className="flex text-lg items-center justify-between">
                                            <div className="flex items-center mr-4">
                                                <input id="show_password" name="show_password" type="checkbox" onClick={TogglePassword} className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer" />
                                                <label htmlFor="show_password" className="ml-2 block cursor-pointer text-xl text-white">
                                                    show password
                                                </label>
                                            </div>

                                        </div>
                                        <div className='flex flex-row justify-between'>
                                            <button type="button" onClick={PreviousPage} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                &lt;&lt; Previous
                                            </button>

                                            <button type="button" onClick={SubmitForm} className="bg-blue-500  hover:bg-blue-400 text-white p-3 rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-5 text-center text-gray-400">
                                        <span>
                                            <Link to="/auth-user-login" className="text-white text-xl hover:text-white">Already have an account?Sign In</Link>
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

export default Register;
import React from 'react'
import { Link } from 'react-router-dom'
import backgroundHealth from '../assets/background-health.jpg'


function Base({children}){
    return(
        <React.Fragment>
            <div className=" w-100 shadow-lg bg-green-700 text-white flex flex-row">

                <div className="basis-1/3 p-2 font-semibold">
                    <p className="text-2xl">MEDICARE</p>
                    <p className="text-lg">Providing Quality health service online</p>
                </div>

                <div className="basis-1/3">
                    <Link style={{height:"100%"}} to="/">
                        <button style={{height:"100%"}} className="px-5 hover:bg-green-800 hover:text-indigo-100">Home</button>
                    </Link>

                    <Link style={{height:"100%"}} to="/auth-user-login">
                        <button style={{height:"100%"}} className="px-5 hover:bg-green-800 hover:text-indigo-100">Sign In</button>
                    </Link>
                </div>

                <div className="basis-1/3 flex flex-row-reverse mr-3">
                    <button type="button" className="text-white bg-transparent focus:outline-none rounded-lg text-sm p-2.5 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

        <div className="bg-no-repeat bg-cover bg-center relative" style={{backgroundImage:`url(${backgroundHealth})`}}>
            <div className="absolute bg-gradient-to-b from-green-400 to-green-200 opacity-75 inset-0 z-0"></div>
                <div className="min-h-screen overflow-scroll p-3">
                    {children}
                    <p className="fixed text-2xl font-semibold text-end mr-3 inset-x-0 bottom-0 text-gray-900">Copyright &copy; {new Date().getFullYear()}</p>
                </div>
        </div>

        </React.Fragment>
    )
}

export default Base;
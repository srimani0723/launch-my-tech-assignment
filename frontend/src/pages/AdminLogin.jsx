import axios from 'axios';
import React, { useState } from 'react'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from 'react-router-dom';
import GoogleButton from '../assets/GoogleIcon';
import { FaArrowLeft } from "react-icons/fa";

function AdminLogin() {
    const [login, setLogin] = useState(true)
    const [viewPass, setViewPass] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const token = Cookies.get("jwt_token")
    const data = Cookies.get("adminData") ? JSON.parse(Cookies.get("adminData")) : null

    if (token) {
        return <Navigate to={`/admin/dashboard/${String(data.id)}`
        } replace />
    }

    const handleGoogle = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
    }

    const onClickHome = () => {
        navigate("/")
    }


    const onSuccessfullLogin = (jwtToken, adminData) => {
        Cookies.set("jwt_token", jwtToken, { expires: 30 })
        Cookies.set("adminData", JSON.stringify(adminData), { expires: 30 })
        navigate(`/admin/dashboard/${String(adminData.id)}`)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (login) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/login/`

            const adminDetails = {
                email: email,
                password: pass,
            }
            try {
                const response = await axios.post(url, adminDetails)
                const jwtToken = response.data.jwtToken
                const adminData = response.data.admin
                onSuccessfullLogin(jwtToken, adminData)

            } catch (err) {
                setErrorMsg(err.response.data.message)
            }
        } else {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/signup/`
            const adminDetails = {
                name: name,
                email: email,
                password: pass,
            }
            try {
                const response = await axios.post(url, adminDetails)
                setLogin(prev => !prev)
                setErrorMsg(response.data.message)

            } catch (err) {
                setErrorMsg(err.response.data.message)
            }
        }
    }

    return (
        <div className='bg-linear-65 from-sky-300 to-purple-300 h-[100vh] flex items-center justify-center'>
            <div className='flex flex-col w-[90%] md:w-[50%] max-w-[400px] rounded-2xl p-6 shadow-2xl shadow-pink-300 bg-linear-65 from-gray-50 to-sky-50 backdrop-blur-lg items-start'>



                <div className='flex items-center justify-between bg-linear-45 from-sky-500 to-purple-500 m-2 rounded-lg w-full md:w-[60%] self-center shadow-lg mb-6 cursor-pointer' onClick={() => { setLogin(prev => !prev) }}>

                    <h1 className={`text-lg font-bold pb-1.5 pt-1 w-[90px] rounded-md text-center flex-1 m-1.5 ${login ? 'bg-white shadow-lg' : ''} ${login ? '' : 'text-white'}`}>Login</h1>

                    <h1 className={`text-lg font-bold pb-1.5 pt-1 flex-1 m-1.5 w-[90px] rounded-md text-center ${!login ? 'bg-white shadow-lg' : ''} ${!login ? '' : 'text-white'}`}>SignUp</h1>
                </div>

                <form className='w-full' onSubmit={handleSubmit}>
                    {!login && <input
                        className='w-full shadow-md rounded-md text-xl p-3 border border-sky-300 outline-none mb-4'
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={() => { setErrorMsg("") }}
                        placeholder='Enter your Name' required />}

                    <input
                        className='w-full shadow-md rounded-md text-xl p-3 border border-sky-300 outline-none mb-4'
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => { setErrorMsg("") }}
                        placeholder='Enter your Email' required />

                    <div className='flex items-center w-full shadow-md rounded-md text-xl  border border-sky-300 outline-none mb-4'>
                        <input
                            className='outline-none p-3 rounded-md w-[90%]'
                            type={viewPass ? "text" : "password"}
                            name="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            onFocus={() => { setErrorMsg("") }}
                            placeholder='Enter your Password' required />

                        <button type='button' className='cursor-pointer pr-3 absolute right-7'
                            onClick={() => setViewPass(prev => !prev)}>
                            {viewPass ? <MdVisibilityOff /> : <MdVisibility />
                            }
                        </button>
                    </div>

                    <button type='submit' className='bg-linear-45 from-sky-500 to-purple-500 pb-2 pt-2 text-lg font-semibold text-white rounded-xl w-full shadow-lg cursor-pointer' onClick={handleSubmit}>
                        {login ? "Login" : "SignUp"}
                    </button>

                    {errorMsg === "" ? null : <p className='text-center text-sm font-semibold text-red-800 mt-1'>{errorMsg}</p>}
                </form>

                <p className='text-center text-md font-bold text-purple-600 mt-3 w-full'>Or</p>

                <div className='w-full text-center'>
                    <GoogleButton onClick={handleGoogle} />
                </div>

                <hr className="border-0 h-1 rounded bg-linear-45 from-sky-500 to-purple-500 animate-pulse my-4 w-full" />

                <button className='text-purple-800 animate-pulse font-bold cursor-pointer mb-3 w-full' onClick={() => { setLogin(prev => !prev) }}>
                    {
                        login ? "Didn't have Account, Create One" : "Already Have Account"
                    }
                </button>

                <button className='font-semibold p-2.5 text-sm rounded-xl cursor-pointer flex items-center text-blue-500 hover:bg-gray-200 mt-2 border-gray-400 hover:border '
                    onClick={onClickHome}><FaArrowLeft className="text-sm md:text-md mr-2" />Back to Home
                </button>
            </div>
        </div>
    )
}

export default AdminLogin
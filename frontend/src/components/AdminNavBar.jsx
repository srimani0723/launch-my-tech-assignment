import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const AdminNavbar = () => {
    const navigate = useNavigate()

    const onAdminLogout = async () => {
        const adminData = Cookies.get("adminData")
        Cookies.remove("jwt_token")
        Cookies.remove("adminData")
        if (adminData.loginType === "google") {
            await axios.get(`${import.meta.env.VITE_DATABASE_URL}/auth/logout`)
        }
        navigate("/")
    }

    const onClickHome = () => {
        navigate("/")
    }

    return (
        <nav className='bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm p-3 flex items-center justify-between'>

            <button className='font-semibold p-2.5 text-sm rounded-xl cursor-pointer flex items-center text-blue-500 hover:bg-gray-200'
                onClick={onClickHome}><FaArrowLeft className="text-sm md:text-md mr-2" />Back to Home
            </button>

            <h1 className='text-md md:text-xl font-bold flex items-center bg-linear-45 from-sky-500 to-purple-500 bg-clip-text text-transparent'>Admin Dashboard</h1>


            <button className='font-bold p-2.5 text-sm rounded-xl cursor-pointer flex items-center shadow-sky-50 shadow-lg border border-gray-300 hover:bg-gray-200' onClick={onAdminLogout}>
                <MdOutlineLogout className='mr-2 text-lg' />
                Logout
            </button>
        </nav >
    )
}

export default AdminNavbar
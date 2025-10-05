import { Link, useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { useContext } from "react";
import BlogsContext from "../context/BlogsContext";

const Navbar = () => {
    const navigate = useNavigate()
    const { getAllBlogs } = useContext(BlogsContext)

    const onAdminClick = () => {
        navigate("/admin/login")
    }

    const onClickHome = () => {
        navigate("/")
    }

    return (
        <nav className='bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm p-3 flex items-center justify-between'>

            <div className='flex items-center'>

                <button className='bg-linear-to-r from-blue-600 to bg-purple-600 text-white font-bold p-2 text-2xl rounded-xl mr-1 shadow-sky-100 shadow-lg cursor-pointer'
                    onClick={onClickHome}
                ><LuSparkles /></button>

                <h1 className='text-2xl font-bold text-blue-900'>Blogging</h1>
            </div>

            <div className='flex items-center '>
                <button onClick={() => getAllBlogs()} className="bg-sky-100 p-2 rounded-xl text-purple-800 hover:shadow-md hover:shadow-blue-200 cursor-pointer mr-3  "><IoReload className="text-xl font-bold" /></button>

                {/* <button className='hover:bg-blue-200/20 hover:text-sky-700 text-md font-bold rounded-lg p-2.5 pl-3 pr-3 cursor-pointer mr-3' onClick={onClickHome}>
                    Home
                </button> */}

                <button className='bg-linear-to-r from-blue-600 to bg-purple-600 text-white font-bold p-2.5 text-sm rounded-xl cursor-pointer flex items-center shadow-sky-100 shadow-lg' onClick={onAdminClick}>
                    <FiUser className='mr-2 text-lg' />
                    Admin
                </button>
            </div>
        </nav >
    )
}

export default Navbar
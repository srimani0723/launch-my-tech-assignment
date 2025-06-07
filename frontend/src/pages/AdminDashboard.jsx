import React, { useEffect, useState } from 'react'
import { IoReload } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavBar'
import CircleLoader from '../components/CircleLoader';
import FailureView from '../components/FailureView';
import axios from 'axios';
import AdminBlogCard from '../components/AdminBlogCard';
import BlogForm from '../components/BlogForm';


const apiStatusConstraints = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    failure: "FAILURE",
    success: "SUCCESS"
}


function AdminDashboard() {
    const [adminPosts, setAdminPosts] = useState([])
    const [adminErrorMsg, setAdminErrorMsg] = useState("")
    const [adminApiGetStatus, setAdminApiGetStatus] = useState(apiStatusConstraints.initial)
    const [showForm, setShowForm] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);


    const jwtToken = Cookies.get("jwt_token")
    const adminData = JSON.parse(Cookies.get("adminData"))

    const getAllAdminBlogs = async () => {
        setAdminApiGetStatus(apiStatusConstraints.inProgress)

        const url = `https://launch-my-tech-assignment.onrender.com/post/${adminData.id}`

        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.get(url, headers)
            console.log(response.data)
            setAdminPosts(response.data)
            setAdminApiGetStatus(apiStatusConstraints.success)
        } catch (err) {
            setAdminErrorMsg(err.message)
            setAdminApiGetStatus(apiStatusConstraints.failure)
            alert(adminErrorMsg)
        }
    }

    useEffect(() => {
        getAllAdminBlogs();
    }, [])

    if (!jwtToken) {
        return <Navigate to="/" replace />
    }


    const AdminProfile = () => (
        <div className='flex flex-col items-center bg-sky-50 mb-3 rounded-lg md:flex-row w-full lg:w-[70%] lg:h-[30vh] justify-evenly'>
            <span className='text-4xl md:text-8xl bg-linear-45 from-sky-500 to-purple-500 p-3 border-3 border-sky-400 rounded-full my-3 '><FiUser className='text-white' /></span>

            <div className='flex flex-col bg-sky-100 rounded-lg p-3 text-lg md:text-xl font-semibold italic text-purple-900 border-2 border-gray-300'>
                <h1><span className='font-bold'>Name:</span> {adminData.name}</h1>
                <p><span className='font-bold'>Id:</span> {adminData.id}</p>
                <p><span className='font-bold'>Email:</span> {adminData.email}</p>
                <p><span className='font-bold'>CreatedAt:</span> {adminData.createdAt}</p>
            </div>

            <div className='flex md:flex-col  justify-between items-center  m-2'>
                <button className="bg-gray-100 p-2 rounded-xl text-purple-800 hover:bg-gray-300 border-2 border-gray-300 mr-3 cursor-pointer flex items-center font-bold md:my-3"

                    onClick={getAllAdminBlogs}><IoReload className="text-xl font-bold mr-2" />Reload</button>

                <button
                    onClick={() => {
                        setSelectedBlog(null);
                        setShowForm(prev => !prev);
                    }}

                    className="bg-gray-100 p-2 rounded-xl text-purple-800 hover:bg-gray-300 border-2 border-gray-300 mr-3 cursor-pointer flex items-center font-bold md:my-3"><MdAdd className="text-xl font-bold mr-1"
                    />New Blog</button>
            </div>
        </div>
    )

    const renderAdminBlogCards = () => {
        return adminPosts.length === 0 ? (
            <EmptyView />
        ) :
            (<ul className='flex flex-wrap justify-evenly items-start pt-4 lg:w-[80%]'>
                {adminPosts.map(each =>
                    <AdminBlogCard key={each.postid}
                        blog={each}
                        onEdit={(blog) => {
                            setSelectedBlog(blog);
                            setShowForm(prev => !prev)
                        }}
                        onRefresh={() => getAllAdminBlogs()}
                    />
                )}
            </ul>
            )
    }

    const renderController = () => {
        switch (adminApiGetStatus) {
            case apiStatusConstraints.inProgress:
                return <CircleLoader />
            case apiStatusConstraints.failure:
                return <FailureView />
            case apiStatusConstraints.success:
                return renderAdminBlogCards()
            default:
                return null
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className='min-h-[100vh] p-3 flex flex-col items-center '>
                {<AdminProfile />}
                {showForm && (
                    <BlogForm
                        isEdit={Boolean(selectedBlog)}
                        blogData={selectedBlog}
                        adminId={adminData.id}
                        setShowForm={setShowForm}
                        onSuccess={() => {
                            getAllAdminBlogs();
                            setShowForm(false);
                            setSelectedBlog(null);
                        }}
                    />
                )}
                {renderController()}
            </div>
        </>

    )
}

export default AdminDashboard
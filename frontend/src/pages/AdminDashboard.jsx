import React, { useEffect, useState } from 'react'
import { IoReload } from "react-icons/io5";
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
import EmptyView from '../components/EmptyView';


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

    const time = new Date(adminData.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    const getAllAdminBlogs = async () => {
        setAdminApiGetStatus(apiStatusConstraints.inProgress)

        const url = `${import.meta.env.VITE_BACKEND_URL}/post/${adminData.id}`

        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.get(url, headers)

            if (response.data.message) {
                setAdminPosts([])
                setAdminApiGetStatus(apiStatusConstraints.success)
            } else {
                setAdminPosts(response.data)
                setAdminApiGetStatus(apiStatusConstraints.success)
            }

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
        <div className='flex flex-col items-center mb-3 rounded-4xl md:flex-row w-full lg:w-[70%] lg:h-[30vh] justify-evenly border-1 border-gray-400 shadow-lg/10 p-3 pr-2 bg-linear-30 from-purple-200 via-orange-100 to-sky-100'>
            <div className='flex flex-col items-center md:flex-row bg-linear-45 from-sky-500 to-purple-500 p-3 rounded-4xl border-3 border-sky-300 h-full w-full'>
                <span className='text-6xl md:text-8xl p-3 border-3 border-sky-200 rounded-full my-3 shadow-2xl/70 shadow-amber-200'><FiUser className='text-white' /></span>

                <div className='flex flex-col rounded-lg p-3 text-lg md:text-xl font-semibold italic text-gray-200'>
                    <h1><span className='font-bold text-white'>Name:</span> {adminData.name}</h1>
                    <p><span className='font-bold text-white'>Id:</span> {adminData.id}</p>
                    <p><span className='font-bold text-white'>Email:</span> {adminData.email}</p>
                    <p><span className='font-bold text-white'>CreatedAt:</span> {time}</p>
                </div>
            </div>

            <div className='flex md:flex-col  justify-between items-center m-2'>
                <button className="bg-gray-100 p-2 rounded-xl text-purple-800 hover:bg-gray-300 border-2 border-gray-300 mr-3 cursor-pointer flex items-center font-bold md:my-3 shadow-xl/10"

                    onClick={getAllAdminBlogs}><IoReload className="text-xl font-bold mr-2" />Reload</button>

                <button
                    onClick={() => {
                        setSelectedBlog(null);
                        setShowForm(prev => !prev);
                    }}

                    className="bg-gray-100 p-2 rounded-xl text-purple-800 hover:bg-gray-300 border-2 border-gray-300 mr-3 cursor-pointer flex items-center font-bold md:my-3 shadow-xl/10"><MdAdd className="text-xl font-bold mr-1"
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
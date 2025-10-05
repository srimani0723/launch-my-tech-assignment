import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Cookies from "js-cookie"

function AdminBlogCard(props) {
    const { blog, onEdit, onRefresh } = props
    const { name, image, title, content, createdat } = blog

    const time = new Date(createdat).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    const onDelete = async () => {
        const jwtToken = Cookies.get("jwt_token")
        console.log(jwtToken)
        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/post/${blog.postid}`

            const headers = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.delete(url, headers)
            console.log(response)
            onRefresh()

        } catch (error) {
            alert("Delete Failed", error)
        }
    }

    return (
        <div className='w-[100%] sm:w-[90%] md:w-[90%] lg:w-[70%] rounded-xl m-3 p-5 shadow-md hover:shadow-xl hover:border-gray-500 duration-500 cursor-pointer border border-gray-300' >

            <div className="flex items-start w-[100%] justify-between">
                <div className="py-3">

                    <p className="text-gray-900 font-bold text-xl mb-3">{title}</p>

                    <p className="font-semibold text-sm flex items-center text-blue my-3 bg-sky-200 p-1 px-2 rounded-md">Published on {time} by {name}</p>

                    <p className="text-gray-700 font-medium mb-3">{content.length > 60 ? content.slice(0, 60) + "..." : content}</p>
                </div>


                <img src={image} alt={title} className='rounded-xl w-[20%] h-[100%] m-2' />
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onEdit(blog)}
                    className='font-bold p-2.5 text-md rounded-xl cursor-pointer flex items-center shadow-sky-50 shadow-lg border border-gray-300 hover:bg-gray-200 mr-3' >
                    <FaRegEdit className=" text-xl mr-2" /> Edit
                </button>
                <button onClick={onDelete} className='font-bold p-2.5 text-md rounded-xl cursor-pointer flex items-center shadow-sky-50 shadow-lg border border-red-700 bg-red-500 text-white hover:bg-red-700' >
                    <MdDeleteOutline className="mr-2 text-2xl" /> Delete
                </button>
            </div>

        </div>
    )
}

export default AdminBlogCard
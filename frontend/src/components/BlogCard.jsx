import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

function BlogCard(props) {
    const { blog } = props
    const { adminName, image, title, content, createdAt } = blog

    const time = new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    return (
        <div className='flex flex-col w-full md:w-[47%] lg:w-[30%] rounded-xl shadow-md hover:shadow-xl hover:scale-101 duration-500 cursor-pointer border-1 border-gray-300 hover:border-gray-400 mr-1 mb-3' >

            <img src={image} alt={title} className='w-full h-[50%] object-fill rounded-t-xl min-h-[200px]' />

            <div className="p-3 bg-white rounded-b-xl">
                <div className='flex justify-between items-center mb-3 bg-purple-50 p-2 rounded-lg border border-purple-300'>
                    <p className="font-semibold text-sm  flex items-center"><CiCalendar className="mr-1 font-bold text-xl text-blue-700 " />{time}</p>

                    <p className="font-semibold text-sm flex items-center"><FiUser className="mr-2 text-xl text-green-600" />{adminName}</p>
                </div>

                <p className="text-gray-900 font-bold text-xl mb-3">{title}</p>
                <p className="text-gray-700 font-medium mb-3">{content}</p>


            </div>

        </div>
    )
}

export default BlogCard
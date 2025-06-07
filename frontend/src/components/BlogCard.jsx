import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

function BlogCard(props) {
    const { blog } = props
    console.log(blog)
    const { adminName, image, title, content, createdAt } = blog

    const time = new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    return (
        <div className='flex flex-col  w-[100%] sm:w-[90%] md:w-[45%] lg:w-[30%] rounded-xl m-3 shadow-md hover:shadow-xl hover:scale-102 duration-500 cursor-pointer' >

            <img src={image} alt={title} className='w-full h-[50%] object-fill rounded-t-xl min-h-[200px] max-h-[250px] ' />

            <div className="p-3 ">
                <div className='flex justify-between items-center mb-3 bg-purple-100 p-2 rounded-lg'>
                    <p className="font-semibold text-sm  flex items-center"><CiCalendar className="mr-1 font-bold text-md" />{time}</p>

                    <p className="font-semibold text-sm flex items-center"><FiUser className="mr-2" />{adminName}</p>
                </div>

                <p className="text-gray-900 font-bold text-xl mb-3">{title}</p>
                <p className="text-gray-700 font-medium mb-3">{content}</p>


            </div>

        </div>
    )
}

export default BlogCard
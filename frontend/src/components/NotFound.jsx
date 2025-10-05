import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    const backToHome = () => {
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <img src="https://img.freepik.com/premium-vector/page-found-concept-illustration_86161-98.jpg?w=900" alt="not-found"
                className="w-full max-w-[600px]" />
            <h1 className="text-2xl text-blue-600 font-semibold">Page Not Found</h1>
            <button className="bg-linear-45 from-sky-500 to-purple-500 py-2 px-3 text-white font-semibold rounded-xl my-4 cursor-pointer" onClick={backToHome}>Back to Home</button>
        </div>
    )
}
export default NotFound

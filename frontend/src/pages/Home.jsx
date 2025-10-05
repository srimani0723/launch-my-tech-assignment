import React, { useContext } from 'react'
import Navbar from "../components/Navbar";
import BlogsContext from '../context/BlogsContext';
import CircleLoader from '../components/CircleLoader';
import FailureView from '../components/FailureView';
import EmptyView from '../components/EmptyView';
import BlogCard from '../components/BlogCard';
import { FaSearch } from "react-icons/fa";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { BiSolidRightArrowSquare } from "react-icons/bi";


const apiStatusConstraints = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    failure: "FAILURE",
    success: "SUCCESS"
}

const Home = () => {
    const { allBlogs, apiGetStatus, pageNo, pageIncrement, pageDecrement, searchVal, searchInput, filteredBlogs, handleSearchInput } = useContext(BlogsContext)


    const renderBlogCards = () => {

        const pageSize = 4;
        const start = (pageNo - 1) * pageSize
        const end = start + pageSize

        const TotalPages = Math.ceil(allBlogs.length / pageSize)
        
        const filteredList = !filteredBlogs.message ? filteredBlogs.slice(start, end) : [];

        const showCards = filteredList.length > 0

        return !showCards ? (
            <EmptyView />
        ) :
            (<><ul className='pt-4 lg:w-[70%] pb-4 flex flex-wrap justify-evenly items-start'>
                {filteredList.slice(0, 4).map(each =>
                    <BlogCard key={each.id} blog={each} />
                )}
            </ul>
                <div className='flex items-center bg-sky-50 border-2 border-sky-500 px-3 py-1 rounded mb-4'>
                    <button className="text-3xl text-purple-500 hover:text-purple-700 duration-300 cursor-pointer disabled:text-purple-300"
                        type='button'
                        disabled={pageNo === 1 ? true : false}
                        onClick={() => pageDecrement()}>
                        <BiSolidLeftArrowSquare /></button>

                    <p className='text-2xl font-bold mx-4 text-sky-700'>{pageNo}</p>

                    <button className="text-3xl text-purple-500 hover:text-purple-700 duration-300 cursor-pointer"
                        type='button'
                        disabled={pageNo === TotalPages ? true : false}
                        onClick={() => pageIncrement()}>
                        <BiSolidRightArrowSquare />
                    </button>
                </div>
            </>
            )
    }


    const renderController = () => {
        switch (apiGetStatus) {
            case apiStatusConstraints.inProgress:
                return <div className='min-h-[50vh] flex justify-center items-center'><CircleLoader /></div>
            case apiStatusConstraints.failure:
                return <FailureView />
            case apiStatusConstraints.success:
                return renderBlogCards()
            default:
                return null
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center text-center p-6 justify-center bg-linear-to-r from-sky-100 to-purple-100'>
                <h1 className='font-bold text-5xl sm:text-2xl md:text-6xl w-[100%] md:w-[50%] bg-gradient-to-r from-gray-700 via-blue-700 to-purple-800 bg-clip-text text-transparent mb-6 p-2'>Discover Amazing Stories</h1>

                <p className='font-medium text-xl w-[70%] text-gray-400 mb-3'>
                    Explore cutting-edge insights, tutorials, and trends in technology, design, and development
                </p>

                <form className='mb-4 mt-6 w-full md:w-[100%] max-w-[500px] bg-white shadow-xl/80 shadow-sky-200 p-2 px-5 text-xl rounded-full flex items-center justify-between' onSubmit={(e) => handleSearchInput(e)}>

                    <input type='search'
                        className='outline-none  mr-2 w-[90%]'
                        placeholder='Search for a Blog'
                        onChange={(e) => searchInput(e)}
                        value={searchVal} />

                    <button type='button' className='cursor-pointer' onClick={handleSearchInput}><FaSearch /></button>
                </form>
            </div>

            <div className='flex flex-col items-center justify-center m-3'>
                <h1 className='text-xl font-bold rounded-full w-full bg-linear-65 from-sky-700 to-purple-600 border-2 border-sky-300 text-white pl-3 py-1 shadow-lg/80 shadow-sky-200'>Blogs - {allBlogs.length}</h1>

                {renderController()}

            </div>
        </>
    )
}

export default Home
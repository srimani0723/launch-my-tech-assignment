import React, { useContext } from 'react'
import Navbar from "../components/Navbar";
import BlogsContext from '../context/BlogsContext';
import CircleLoader from '../components/CircleLoader';
import FailureView from '../components/FailureView';
import EmptyView from '../components/EmptyView';
import BlogCard from '../components/BlogCard';

const apiStatusConstraints = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    failure: "FAILURE",
    success: "SUCCESS"
}

const Home = () => {
    const { allBlogs, apiGetStatus } = useContext(BlogsContext)


    const renderBlogCards = () => {
        return allBlogs.length === 0 ? (
            <EmptyView />
        ) :
            (<ul className='flex flex-wrap justify-evenly items-start pt-4 lg:w-[70%]'>
                {allBlogs.map(each =>
                    <BlogCard key={each.id} blog={each} />
                )}
            </ul>
            )
    }

    const renderController = () => {
        switch (apiGetStatus) {
            case apiStatusConstraints.inProgress:
                return <CircleLoader />
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
            <div className='flex flex-col items-center text-center min-h-[50vh] justify-center bg-linear-to-r from-sky-100 to-purple-100'>
                <h1 className='font-bold text-5xl sm:text-2xl md:text-6xl w-[100%] md:w-[50%] bg-gradient-to-r from-gray-700 via-blue-700 to-purple-800 bg-clip-text text-transparent mb-6 p-2'>Discover Amazing Stories</h1>
                <p className='font-medium text-xl w-[70%] text-gray-400'>
                    Explore cutting-edge insights, tutorials, and trends in technology, design, and development
                </p>
            </div>
            <div className='flex items-center justify-center'>
                {renderController()}
            </div>
        </>
    )
}

export default Home
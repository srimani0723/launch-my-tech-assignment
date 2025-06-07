import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';

function BlogForm({ adminId, isEdit = false, blogData = {}, onSuccess, setShowForm }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // File object
    const [prevImage, setPrevImage] = useState(''); // Existing URL

    const jwtToken = Cookies.get("jwt_token");

    useEffect(() => {
        if (isEdit && blogData) {
            setTitle(blogData.title || '');
            setContent(blogData.content || '');
            setPrevImage(blogData.image || '');
        }
    }, [isEdit, blogData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('admin_id', adminId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image || prevImage); // Either new file or existing URL

        const url = isEdit
            ? `https://launch-my-tech-assignment.onrender.com/post/${blogData.postid}`
            : `https://launch-my-tech-assignment.onrender.com/post/`;

        const method = isEdit ? 'put' : 'post';

        try {
            await axios[method](url, formData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            onSuccess();
        } catch (err) {
            console.error("Blog submission failed:", err);
        }
    };

    return (
        <div className='fixed h-[100vh] w-full flex items-center justify-center top-0 inset-0 bg-black/50 backdrop-blur-sm z-40'>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 m-4 bg-white rounded-xl shadow-md border border-gray-200 absolute w-[90%] md:w-[50%]">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="w-full border rounded p-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                    className="w-full border rounded p-2 h-40"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-linear-45 from-sky-500 to-purple-500 text-white text-sm animate-pulse p-3 rounded-lg font-semibold cursor-pointer"
                />

                {/* Preview section */}
                <div className="flex gap-4 w-full">
                    {image && (
                        <div className='w-[50%]'>
                            <p className="text-xs text-gray-500">Selected Image Preview</p>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Selected"
                                className="h-24 object-cover rounded border"
                            />
                        </div>
                    )}
                    {isEdit && prevImage && (
                        <div className='w-[50%]'>
                            <p className="text-xs text-gray-500">Current Image</p>
                            <img
                                src={prevImage}
                                alt="Current"
                                className="h-24 object-cover rounded border"
                            />
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-between'>
                    <button type="submit" onSubmit={handleSubmit} className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                        {isEdit ? 'Update Blog' : 'Publish Blog'}
                    </button>

                    <button type='button' onClick={() => setShowForm(false)} className='bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

}

export default BlogForm;

import { createContext } from "react";

const BlogsContext = createContext({
  allBlogs: [],
  searchTxt: "",
  errorMsg: "",
  apiGetStatus: "",
  searchBlog: () => { },
  getAllBlogs: () => { },
});

export default BlogsContext;

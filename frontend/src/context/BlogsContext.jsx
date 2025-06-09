import { createContext } from "react";

const BlogsContext = createContext({
  allBlogs: [],
  searchTxt: "",
  errorMsg: "",
  apiGetStatus: "",
  pageNo: 1,
  searchBlog: () => { },
  getAllBlogs: () => { },
  pageIncrement: () => { },
  pageDecrement: () => { }
});

export default BlogsContext;

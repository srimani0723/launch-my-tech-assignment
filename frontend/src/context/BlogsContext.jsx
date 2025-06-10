import { createContext } from "react";

const BlogsContext = createContext({
  allBlogs: [],
  filteredBlogs: [],
  searchTxt: "",
  errorMsg: "",
  apiGetStatus: "",
  pageNo: 1,
  searchVal: "",
  searchBlog: () => { },
  getAllBlogs: () => { },
  pageIncrement: () => { },
  pageDecrement: () => { },
  searchInput: () => { },
  handleSearchInput: () => { }
});

export default BlogsContext;

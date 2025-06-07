import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import axios from "axios"
import BlogsContext from "./context/BlogsContext"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./middlewares/protectedRoute"

function toCamelCase(str) {
  const parts = str.split(/[_-]/);
  return parts[0] + parts.slice(1).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function convertKeysToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamel);
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (let key in obj) {
      const newKey = toCamelCase(key);
      newObj[newKey] = convertKeysToCamel(obj[key]);
    }
    return newObj;
  }

  return obj;
}


const apiStatusConstraints = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  success: "SUCCESS"
}

const App = () => {
  const [searchTxt, setSearchTxt] = useState('')
  const [allBlogs, setAllBlogs] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [apiGetStatus, setApiGetStatus] = useState(apiStatusConstraints.initial)

  const getAllBlogs = async () => {
    setApiGetStatus(apiStatusConstraints.inProgress)
    const url = "https://launch-my-tech-assignment.onrender.com/"
    try {
      const response = await axios.get(url)
      const newData = convertKeysToCamel(response.data)
      setAllBlogs(newData)
      setApiGetStatus(apiStatusConstraints.success)
    } catch (err) {
      setErrorMsg(err.message)
      setApiGetStatus(apiStatusConstraints.failure)
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, [])

  const searchBlog = (e) => {
    setSearchTxt(e.target.value);
  }

  return (
    <BlogsContext.Provider value={{ allBlogs, searchTxt, errorMsg, apiGetStatus, searchBlog, getAllBlogs }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard/:adminId" element={<ProtectedRoute element={<AdminDashboard />} />} />

          <Route path="not-found" element={<NotFound />} />

          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </BlogsContext.Provider>)
}
export default App

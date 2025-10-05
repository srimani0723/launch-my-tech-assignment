import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken === undefined) {
        return <Navigate to='/admin/login' />
    }
    return element
}

export default ProtectedRoute

import React, { useEffect } from 'react'
import CircleLoader from '../components/CircleLoader'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie'

function AdminGoogleLoginCredSave() {
    const [params] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = params.get("token");
        const id = params.get("id");
        const name = params.get("name");
        const email = params.get("email");
        const createdAt = params.get("createdAt")
        const loginType = params.get("loginType")

        const adminData = {
            id, name, email, createdAt, loginType
        }

        if (jwtToken && id) {
            Cookies.set("jwt_token", jwtToken, { expires: 30 })

            Cookies.set("adminData", JSON.stringify(adminData), { expires: 30 })

            navigate(`/admin/dashboard/${String(adminData.id)}`)
        } else {
            navigate('/admin/login')
        }
    }, [])

    return (
        <div className='flex items-center justify-center h-[100vh]'><CircleLoader /></div>
    )
}

export default AdminGoogleLoginCredSave
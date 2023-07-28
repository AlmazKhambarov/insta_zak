import { Route, Routes } from "react-router-dom"
import App from "../App"
import Register from "../Auth/Register/Register"
import { useEffect, useState } from "react"
import { auth } from "../api/firebase"
import Login from "../Auth/Login/Login"
import UserSetting from "../pages/User/UserSetting/UserSetting"
import UserProfile from "../pages/User/UserProfile/UserProfile"
import UserOrder from "../pages/User/UserOrder/UserOrder"
import Layout from "../layout/Layout"
import Home from "../pages/Home/Home"
import Posts from "../pages/Posts/Posts"
import UserUpload from "../pages/User/UserUpload/UserUpload"

const MainRoutes = () => {
    const [user, setUser] = useState('')
    auth.onAuthStateChanged((user) => {
        setUser(user)
    })
    console.log(user)
    return (
        <div style={{ display: 'flex' }}>
            {user ? <Layout /> : null}
            <Routes>
                <Route path='/' element={user ? <App /> : <Login />} />
                <Route path='/register' element={user ? <App /> : <Register />} />
                <Route path='/home' element={user ? <Posts /> : <Login />} />
                <Route path='/home/user' element={user ? <UserProfile user={user} /> : <Login />} />
                <Route path='/home/setting' element={user ? <UserSetting user={user} /> : <Login />} />
                <Route path='/home/order' element={user ? <UserOrder user={user} /> : <Login />} />
                <Route path='/home/upload' element={user ? <UserUpload user={user} /> : <Login />} />

            </Routes>
        </div>
    )
}
export default MainRoutes
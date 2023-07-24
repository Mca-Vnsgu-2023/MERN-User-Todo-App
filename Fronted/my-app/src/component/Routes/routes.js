import React from 'react'
import { Routes,Route } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import UserLogin from '../User/UserLogin'
import UserSignUp from '../User/UserSignUp'
import Dashboard from '../Dashboard/Dashboard'


const MainRoutes = () => {

  return (
    <div>
        <Routes>
            <Route path="/" element={<MainLayout />}></Route>
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/signup" element={<UserSignUp />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dashboard/:todoId" element={<Dashboard />}></Route>
        </Routes>
    </div>
  )
}
export default MainRoutes
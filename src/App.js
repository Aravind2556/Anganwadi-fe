
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/createAccount/Login'
import Navbar from './components/Navbar'
import { DContext } from './context/Datacontext'
import CreateAdmin from './components/SuperAdmin/CreateAdmin'
import CreateUser from './components/Admin/CreateUser'
import { UserDashBoard } from './components/Admin/UserDashBoard'
import StudentDashboard from './components/StudentDashboard'
import Register from './components/createAccount/Register'


export const App = () => {
  const { Auth } = useContext(DContext)

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={Auth?.role === 'superadmin' ? <CreateAdmin /> : Auth?.role === 'user' ? <StudentDashboard /> : <Login />}></Route>
        <Route path='/adminDashboard' element={Auth?.role === 'admin' ? <UserDashBoard /> : <Login />} ></Route>
        <Route path='/CreateUser' element={Auth?.role === 'admin' ? <CreateUser /> : <Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>
    </div>
  )
}

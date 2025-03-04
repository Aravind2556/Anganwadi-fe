
import React, { useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/createAccount/Login'

import  Navbar  from './components/Navbar'



import { DContext } from './context/Datacontext'
import CreateAdmin from './components/SuperAdmin/CreateAdmin'
import CreateUser from './components/Admin/CreateUser'
// import UserInfo from './components/UserInfo.js/UserInfo'
import { NewDashboard } from './components/NewDashboard'








export const App = () => {

   const {Auth}=useContext(DContext)


return (
    <div>

     <Navbar/>




   
    <Routes>
      <Route path='/' element={Auth?.role === 'superadmin' ? <CreateAdmin/> : Auth?.role === 'admin' ? <CreateUser/> : Auth?.role === 'user' ? <NewDashboard/>  :   <Login/>  }></Route>
     
    </Routes>

    

    </div>
  )
}

import React from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MainLayout = () => {

  const navigate = useNavigate()
  const UserAuth = localStorage.getItem('UserToken')

  const Login = () => {
    navigate('/login')
  }

  const Signup = () => {
    navigate('/signup')
  }

  const LogOut=()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className='container' >
          Product Management
        </Navbar.Brand>
        <div className='col-2'>
          {UserAuth != null ?
            <NavItem>
              <Button onClick={() => LogOut()}>LogOut</Button>&nbsp;
            </NavItem>
            :
            <NavItem>
              <Button onClick={() => Login()}>Login</Button>&nbsp;
              <Button onClick={() => Signup()}>Signup</Button>
            </NavItem>
          }
        </div>
      </Navbar>
    </div>
  )
}

export default MainLayout
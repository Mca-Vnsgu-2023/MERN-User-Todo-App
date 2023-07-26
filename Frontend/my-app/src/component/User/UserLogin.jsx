import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const navigate=useNavigate()
  const { register, handleSubmit } = useForm();
  const url=`${process.env.REACT_APP_API_URL}`

  const Login = (inputData) => {
    const {email, password}=inputData
    if (email && password) {
      axios.post(`${url}/User/login`, inputData)
        .then((res) => {
          alert(res.data.message)
          if(res?.data?.token){
            localStorage.setItem('UserToken', res?.data?.token)
            navigate('/dashboard')
          }
        })
    } else {
      alert("Please Enter the User details.")
    }
  }

  const onSubmit = (data) => {
    Login(data)
  }

  return (
    <div>
      <div>
        <MainLayout />
      </div>
      <Container style={{ paddingTop: "50px" }}>
        <Row className="justify-content-md-center">
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title className='mb-5'>
                <h2>Login</h2>
              </Card.Title>
              <Card.Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control mb-2"
                    {...register('email')}
                  />
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control mb-3"
                    {...register('password')}
                  />
                  <Button type='submit' variant="primary">LogIn</Button>
                </form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default UserLogin
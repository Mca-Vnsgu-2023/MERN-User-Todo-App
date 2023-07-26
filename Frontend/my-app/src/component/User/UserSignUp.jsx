import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignUp = () => {

  const navigate=useNavigate()
  const { register, handleSubmit } = useForm();
  const url=`${process.env.REACT_APP_API_URL}`

  const Signup = (inputData) => {
    const {username,email, password}=inputData
    if (username && email && password) {
      axios.post(`${url}/api/User/register`, inputData)
        .then(res => {
          alert(res.data.message)
        })
        navigate('/login')
    } else {
      alert("Please Enter the User details.")
    }
  }

  const onSubmit = (data) => {
    Signup(data)
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
                <h2>SignUp</h2>
              </Card.Title>
              <Card.Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>UserName:</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control mb-2"
                    {...register('username')}
                  />
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
                  <Button type='submit' variant="primary">SignUp</Button>
                </form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default UserSignUp
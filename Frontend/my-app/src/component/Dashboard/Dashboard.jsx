import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import DisplayTodos from '../Todos/DisplayTodos'
import { Card, Container, Row } from 'react-bootstrap'
import AddTodo from '../Todos/AddTodo'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Dashboard = () => {

  const userAuth = localStorage.getItem('UserToken')
  const user = jwtDecode(userAuth)
  const [todoList, setTodoList] = useState([])
  const url=`${process.env.REACT_APP_API_URL}`

  const getTodosByUser = () => {
        axios.get(`${url}/Todo/getTodoByUserId/${user?._id}`)
            .then((res) => {
                setTodoList(res?.data)
            })
    }

  const handleAfterSubmit=()=>{
    getTodosByUser()
  }

  useEffect(() => {
    getTodosByUser()
}, [])

  return (
    <div>
      <div>
        <MainLayout />
      </div>
      <div style={{ paddingTop: "50px" }}>
        <Container className='mb-3'>
          <Row className="justify-content-md-center">
            <Card style={{ width: '50rem', background: "gray" }}>
              <Card.Body>
                <Card.Title className='mb-3'>
                  <h2>My Todos</h2>
                </Card.Title>
                <Card.Text>
                  <div>
                    <AddTodo userId={user?._id} handleAfterSubmit={handleAfterSubmit}/>
                  </div>
                  <div>
                    <DisplayTodos handleAfterSubmit={handleAfterSubmit} todoList={todoList}/>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard
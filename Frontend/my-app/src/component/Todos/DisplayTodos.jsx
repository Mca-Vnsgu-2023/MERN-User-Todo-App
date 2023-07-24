import React, { useState } from 'react'
import { Button, Card, Container, Row, Table } from 'react-bootstrap'
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const DisplayTodos = (props) => {

    const { todoList, handleAfterSubmit } = props
    const navigate = useNavigate()
    const [todoId, setTodoId] = useState()

    const updateTodo = (id) => {
        setTodoId(id)
        navigate(`/dashboard/${id}`)
    }

    const deleteTodo = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it..!'
        }).then((result) => {
            if (result.isConfirmed) {
                setTodoId(id)
                axios.delete(`http://localhost:3000/api/Todo/deleteTodo/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                handleAfterSubmit()
            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }
        })
    }

    
    return (
        <div>
            <Container style={{ paddingTop: "50px" }}>
                <Row>
                    <Card style={{ width: '50rem', background: "lightgray" }}>
                        <Card.Body>
                            <Card.Text>
                                <Table bordered>
                                    {todoList.length > 0 &&
                                        todoList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <span style={{ fontSize: "22px", fontWeight: "500" }}>{item?.task}</span><br />
                                                        <span>{item?.description}</span>
                                                    </td>
                                                    <td>
                                                        <Button variant="light" style={{ background: "skyblue", borderRadius: "100px" }}>{item?.status}</Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="light" style={{ background: "white" }} onClick={() => updateTodo(item?._id)} >
                                                            <PencilSquare color="green" size={22} />
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="light" style={{ background: "white" }} onClick={() => deleteTodo(item?._id)} >
                                                            <Trash color="red" size={22} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </Table>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default DisplayTodos
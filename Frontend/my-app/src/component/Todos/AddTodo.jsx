import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const AddTodo = (props) => {

    const { userId, handleAfterSubmit } = props
    const { register, handleSubmit, reset, setValue } = useForm();
    const [todoData, setTodoData] = useState()
    const { todoId } = useParams()
    const navigate = useNavigate()
  const url=`${process.env.REACT_APP_API_URL}`


    const getTodoById = (id) => {
        axios.get(`${url}/Todo/getTodoById/${id}`)
            .then((res) => {
                setTodoData(res?.data?.data)
            })
    }

    useEffect(() => {
        if (todoId) {
            getTodoById(todoId)
        }
    }, [todoId])

    useEffect(() => {
        if (todoId && todoData) {
            setValue('task', todoData?.task)
            setValue('description', todoData?.description)
            setValue('status', todoData?.status)
        }
    }, [todoId, todoData])

    function AddTodo(inputData) {
        axios.post(`${url}/Todo/addTodo`, inputData)
            .then(() => {
                handleAfterSubmit()
            })
        reset();
    }

    function UpdateTodo(inputData) {
        if (todoId != null) {
            axios.put(`${url}/Todo/updateTodo/${todoId}`, inputData)
                .then(() => {
                    handleAfterSubmit()
                    navigate('/dashboard')
                })
            reset();
        }
    }

    const onSubmit = (data) => {
        const inputData = {
            ...data,
            userId: userId
        }
        return (todoId == null | undefined) ? AddTodo(inputData) : UpdateTodo(inputData)
    }

    return (
        <div>
            <Container style={{ paddingTop: "50px" }}>
                <Row>
                    <Card style={{ width: '50rem', background: "lightgray" }}>
                        <Card.Body>
                            <Card.Text>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "40%", paddingRight: "4px" }}>
                                            <label>Task</label>
                                            <input
                                                type="text"
                                                name="task"
                                                className="form-control"
                                                {...register('task')}
                                            />
                                        </div>
                                        <div style={{ width: "40%", paddingRight: "4px" }}>
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                className="form-control"
                                                {...register('description')}
                                            />
                                        </div>
                                        <div style={{ width: "40%" }}>
                                            <label>Status</label>
                                            <input
                                                type="text"
                                                name="status"
                                                className="form-control mb-3"
                                                {...register('status')}
                                            />
                                        </div>
                                    </div>
                                    <Button type='submit' variant="primary">{todoId ? "Edit Todo" : "Add Todo"}</Button>
                                </form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default AddTodo
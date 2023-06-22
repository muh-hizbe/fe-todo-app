import { axiosInstance } from "../http/axios.service"

export const updateTodo = async (data, id) => {
    const resp = await axiosInstance.patch(`/todos/${id}`, data)
    return resp?.data
}

export const addTodo = async (data) => {
    const resp = await axiosInstance.post(`/todos`, data)
    return resp?.data
}

export const deleteTodo = async (id) => {
    const resp = await axiosInstance.delete(`/todos/${id}`)
    return resp?.data
}
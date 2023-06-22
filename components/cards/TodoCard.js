import dayjs from "dayjs"
import Swal from "sweetalert2"
import { deleteTodo, updateTodo } from "../../service/todo/todo.service"
import * as idId from 'dayjs/locale/id'

export const TodoCard = ({ isDone = false, data = null, mutate, setSelectedTodo, setOpenEditModal }) => {
    const handleEditTodo = (todoData) => {
        setSelectedTodo(todoData)
        setOpenEditModal(true)
    }

    const handleDeleteTodo = (todoId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(todoId)
                    .then(resp => {
                        mutate()
                        Swal.fire({
                            title: 'Sukses!',
                            text: resp?.message,
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Gagal!',
                            text: err?.response?.data?.message || err?.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
            }
        })
    }

    const handleDoneTodo = () => {
        const payload = {
            name: data?.name,
            note: data?.note,
            is_complete: true
        }

        updateTodo(payload, data?.id)
            .then(resp => {
                mutate()
                Swal.fire({
                    title: 'Sukses!',
                    text: resp?.message,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Gagal!',
                    text: err?.response?.data?.message || err?.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }

    const handleReturnTodo = () => {
        const payload = {
            name: data?.name,
            note: data?.note,
            is_complete: false
        }

        updateTodo(payload, data?.id)
            .then(resp => {
                mutate()
                Swal.fire({
                    title: 'Sukses!',
                    text: resp?.message,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Gagal!',
                    text: err?.response?.data?.message || err?.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }

    return (
        <div className="p-5 rounded-lg border bg-white flex flex-col gap-2">
            <div className="flex flex-col gap-0">
                <div className="text-lg font-semibold">
                    {data?.name}
                </div>
                <div className="text-xs">
                    {dayjs(data?.created_at).locale(idId).format('dddd, DD MMMM YYYY')}
                </div>
            </div>
            <p className="rounded-lg bg-slate-100 p-3 text-sm italic">
                {data?.note}
            </p>
            <div className="flex items-start justify-end gap-2 text-xs">
                <button
                    className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white px-3 py-1"
                    onClick={() => handleEditTodo(data)}
                >
                    Edit
                </button>

                {isDone ?
                    <button
                        className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1"
                        onClick={() => handleReturnTodo()}
                    >
                        Return to ToDo
                    </button>
                    :
                    <button
                        className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1"
                        onClick={() => handleDoneTodo()}
                    >
                        Done
                    </button>
                }

                <button
                    className="rounded-lg bg-slate-600 hover:bg-slate-700 text-white px-3 py-1"
                    onClick={() => handleDeleteTodo(data?.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
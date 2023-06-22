import { useState } from "react"
import Swal from "sweetalert2"
import { mutate } from "swr"
import { updateTodo } from "../../service/todo/todo.service"

export const EditTodoForm = ({ handleClose, data }) => {
    const [name, setName] = useState(data?.name ?? '')
    const [note, setNote] = useState(data?.note ?? '')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoading) {
            setIsLoading(true)

            const payload = {
                name: name,
                note: note,
                is_complete: data?.is_complete
            }

            updateTodo(payload, data?.id)
                .then(resp => {
                    setName(() => '')
                    setNote(() => '')

                    mutate('/todos')
                    handleClose()

                    Swal.fire({
                        title: 'Sukses!',
                        text: 'memperbarui todo',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Ups!',
                        text: 'gagal memperbarui todo',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label>Label</label>
                <input
                    className="rounded-lg p-3 bg-slate-100"
                    value={name}
                    onChange={(e) => setName(() => e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label>Catatan</label>
                <textarea
                    rows={3}
                    className="rounded-lg p-3 bg-slate-100"
                    value={note}
                    onChange={(e) => setNote(() => e.target.value)}
                />
            </div>
            <div>
                <button
                    className="w-full text-center rounded-lg bg-blue-500 text-white font-semibold text-lg py-2"
                    onClick={handleSubmit}
                >
                    {isLoading ? 'Loading...' : 'Update'}
                </button>
            </div>
        </form>
    )
}
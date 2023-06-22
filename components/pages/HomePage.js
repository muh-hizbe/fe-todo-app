import { useState } from "react"
import { AddTodoModal } from "../modals/AddTodoModal"
import { EditTodoModal } from "../modals/EditTodoModal"
import { TodoDoneSection } from "../sections/TodoDoneSection"
import { TodoSection } from "../sections/TodoSection"

export const HomePage = () => {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)

    const handleOpenModalNewTodo = () => {
        setOpenAddModal(true)
    }

    return (
        <div className="flex flex-col gap-2">
            <div>
                <button
                    className="rounded-lg bg-emerald-400 px-3 py-2 text-lg font-semibold"
                    onClick={handleOpenModalNewTodo}
                >
                    + add todo
                </button>

                {openAddModal ?
                    <AddTodoModal handleClose={() => setOpenAddModal(false)} />
                    : null
                }
                {openEditModal ?
                    <EditTodoModal
                        data={selectedTodo}
                        handleClose={() => {
                            setOpenEditModal(false)
                            setSelectedTodo(null)
                        }}
                    />
                    : null
                }
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <TodoSection setOpenEditModal={setOpenEditModal} setSelectedTodo={setSelectedTodo} />
                </div>
                <div>
                    <TodoDoneSection setOpenEditModal={setOpenEditModal} setSelectedTodo={setSelectedTodo} />
                </div>
            </div>
        </div>
    )
}
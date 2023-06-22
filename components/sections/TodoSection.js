import { useEffect, useState } from "react"
import { TodoCard } from "../cards/TodoCard"
import useSWR from 'swr'
import fetcher from "../../utils/fetcher"

export const TodoSection = ({ setSelectedTodo, setOpenEditModal }) => {
  const [todos, setTodos] = useState([])
  const { data: todoData, error, mutate } = useSWR('/todos', fetcher)

  useEffect(() => {
    if (todoData?.data) {
      setTodos(() => todoData?.data?.filter(item => item?.is_complete === false))
    }
  }, [todoData])

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-3xl">
        Todo
      </h1>

      <div className="flex flex-col gap-2">
        {todos?.length > 0 ? todos?.map((item, idx) => (
          <TodoCard key={idx} data={item} mutate={mutate} setSelectedTodo={setSelectedTodo} setOpenEditModal={setOpenEditModal} />
        ))
          :
          <div>
            Todo tidak ada
          </div>
        }
      </div>
    </div>
  )
}
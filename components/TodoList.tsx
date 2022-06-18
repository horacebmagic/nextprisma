import { NextPage } from "next";
import { DeleteIcon, EditIcon, FinishedIcon } from "./Icon";
import { Prisma, Todo } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  todo: Todo;
  index: number;
  toggleEdit: (todo: Todo) => Promise<Todo>;
  toggleFinished: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<Todo>;
  updateTodo: (id: number, task: string) => void;
}

const TodoList: NextPage<Props> = ({
  todo,
  index,
  deleteTodo,
  toggleEdit,
  toggleFinished,
  updateTodo,
}) => {
  const [toggleTruncate, setToggleTruncate] = useState<boolean>(false);
  const [isToggable, setIsToggable] = useState<boolean>(false);
  const [editTodoTask, setEditTodoTask] = useState<string>(todo.task);

  useEffect(() => {
    if (todo.task.length > 30) {
      setIsToggable(true);
    }
  }, [todo]);

  return (
    <div
      className={
        todo.isFinished
          ? "flex flex-row space-x-2 p-1 bg-indigo-500 shadow-sm border border-green-500 rounded-md cursor-default items-center text-white font-light bg-opacity-30 hover:bg-opacity-60"
          : "flex flex-row space-x-2 p-1 bg-indigo-500 shadow-sm border border-indigo-400 rounded-md cursor-default items-center text-white font-light bg-opacity-30 hover:bg-opacity-60"
      }
    >
      <div className="md:basis-1/12 text-center">
        <div className="">{index + 1}</div>
      </div>
      <div
        className={
          !toggleTruncate
            ? "truncate w-full md:basis-9/12"
            : "break-words grow-0 w-10 md:basis-9/12"
        }
      >
        {!todo.isEditing && (
          <div onClick={() => isToggable && setToggleTruncate(!toggleTruncate)}>
            <span>{todo.task}</span>
          </div>
        )}
        {todo.isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo(todo.id, editTodoTask);
            }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Enter to add new task..."
              value={editTodoTask}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTodoTask(e.target.value)
              }
              className="w-full text-white bg-transparent shadow-sm border-0 cursor-default font-light bg-opacity-30 hover:bg-opacity-60 outline-none"
            />
          </form>
        )}
      </div>
      <div className="md:basis-2/12 flex items-center space-x-2">
        <span
          className={todo.isEditing ? "text-green-500" : ""}
          onClick={() => toggleEdit(todo)}
        >
          <EditIcon />
        </span>
        <span
          className={todo.isFinished ? "text-green-500" : ""}
          onClick={() => toggleFinished(todo)}
        >
          <FinishedIcon />
        </span>
        <span onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

export default TodoList;

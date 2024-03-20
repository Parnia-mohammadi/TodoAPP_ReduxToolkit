import { useEffect } from "react";
import { getAsyncTodo } from "../../features/todo/todoSlice";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  // console.log(todos);
  useEffect(() => {
    dispatch(getAsyncTodo());
  }, []);

  return (
    <div>
      <h2>TodoList</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

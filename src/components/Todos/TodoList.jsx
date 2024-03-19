import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  // console.log(todos);
  return (
    <div>
      <h2>TodoList</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

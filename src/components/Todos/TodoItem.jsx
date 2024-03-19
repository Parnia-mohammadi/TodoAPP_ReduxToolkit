import { useDispatch } from "react-redux";
import { deleteTodo, actionTodo } from "../../features/todo/todoSlice";

const TodoItem = ({ id, title, complete }) => {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${complete && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input type="checkbox" className="mr-3" checked={complete} onChange={()=>dispatch(actionTodo({id}))}></input>
          <span>{title}</span>
        </span>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteTodo({ id }))}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, removeTodo } from "/src/feature/todo/todoSlice";
import { useState } from "react";

const Todos = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleDeleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if(!newTodo){
      alert("Please Enter Something");
      return;
    }
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editingTodo, text: newTodo }));
    setNewTodo("");
    setEditingTodo(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Todos</h1>

      <input
        type="text"
        className="w-full bg-gray-700 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out mb-4"
        placeholder="Enter a Todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      {editingTodo === null ? (
        <button
          className="w-full bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      ) : (
        <button
          className="w-full bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={handleUpdateTodo}
        >
          Update Todo
        </button>
      )}

      <ul className="mt-6">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-zinc-800 px-4 py-2 rounded mb-2"
          >
            <span className="text-white">{todo.text}</span>
            <div className="space-x-2">
              <button
                className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-md"
                onClick={() => {
                  setNewTodo(todo.text);
                  setEditingTodo(todo.id);
                }}
              >
                Edit
              </button>
              <button
                className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-md"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;

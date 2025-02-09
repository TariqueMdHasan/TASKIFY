import React, { useState, useRef } from 'react';
import './Modal.css';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const Modal = ({ onClose, addTodoList, updateTodoList, task }) => {
  const initialTodoState = task ? task.description.map((todo) => ({ text: todo.text, completed: todo.isCompleted })) : [{ text: '', completed: false }];
  const [todos, setTodos] = useState(initialTodoState);
  const [title, setTitle] = useState(task ? task.title : '');
  const [priority, setPriority] = useState(task ? task.priority : '');
  const [toStart, setToStart] = useState(task ? task.toStart : '');
  const [toEnd, setToEnd] = useState(task ? task.toEnd : '');
  const [status, setStatus] = useState(task ? task.status : '');
  const [loading, setLoading] = useState(false);
  const isSaveCalled = useRef(false);

  const handleTodoChange = (index, field, value) => {
    const newTodos = [...todos];
    newTodos[index][field] = value;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { text: '', completed: false }]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaveCalled.current) return;
    isSaveCalled.current = true;

    if (loading) return;

    const data = {
      title,
      description: todos.map((todo) => ({
        text: todo.text,
        isCompleted: todo.completed,
      })),
      toStart: toStart || new Date(),
      toEnd: toStart || new Date(),
      status: status || 'todo',
      priority: priority || 'High',
    };

    if (task) {
      data._id = task._id;
    }

    try {
      setLoading(true);
      if (task) {
        await updateTodoList(data);
      } else {
        await addTodoList(data);
      }
      // toast.success(task ? 'Task updated successfully' : 'Task saved successfully');
      // fetchTasks();
      window.location.reload()
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Error saving task modal');
    } finally {
      setLoading(false);

      isSaveCalled.current = false;
      
    }
  };

  const countCompletedTodos = () => todos.filter((todo) => todo.completed).length;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="title-name">Title</h2>
        <div className="modal-header">
          <input
            className="input-title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='priority-parent'>
          <div className="priority-options">
            <p className="Select-Priority">Select Priority </p>
            <select
              name="priority"
              className="modal-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High Priority</option>
              <option value="Low">Low Priority</option>
              <option value="Moderate">Moderate Priority</option>
            </select>
          </div>
          <div className="priority-options">
            <p className="Select-Priority">Select Status </p>
            <select
              name="status"
              className="modal-priorityOne"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              
              <option value="todo">Todo</option>
              <option value="backlog">Backlog</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <p className="Checklist">Checklist ({countCompletedTodos()} / {todos.length})</p>

        <div className="todo-container">
          <div className="modal-todo-container">
            <ul className="modal-todo-list">
              {todos.map((todo, index) => (
                <li className="modal-todo-item" key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoChange(index, 'completed', !todo.completed)}
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleTodoChange(index, 'text', e.target.value)}
                    className="modal-todo-text"
                  />
                  <button
                    className="delete-button"
                    onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="add-btn" onClick={handleAddTodo}>+ Add New</button>
        </div>

        <div className="last-btns">
          <div className='modal-date-wrapper'>
            <div className="date-input">
              <label htmlFor="dateToStart">Start On</label>
              <input
                type="date"
                id='dateToStart'
                value={toStart}
                onChange={(e) => {
                  setToStart(e.target.value);
                  if (toEnd && e.target.value > toEnd) {
                    setToEnd(e.target.value); 
                  }
                }}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className='date-input'>
              <label htmlFor="dateToEnd">Last date</label>
              <input
                id='dateToEnd'
                type="date"
                value={toEnd}
                onChange={(e) => setToEnd(e.target.value)}
                min={toStart || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="modal-btns">
            <button onClick={onClose} className="btn-1">Cancel</button>
            <button
              className="btn-2"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;




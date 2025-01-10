import React, { useState } from 'react';
import './Modal.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const Modal = ({ onClose }) => {
  const initialTodoState = [{ text: '', completed: false }];
  const [todos, setTodos] = useState(initialTodoState);
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  // const [date, setDate] = useState('')
  const [toStart, setToStart] = useState('')
  const [toEnd, setToEnd] = useState('')
  // status bhi lagana hai
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  
  // function to handle changes in the todos
  const handleTodoChange = (index, field, value) => {
    const newTodos = [...todos];
    newTodos[index][field] = value;
    setTodos(newTodos);
  };


  // function to handle add a new todo in the list
  const handleAddTodo = () => {
    setTodos([...todos, { text: '', completed: false }]);
  };

 

  // function to handle submission and post to the backend
  const handleSave = async() => {
    const token = localStorage.getItem('authToken') //retrive token from local storage
    console.log('authToken', token)
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }


    // if (!title || !toStart || !toEnd || !priority || !status) {
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }

    // const invalidTodos = todos.some((todo) => !todo.text.trim());
    // if (invalidTodos) {
    //   toast.error("Please provide text for all checklist items.");
    //   return;
    // }


    // Data to be send to the backend
    const data = {
      title,
      description: todos.map((todo)=>({
        text: todo.text,
        isCompleted: todo.completed
      })),
      toStart,
      toEnd,
      status: status || 'General',
      priority: priority || 'High'
      // : priority.toLowerCase(), //converting priority to the lowercase to match backend code
    };
    console.log('Data being sent:', data);
    // toast.error('problem in data')


    // now the KHELAAAAAAAAAAAAAAAAAAAAAAAA
    try{
      setLoading(true) // loading while post request to send data in the backend

      const response = await axios.post('https://taskmanager-yxx2.onrender.com/api/task',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}` //including authorization in request (i really dont know why)
          }
        }
        
      )
      console.log('Task saved successfully', response.data)
      toast.success('Data stored successfully')
      onClose() //close modal after sucessfully saving it



    }catch(error){
      // console.error('Error in saving task', error)
      // toast.error('error in saving task')
      console.error('Error in saving task', error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : 'Error in saving task');
    }finally{
      setLoading(false)
    }
  
  }



  // count the number of completed todos
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
            onChange={(e)=>setTitle(e.target.value)} 
          />
        </div>

        <div className='priority-parent'>
          <div className="priority-options">
            <p className="Select-Priority">Select Priority </p>
            <select 
              name="priority" 
              className="modal-priority"
              value={priority}
              onChange={(e)=> setPriority(e.target.value)}
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
              onChange={(e)=> setStatus(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Family">Family</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
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
                    onClick={()=>setTodos(todo.filter((_,i)=>i!==index)) } //remove to do from the list
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
                onChange={(e)=> setToStart(e.target.value)}
              />
            </div>
            <div className='date-input'>
            <label htmlFor="dateToEnd">Last date</label>
            <input
                id='dateToEnd'
                type="date"
                value={toEnd}
                onChange={(e)=> setToEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-btns">
            <button onClick={onClose} className="btn-1">Cancel</button>
            <button 
              className="btn-2"
              onClick={handleSave}
              disabled={loading} //disable button while loading
            >
              {/* show loading text while saving */}
              {loading? 'Saving...' : 'Save'} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

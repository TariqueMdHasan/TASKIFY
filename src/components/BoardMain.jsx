// import React, { useEffect, useState } from 'react';
// import './BoardMain.css';
// import Modal from './Modal';
// import { VscCollapseAll } from "react-icons/vsc";
// import { FaChevronDown } from "react-icons/fa";
// import { FaChevronUp } from "react-icons/fa";
// import axios from 'axios';
// import { toast } from 'react-toastify';







// const BoardMain = ({ status }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [todoLists, setTodoLists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedIndex, setExpandedIndex] = useState(null);

  

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/task', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTodoLists(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const addTodoList = async (newTodoList) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.post('https://taskmanager-yxx2.onrender.com/api/task', newTodoList, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTodoLists([...todoLists, response.data]);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const handleDeleteTodoList = async (index) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const taskId = todoLists[index]._id;
//       await axios.delete(`https://taskmanager-yxx2.onrender.com/api/task/${taskId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTodoLists(todoLists.filter((_, i) => i !== index));
//       toast.success('Task deleted successfully')
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       toast.error('Task not deleted')
//     }
//   };

//   const toggleExpand = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   const countCompletedTodos = (todos) => todos.filter((todo) => todo.isCompleted).length;

//   const formatDate = (dateString) => {
//     const options = { day: 'numeric', month: 'short', year: 'numeric' };
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', options);
//   };

//   const collapseAll = () => {
//     setExpandedIndex(null);
//   };

//   const filteredTodoLists = todoLists.filter((task) => task.status.toLowerCase() === status.toLowerCase());












//   return (
//     <div className="Main">
//       <div className="Main-top">
//         <div className="Main-top-left">
//           <h3>{status}</h3>
//         </div>
//         <div className="Main-top-right">
//           <button onClick={toggleModal} className="Plus-button">+</button>
//           <VscCollapseAll onClick={collapseAll} />
//         </div>
//       </div>
//       {showModal && (
//         <Modal
//           onClose={toggleModal}
//           onSubmit={addTodoList}
//         />
//       )}
//       <div className="ticket">
//         {loading ? (
//           <p>Loading...</p>
//         ) : filteredTodoLists.length > 0 ? (
//           filteredTodoLists.map((list, index) => (
//             <div key={index} className="todo-list-container">
//               <div className="main-todo-header">
//                 <div>
//                   <h3 className="title">{list.title}</h3>
//                   <p className="priority">{list.priority}</p>
//                   <p className="checklist">
//                     Checklist ({countCompletedTodos(list.description)} / {list.description.length})
//                   </p>
//                 </div>
//                 <button
//                   className="expand-button"
//                   onClick={() => toggleExpand(index)}
//                 >
//                   {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
//                 </button>
//               </div>
//               {expandedIndex === index && (
//                 <ul className="todo-list">
//                   {list.description.map((todo, todoIndex) => (
//                     <li key={todoIndex} className="todo-item">
//                       <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
//                         {todo.text}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <div className="bm-date-container">
//                 <div className="all-btns-up">
//                   <p className="bm-date-p">Starts</p>
//                   <p className="date">{formatDate(list.toStart)}</p>
//                 </div>
//                 <div className="all-btns-down">
//                   <p className="bm-date-p">End</p>
//                   <p className="date">{formatDate(list.toEnd)}</p>
//                 </div>
//               </div>
//               <div className="dropdown">
//                 <button className="bm-delete-button" onClick={() => handleDeleteTodoList(index)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No tasks available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BoardMain;

























import React, { useEffect, useState } from 'react';
import './BoardMain.css';
import Modal from './Modal';
import { VscCollapseAll } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const BoardMain = ({ status }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/task', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodoLists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setEditingTask(null); // Reset editing task when closing modal
    }
  };

  // Add a new task
  const addTodoList = async (newTodoList) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('https://taskmanager-yxx2.onrender.com/api/task', newTodoList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoLists([...todoLists, response.data]);
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error creating task');
    }
  };

  // Delete a task
  const handleDeleteTodoList = async (taskId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://taskmanager-yxx2.onrender.com/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoLists(todoLists.filter((task) => task._id !== taskId)); // Filter by task ID
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Task not deleted');
    }
  };

  // Edit a task
  const handleEditTodoList = (task) => {
    setEditingTask(task); // Pass the entire task object
    setShowModal(true); // Open the modal
  };

  // Update a task
  const updateTodoList = async (updatedTodoList) => {
    try {
      const token = localStorage.getItem('authToken');
      const taskId = updatedTodoList._id;
      const response = await axios.put(
        `https://taskmanager-yxx2.onrender.com/api/task/${taskId}`,
        updatedTodoList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodoLists((prevTodoLists) =>
        prevTodoLists.map((task) => (task._id === taskId ? response.data : task))
      );
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Task not updated');
    }
  };

  // Toggle expand/collapse for a task
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Count completed todos
  const countCompletedTodos = (todos) => todos.filter((todo) => todo.isCompleted).length;

  // Format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Collapse all tasks
  const collapseAll = () => {
    setExpandedIndex(null);
  };

  // Filter tasks based on status
  const filteredTodoLists = todoLists.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  return (
    <div className="Main">
      <div className="Main-top">
        <div className="Main-top-left">
          <h3>{status}</h3>
        </div>
        <div className="Main-top-right">
          <button onClick={toggleModal} className="Plus-button">+</button>
          <VscCollapseAll onClick={collapseAll} />
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={toggleModal}
          onSubmit={editingTask ? updateTodoList : addTodoList}
          task={editingTask}
        />
      )}
      <div className="ticket">
        {loading ? (
          <p>Loading...</p>
        ) : filteredTodoLists.length > 0 ? (
          filteredTodoLists.map((list, index) => (
            <div key={list._id} className="todo-list-container">
              <div className="main-todo-header">
                <div>
                  <h3 className="title">{list.title}</h3>
                  <p className="priority">{list.priority}</p>
                  <p className="checklist">
                    Checklist ({countCompletedTodos(list.description)} / {list.description.length})
                  </p>
                </div>
                <button
                  className="expand-button"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {expandedIndex === index && (
                <ul className="todo-list">
                  {list.description.map((todo, todoIndex) => (
                    <li key={todoIndex} className="todo-item">
                      <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                        {todo.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="bm-date-container">
                <div className="all-btns-up">
                  <p className="bm-date-p">Starts</p>
                  <p className="date">{formatDate(list.toStart)}</p>
                </div>
                <div className="all-btns-down">
                  <p className="bm-date-p">End</p>
                  <p className="date">{formatDate(list.toEnd)}</p>
                </div>
              </div>
              <div className="dropdown">
                <button className="bm-edit-button" onClick={() => handleEditTodoList(list)}>
                  Edit
                </button>
                <button className="bm-delete-button" onClick={() => handleDeleteTodoList(list._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default BoardMain;
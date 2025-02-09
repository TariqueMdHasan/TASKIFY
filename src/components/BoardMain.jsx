import React, { useEffect, useState } from 'react';
import './BoardMain.css';
import Modal from './Modal';
import DeleteModal from './DeleteModal';
import { VscCollapseAll } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const BoardMain = ({ status }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); 

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Moderate': return 'yellow';
      case 'Low': return 'green';
      default: return 'white';
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setEditingTask(null);
    }
  };

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
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error creating task');
    }
  };

  const handleDeleteTodoList = async (taskId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://taskmanager-yxx2.onrender.com/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoLists(todoLists.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Task not deleted');
    }
  };

  const handleEditTodoList = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

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
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Task not updated');
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const countCompletedTodos = (todos) => todos.filter((todo) => todo.isCompleted).length;

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const collapseAll = () => {
    setExpandedIndex(null);
  };

  const filteredTodoLists = todoLists.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      handleDeleteTodoList(taskToDelete);
    }
    closeDeleteModal();
  };

  return (
    <div className="Main">
      <div className="Main-top">
        <div className="Main-top-left">
          <h3>{status}</h3>
        </div>
        <div className="Main-top-right">
          {status === 'TODO' && (
            <button onClick={toggleModal} className="Plus-button">+</button>
          )}
          <VscCollapseAll onClick={collapseAll} />
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={toggleModal}
          addTodoList={addTodoList}
          updateTodoList={updateTodoList}
          task={editingTask}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
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
                  <h3 className="title">
                    {list.title.length > 12 ? list.title.slice(0, 12) + "..." : list.title}
                  </h3>
                  <p className="priority" style={{ color: getPriorityColor(list.priority) }}>
                    {list.priority}
                  </p>
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
                <button className="bm-delete-button" onClick={() => openDeleteModal(list._id)}>
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


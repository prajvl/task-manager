import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo as createTodoAction, updateTodo as updateTodoAction, deleteTodo as deleteTodoAction } from './store/todosSlice';
import { logout } from './store/authSlice';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function TodoApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const { username } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
    
    
    if (location.state?.welcomeMessage) {
      setWelcomeMessage(location.state.welcomeMessage);
      
      setTimeout(() => {
        setWelcomeMessage(null);
      }, 5000);
      
      navigate(location.pathname, { replace: true });
    }
  }, [dispatch, location.state, navigate, location.pathname]);

  const createTodo = async (data) => {
    await dispatch(createTodoAction(data));
  };

  const updateTodo = async (id, data) => {
    await dispatch(updateTodoAction({ id, data }));
    setEditing(null);
  };

  const handleDeleteTodo = async (id) => {
    await dispatch(deleteTodoAction(id));
  };

  const toggleTodo = (todo) => {
    dispatch(updateTodoAction({ 
      id: todo._id, 
      data: { ...todo, completed: !todo.completed } 
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 font-sans">
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 backdrop-blur-xl"></div>
        <div className="relative flex justify-between items-center w-full px-6 py-4 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-card">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-sm text-slate-500">Stay organized, stay productive</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/30">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                Hello, {username}
              </span>
            </div>
            <button 
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-card hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={handleLogout}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col items-center px-6 py-8 space-y-8">
        
        {welcomeMessage && (
          <div className="w-full max-w-4xl bg-primary-50/80 backdrop-blur-md border border-primary-200 text-primary-800 rounded-2xl p-4 flex items-center gap-3 shadow-soft animate-pulse">
            <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{welcomeMessage}</span>
          </div>
        )}

        
        {error && (
          <div className="w-full max-w-4xl bg-red-50/80 backdrop-blur-md border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3 shadow-soft">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-soft p-8">
          <TodoForm
            onCreate={createTodo}
            onUpdate={updateTodo}
            editing={editing}
            onCancel={() => setEditing(null)}
          />
        </div>

        
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-soft p-8">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent absolute inset-0"></div>
              </div>
              <p className="mt-4 text-slate-500 font-medium">Loading your tasks...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onEdit={setEditing}
              onDelete={handleDeleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

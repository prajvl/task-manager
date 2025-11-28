import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No tasks yet</h3>
        <p className="text-slate-500">Create your first task to get started organizing your work!</p>
      </div>
    );
  }

  const pendingTodos = todos.filter(todo => todo.status === 'pending');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Your Tasks</h3>
          <p className="text-sm text-slate-500 mt-1">
            {pendingTodos.length} pending, {completedTodos.length} completed
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-xs font-medium">{pendingTodos.length} Pending</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium">{completedTodos.length} Done</span>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Pending Tasks
          </h4>
          <div className="space-y-2">
            {pendingTodos.map(todo => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                onToggle={onToggle} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Completed Tasks
          </h4>
          <div className="space-y-2">
            {completedTodos.map(todo => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                onToggle={onToggle} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;

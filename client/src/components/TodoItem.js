import React from 'react';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const handleStatusToggle = () => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    onToggle({
      ...todo,
      status: newStatus,
      completed: newStatus === 'completed'
    });
  };

  const isCompleted = todo.status === 'completed';

  return (
    <div className={`group relative p-5 rounded-2xl border transition-all duration-200 hover:shadow-card ${
      isCompleted 
        ? 'bg-green-50/50 border-green-200/60 hover:bg-green-50' 
        : 'bg-white border-slate-200 hover:bg-slate-50/50'
    }`}>
      
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
        isCompleted ? 'bg-green-500' : 'bg-amber-500'
      }`}></div>

      <div className="flex items-start gap-4">
        
        <button
          onClick={handleStatusToggle}
          className={`relative flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
            isCompleted
              ? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          {isCompleted && (
            <svg className="w-4 h-4 text-white absolute inset-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className={`font-semibold text-lg leading-tight transition-all duration-200 ${
                isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'
              }`}>
                {todo.title}
              </h4>
              {todo.description && (
                <p className={`mt-1 text-sm leading-relaxed ${
                  isCompleted ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3">
                
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {isCompleted ? '✅' : '📋'}
                  {isCompleted ? 'Completed' : 'Pending'}
                </span>
                
                <span className="text-xs text-slate-400">
                  {new Date(todo.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(todo)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;

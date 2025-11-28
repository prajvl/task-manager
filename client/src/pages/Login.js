import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/authSchemas';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        data
      );

      dispatch(loginSuccess({
        token: res.data.token,
        username: res.data.username
      }));

      navigate('/tasks');
    } catch (err) {
      setError('root', {
        message: err.response?.data?.message || 'Login failed'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-card mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500">Sign in to your Task Manager account</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-soft p-8">
          <h3 className="text-center mb-6 text-slate-800 text-xl font-semibold">Sign In</h3>

          {errors.root && (
            <div className="bg-red-50/80 backdrop-blur-md border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3 shadow-soft mb-6">
              <span className="font-medium">{errors.root.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2">Username</label>
              <input {...register('username')} type="text" className="w-full px-4 py-3 bg-white border rounded-xl" placeholder="Enter your username" />
              {errors.username && <p className="text-red-600 text-sm mt-2">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2">Password</label>
              <input {...register('password')} type="password" className="w-full px-4 py-3 bg-white border rounded-xl" placeholder="Enter password" />
              {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="text-center mt-6">
            <p className="text-slate-600 mb-3">Don't have an account?</p>
            <button onClick={() => navigate('/signup')} className="text-primary-600 font-semibold">
              Create an account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../validations/authSchemas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;

      // 🔥 Signup using API URL from .env
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { username, password });
      
      // 🔥 Auto login after registration
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { username, password }
      );

      // Save Auth Data to Redux
      dispatch(loginSuccess({
        token: loginResponse.data.token,
        username: loginResponse.data.username
      }));
      
      // Redirect to tasks page
      navigate('/tasks', {
        state: { welcomeMessage: `Welcome to Task Manager, ${username}!` }
      });

    } catch (err) {
      setError('root', {
        message: err.response?.data?.message || 'Signup failed'
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-500">Join Task Manager and stay organized</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md border shadow-soft rounded-3xl p-8">

          <h3 className="text-center text-xl font-semibold mb-6">Sign Up</h3>

          {/* Root Error */}
          {errors.root && (
            <div className="text-red-700 bg-red-100 p-3 rounded-lg mb-4 text-center">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Username */}
            <div>
              <label className="font-semibold">Username</label>
              <input {...register('username')} className="w-full px-4 py-2 border rounded-lg" />
              {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold">Password</label>
              <input {...register('password')} type="password" className="w-full px-4 py-2 border rounded-lg" />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-semibold">Confirm Password</label>
              <input {...register('confirmPassword')} type="password" className="w-full px-4 py-2 border rounded-lg" />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3 rounded-xl"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <div className="text-center mt-6">
            <p className="text-slate-600">Already have an account?</p>
            <button onClick={() => navigate('/login')} className="text-primary-600 font-semibold">
              Sign in instead
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

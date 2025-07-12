import  { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (field:string, value:string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* Floating glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="bg-black/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 w-full max-w-lg animate-fade-in space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-5 rounded-full animate-float shadow-lg shadow-pink-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-gray-300 text-center text-lg">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full pl-12 py-3 rounded-lg bg-gray-800/70 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-12 py-3 rounded-lg bg-gray-800/70 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-gray-800/70 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.356a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1rem'
              }}
            >
              <option value="" className="bg-gray-800 text-white">
                Select your role
              </option>
              {roles.map((role) => (
                <option key={role.value} value={role.value} className="bg-gray-800 text-white">
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition shadow-md shadow-pink-500/30"
          >
            Sign In
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-gray-400 text-base">
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-purple-400 underline hover:text-purple-300 transition">
              Create one
            </Link>
          </p>
          <Link to='/' className="text-gray-400 underline hover:text-gray-200 transition text-base">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

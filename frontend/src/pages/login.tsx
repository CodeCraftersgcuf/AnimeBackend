import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterModal from './register'; // <-- import the register modal

const LoginModal = () => {
  const [show, setShow] = useState(true);
  const [showRegister, setShowRegister] = useState(false); // <-- add state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setTimeout(() => navigate(-1), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShow(false);
    setTimeout(() => navigate('/'), 200);
  };

  if (showRegister) {
    return <RegisterModal />;
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleClose}
    >
      <div
        className="relative bg-[#232234] rounded-2xl shadow-2xl w-full max-w-md p-8 mx-2"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white text-3xl hover:text-pink-400"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 mt-2">Welcome back!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest" htmlFor="email">
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              className="w-full rounded-lg px-4 py-3 bg-[#181824] text-white border-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg px-4 py-3 bg-[#181824] text-white border-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-blue-400 font-semibold text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="accent-blue-500 w-4 h-4"
              />
              Remember me
            </label>
            <a href="#" className="text-pink-300 text-sm hover:underline font-medium">
              Forgot password?
            </a>
          </div>
        
          <button
            type="submit"
            className="w-full bg-pink-300 text-pink-900 font-bold text-lg py-3 rounded-lg hover:bg-pink-400 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-gray-300 text-sm">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-pink-300 hover:underline font-semibold"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          {' '}or{' '}
          <a href="#" className="text-pink-300 hover:underline font-semibold">Verify</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

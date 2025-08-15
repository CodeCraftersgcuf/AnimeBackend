import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterModal = () => {
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
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
                <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 mt-2">Create an Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest" htmlFor="name">
                            YOUR NAME
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-lg px-4 py-3 bg-[#181824] text-white border-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
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
                    <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2 tracking-widest" htmlFor="confirm">
                            CONFIRM PASSWORD
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full rounded-lg px-4 py-3 bg-[#181824] text-white border-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-300 text-pink-900 font-bold text-lg py-3 rounded-lg hover:bg-pink-400 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;

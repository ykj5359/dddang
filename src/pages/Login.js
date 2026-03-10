import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { authStorage, isValidEmail } from '../utils/authUtils';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(form.email)) { setError('이메일 형식이 올바르지 않습니다.'); return; }
    if (!form.password) { setError('비밀번호를 입력하세요.'); return; }
    const user = authStorage.findUser(form.email);
    if (!user || user.password !== form.password) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); return; }
    login(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🌾</div>
            <h1 className="text-2xl font-bold text-green-800">땅꾼 로그인</h1>
            <p className="text-gray-400 text-sm mt-1">토지 거래 올인원 플랫폼</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">이메일</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                placeholder="example@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">비밀번호</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                placeholder="비밀번호 입력"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
            </div>

            {error && <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</div>}

            <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-bold transition-colors">
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">계정이 없으신가요?
              <Link to="/register" className="text-green-700 font-bold ml-1">회원가입</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

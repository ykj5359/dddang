import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_ID = 'admin';
const ADMIN_PW = 'admin1234';

function AdminLogin() {
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === ADMIN_ID && form.password === ADMIN_PW) {
      sessionStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">관리자 로그인</h1>
          <p className="text-slate-400 text-sm mt-1">땅꾼 Admin Console</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">관리자 아이디</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                placeholder="admin"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 placeholder-slate-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">비밀번호</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="비밀번호 입력"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 placeholder-slate-500"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-900/30 border border-red-800 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold transition-colors mt-2"
            >
              로그인
            </button>
          </form>

          <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">기본 계정: admin / admin1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

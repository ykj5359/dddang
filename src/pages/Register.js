import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { authStorage, isValidEmail, getPasswordStrength, formatPhone } from '../utils/authUtils';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', agree: false });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const pwStrength = getPasswordStrength(form.password);

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('이름을 입력하세요.'); return; }
    if (!isValidEmail(form.email)) { setError('이메일 형식이 올바르지 않습니다.'); return; }
    if (form.password.length < 8) { setError('비밀번호는 8자 이상이어야 합니다.'); return; }
    if (authStorage.findUser(form.email)) { setError('이미 가입된 이메일입니다.'); return; }
    if (!form.agree) { setError('개인정보 수집에 동의해주세요.'); return; }

    const newUser = { name: form.name, email: form.email, password: form.password, phone: form.phone, grade: 'bronze', joinDate: new Date().toISOString() };
    authStorage.addUser(newUser);
    login(newUser);
    navigate('/register/complete');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">회원가입</h1>
            <p className="text-slate-400 text-sm mt-1">가입 후 모든 기능을 이용하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: '이름', type: 'text', ph: '홍길동' },
              { key: 'email', label: '이메일', type: 'email', ph: 'example@email.com' },
            ].map(({ key, label, type, ph }) => (
              <div key={key}>
                <label className="text-xs text-slate-500 block mb-1">{label}</label>
                <input type={type} value={form[key]} onChange={(e) => up(key, e.target.value)} required placeholder={ph}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
              </div>
            ))}

            <div>
              <label className="text-xs text-slate-500 block mb-1">비밀번호</label>
              <input type="password" value={form.password} onChange={(e) => up('password', e.target.value)} required placeholder="8자 이상 입력"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= pwStrength.score ? pwStrength.color : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${pwStrength.text}`}>{pwStrength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-slate-500 block mb-1">전화번호 (선택)</label>
              <input type="tel" value={form.phone} onChange={(e) => up('phone', formatPhone(e.target.value))} placeholder="010-0000-0000"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">{error}</div>}

            <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={(e) => up('agree', e.target.checked)} className="mt-0.5 rounded" />
              <span>개인정보 수집·이용에 동의합니다 (필수)<br /><span className="text-slate-400">가입 정보는 서비스 제공 목적으로만 사용됩니다.</span></span>
            </label>

            <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
              회원가입
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">이미 계정이 있으신가요?
              <Link to="/login" className="text-green-700 font-semibold ml-1">로그인</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const REGIONS = ['서울', '경기', '인천', '강원', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '부산', '대구', '대전', '광주', '울산', '제주'];
const TYPES = ['전체', '대지', '임야', '농지', '공장부지'];
const ALERT_TYPES = [
  { key: 'newTrade', label: '신규 거래 발생', desc: '관심 지역에 새로운 토지 거래가 등록될 때' },
  { key: 'priceChange', label: '가격 변동', desc: '관심 지역 평균 거래가격이 5% 이상 변동될 때' },
  { key: 'newAuction', label: '경매 물건 등록', desc: '관심 지역에 새로운 경매 물건이 등록될 때' },
  { key: 'newDirect', label: '직거래 매물 등록', desc: '관심 지역에 직거래 매물이 등록될 때' },
];

function AlertSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    { id: 1, region: '경기도 용인시', type: '임야', priceMin: '', priceMax: '', alertTypes: { newTrade: true, priceChange: true, newAuction: false, newDirect: false }, active: true },
    { id: 2, region: '제주도 서귀포시', type: '전체', priceMin: '', priceMax: '', alertTypes: { newTrade: true, priceChange: false, newAuction: true, newDirect: true }, active: true },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ region: '경기', type: '전체', priceMin: '', priceMax: '', alertTypes: { newTrade: true, priceChange: false, newAuction: false, newDirect: false } });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-slate-500 mb-4">로그인이 필요합니다</p>
            <button type="button" onClick={() => navigate('/login')}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm">로그인하기</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const addAlert = (e) => {
    e.preventDefault();
    const newAlert = { id: Date.now(), ...form, active: true };
    setAlerts((prev) => [...prev, newAlert]);
    setShowForm(false);
    setForm({ region: '경기', type: '전체', priceMin: '', priceMax: '', alertTypes: { newTrade: true, priceChange: false, newAuction: false, newDirect: false } });
  };

  const toggleAlert = (id) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  const deleteAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const upAlertType = (k) => setForm((p) => ({ ...p, alertTypes: { ...p.alertTypes, [k]: !p.alertTypes[k] } }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 max-w-3xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">관심지역 알림 설정</h1>
            <p className="text-sm text-slate-500 mt-1">관심 지역의 토지 거래·가격변동을 실시간으로 알려드립니다</p>
          </div>
          <button type="button" onClick={() => setShowForm(true)}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
            + 알림 추가
          </button>
        </div>

        {/* 알림 추가 폼 */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-700 text-sm">새 알림 설정</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={addAlert}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">관심 지역 *</label>
                  <select value={form.region} onChange={(e) => up('region', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500">
                    {REGIONS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">지목</label>
                  <select value={form.type} onChange={(e) => up('type', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500">
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">최소 가격 (만원)</label>
                  <input type="number" value={form.priceMin} onChange={(e) => up('priceMin', e.target.value)} placeholder="제한 없음"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">최대 가격 (만원)</label>
                  <input type="number" value={form.priceMax} onChange={(e) => up('priceMax', e.target.value)} placeholder="제한 없음"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-slate-500 block mb-2">알림 유형</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ALERT_TYPES.map((at) => (
                    <label key={at.key} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.alertTypes[at.key] ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}>
                      <input type="checkbox" checked={form.alertTypes[at.key]} onChange={() => upAlertType(at.key)} className="mt-0.5 rounded" />
                      <div>
                        <div className="text-xs font-medium text-slate-700">{at.label}</div>
                        <div className="text-xs text-slate-400">{at.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors">
                알림 저장
              </button>
            </form>
          </div>
        )}

        {/* 알림 목록 */}
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-200">
              <svg className="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-slate-500 text-sm">설정된 알림이 없습니다</p>
              <button type="button" onClick={() => setShowForm(true)}
                className="mt-4 text-sm text-green-700 border border-green-200 px-4 py-2 rounded-lg">알림 추가하기</button>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${alert.active ? 'border-green-200' : 'border-slate-100 opacity-60'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-800 text-sm">{alert.region}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{alert.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${alert.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {alert.active ? '활성' : '비활성'}
                      </span>
                    </div>
                    {(alert.priceMin || alert.priceMax) && (
                      <p className="text-xs text-slate-400">
                        가격: {alert.priceMin ? `${parseInt(alert.priceMin, 10).toLocaleString()}만원` : '제한없음'} ~ {alert.priceMax ? `${parseInt(alert.priceMax, 10).toLocaleString()}만원` : '제한없음'}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => toggleAlert(alert.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${alert.active ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                      {alert.active ? '비활성화' : '활성화'}
                    </button>
                    <button type="button" onClick={() => deleteAlert(alert.id)} className="text-xs text-red-400 hover:text-red-600 border border-red-100 px-3 py-1.5 rounded-lg transition-colors">삭제</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALERT_TYPES.filter((at) => alert.alertTypes?.[at.key]).map((at) => (
                    <span key={at.key} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{at.label}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-700 mb-1">알림 안내</p>
          <ul className="text-xs text-amber-600 space-y-1">
            <li>· 알림은 회원 가입 시 등록한 이메일로 발송됩니다</li>
            <li>· 실버 등급 이상: 가격변동 알림 이용 가능</li>
            <li>· 골드 등급 이상: 경매 알림 이용 가능</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AlertSettings;

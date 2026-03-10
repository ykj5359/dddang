import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const STATS = [
  {
    label: '총 회원수',
    value: '1,284',
    change: '+32',
    up: true,
    color: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: '등록 매물',
    value: '487',
    change: '+8',
    up: true,
    color: 'bg-green-50 border-green-100',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    label: '상담 요청',
    value: '63',
    change: '-5',
    up: false,
    color: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    label: '이달 거래량',
    value: '29',
    change: '+11',
    up: true,
    color: 'bg-purple-50 border-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const RECENT_USERS = [
  { name: '김민준', email: 'minjun@email.com', grade: '브론즈', joinDate: '2026-03-10', status: '활성' },
  { name: '이서연', email: 'seoyeon@email.com', grade: '골드', joinDate: '2026-03-09', status: '활성' },
  { name: '박지호', email: 'jiho@email.com', grade: '브론즈', joinDate: '2026-03-09', status: '활성' },
  { name: '최수아', email: 'sua@email.com', grade: '실버', joinDate: '2026-03-08', status: '정지' },
  { name: '정우진', email: 'woojin@email.com', grade: '브론즈', joinDate: '2026-03-07', status: '활성' },
];

const RECENT_LANDS = [
  { address: '경기도 용인시 처인구', type: '임야', area: '661㎡', price: '8,500만원', status: '승인대기' },
  { address: '충청남도 천안시 동남구', type: '전', area: '1,320㎡', price: '4,200만원', status: '승인완료' },
  { address: '전라북도 완주군 삼례읍', type: '답', area: '990㎡', price: '3,800만원', status: '승인완료' },
  { address: '강원도 홍천군 화촌면', type: '임야', area: '3,300㎡', price: '1,100만원', status: '승인대기' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">대시보드</h1>
          <p className="text-sm text-slate-400 mt-0.5">{today} 기준</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((s) => (
            <div key={s.label} className={`bg-white rounded-xl p-5 border ${s.color} shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                  <span className={s.iconColor}>{s.icon}</span>
                </div>
                <span className={`text-xs font-semibold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                  {s.change} <span className="text-slate-400 font-normal">이번달</span>
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent Users */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 text-sm">최근 가입 회원</h2>
              <button type="button" onClick={() => navigate('/admin/users')}
                className="text-xs text-green-700 hover:underline">전체보기</button>
            </div>
            <div className="divide-y divide-slate-50">
              {RECENT_USERS.map((u) => (
                <div key={u.email} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      u.status === '활성' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>{u.status}</span>
                    <p className="text-xs text-slate-400 mt-0.5">{u.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Lands */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 text-sm">최근 등록 매물</h2>
              <button type="button" onClick={() => navigate('/admin/lands')}
                className="text-xs text-green-700 hover:underline">전체보기</button>
            </div>
            <div className="divide-y divide-slate-50">
              {RECENT_LANDS.map((l) => (
                <div key={l.address} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{l.address}</p>
                    <p className="text-xs text-slate-400">{l.type} · {l.area} · {l.price}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    l.status === '승인완료' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">빠른 실행</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: '회원 관리', path: '/admin/users', color: 'border-blue-200 text-blue-700 hover:bg-blue-50' },
              { label: '매물 승인', path: '/admin/lands', color: 'border-green-200 text-green-700 hover:bg-green-50' },
              { label: '상담 처리', path: '/admin/consultations', color: 'border-amber-200 text-amber-700 hover:bg-amber-50' },
              { label: '사이트 보기', path: '/', color: 'border-slate-200 text-slate-700 hover:bg-slate-50' },
            ].map((item) => (
              <button key={item.label} type="button"
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${item.color}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

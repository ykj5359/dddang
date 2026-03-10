import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { GRADE_INFO } from '../utils/authUtils';

const MY_TRADES = [
  { id: 1, address: '경기도 용인시 처인구', area: '661㎡', price: '85000000', type: '임야', status: '관심' },
  { id: 2, address: '서울시 강남구 역삼동', area: '165㎡', price: '980000000', type: '대지', status: '관심' },
];

const MY_ALERTS = [
  { id: 1, region: '경기도 용인시', type: '임야', status: 'active' },
  { id: 2, region: '제주도 서귀포시', type: '전체', status: 'active' },
];

function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

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

  const grade = user.grade || 'bronze';
  const gradeInfo = GRADE_INFO[grade];

  const TABS = [
    { key: 'profile', label: '내 정보' },
    { key: 'favorites', label: '관심 매물' },
    { key: 'alerts', label: '알림 설정' },
    { key: 'direct', label: '내 매물' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 max-w-4xl mx-auto px-4 pb-16">
        {/* 프로필 헤더 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-lg font-bold text-slate-900">{user.name}</h1>
                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border ${gradeInfo.bg} ${gradeInfo.border} ${gradeInfo.color}`}>
                  {gradeInfo.label}
                </span>
              </div>
              <p className="text-sm text-slate-500">{user.email}</p>
              {user.phone && <p className="text-sm text-slate-400">{user.phone}</p>}
            </div>
            <button type="button" onClick={() => { logout(); navigate('/'); }}
              className="text-xs text-slate-400 hover:text-red-500 border border-slate-200 px-3 py-2 rounded-lg transition-colors">
              로그아웃
            </button>
          </div>
          <div className={`mt-4 p-3 rounded-lg border ${gradeInfo.bg} ${gradeInfo.border}`}>
            <p className={`text-xs font-medium ${gradeInfo.color}`}>{gradeInfo.label} 등급: {gradeInfo.desc}</p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl mb-0 shadow-sm">
          {TABS.map((t) => (
            <button key={t.key} type="button" onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                activeTab === t.key ? 'border-green-700 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 border-t-0 p-6 mb-5">
          {/* 내 정보 */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="font-semibold text-slate-700 mb-4 text-sm">내 정보</h2>
              <div className="space-y-0 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {[
                  { label: '이름', value: user.name },
                  { label: '이메일', value: user.email },
                  { label: '연락처', value: user.phone || '-' },
                  { label: '회원 등급', value: gradeInfo.label },
                  { label: '가입일', value: user.joinDate ? new Date(user.joinDate).toLocaleDateString() : '-' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-slate-400 w-24 shrink-0">{item.label}</span>
                    <span className="text-sm font-medium text-slate-700 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-semibold text-amber-700 mb-1">골드 등급으로 업그레이드</p>
                <p className="text-xs text-amber-600">경매·공매 정보 및 토지계획정보를 이용하려면 골드 등급이 필요합니다.</p>
              </div>
            </div>
          )}

          {/* 관심 매물 */}
          {activeTab === 'favorites' && (
            <div>
              <h2 className="font-semibold text-slate-700 mb-4 text-sm">관심 매물</h2>
              {MY_TRADES.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <svg className="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm">관심 매물이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {MY_TRADES.map((trade) => (
                    <div key={trade.id} onClick={() => navigate(`/land/${trade.id}`, { state: trade })}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-green-50 cursor-pointer transition-colors border border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{trade.address}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{trade.area} · {trade.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-700">
                          {parseInt(trade.price, 10) >= 100000000 ? `${Math.floor(parseInt(trade.price, 10) / 100000000)}억원` : `${Math.floor(parseInt(trade.price, 10) / 10000)}만원`}
                        </p>
                        <span className="text-xs text-slate-400">{trade.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 알림 설정 */}
          {activeTab === 'alerts' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-700 text-sm">관심지역 알림</h2>
                <button type="button" onClick={() => navigate('/alert-settings')}
                  className="text-xs text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50">+ 알림 추가</button>
              </div>
              <div className="space-y-2">
                {MY_ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{alert.region}</p>
                      <p className="text-xs text-slate-400 mt-0.5">지목: {alert.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">활성</span>
                      <button type="button" className="text-xs text-slate-400 hover:text-red-500 transition-colors">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 내 매물 */}
          {activeTab === 'direct' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-700 text-sm">내 직거래 매물</h2>
                <button type="button" onClick={() => navigate('/direct-trade')}
                  className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg hover:bg-green-800">+ 매물 등록</button>
              </div>
              <div className="text-center py-10 text-slate-400">
                <svg className="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm">등록된 매물이 없습니다</p>
                <button type="button" onClick={() => navigate('/direct-trade')}
                  className="mt-3 text-xs text-green-700 border border-green-200 px-4 py-2 rounded-lg">매물 등록하기</button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyPage;

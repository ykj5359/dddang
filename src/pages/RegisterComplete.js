import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GRADE_INFO } from '../utils/authUtils';
import Header from '../components/Header';

function RegisterComplete() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const grade = GRADE_INFO['bronze'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-xl p-10 shadow-sm border border-slate-200 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">가입 완료!</h1>
          <p className="text-slate-500 mb-6">
            {user?.name || ''}님, 땅꾼에 오신 것을 환영합니다!
          </p>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${grade.bg} ${grade.border}`}>
            <span className={`font-bold text-sm ${grade.color}`}>{grade.label} 회원</span>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left space-y-2 border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 mb-3">이용 가능한 기능</h3>
            {[
              { label: '전국 토지 실거래가 조회', available: true },
              { label: '지도 기반 토지 검색', available: true },
              { label: 'LTV·DSR·DTI 대출 계산', available: true },
              { label: '직거래 매물 등록', available: true },
              { label: '무료 상담 신청', available: true },
              { label: '실버: 주변 가격변동 조회', available: false },
              { label: '골드: 경매·공매·토지계획정보', available: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                {item.available ? (
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                <span className={item.available ? '' : 'text-slate-400'}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => navigate('/')}
              className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors">
              지도 보기
            </button>
            <button type="button" onClick={() => navigate('/mypage')}
              className="bg-white hover:bg-slate-50 text-green-700 py-3 rounded-lg font-semibold text-sm border border-green-200 transition-colors">
              마이페이지
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterComplete;

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">땅꾼</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">전국 토지 실거래가 조회, 직거래, 경매 정보, 대출 계산까지 토지 거래 올인원 플랫폼</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">서비스</h4>
            <div className="space-y-2.5 text-xs">
              <Link to="/" className="block hover:text-white transition-colors">지도 검색</Link>
              <Link to="/land-category" className="block hover:text-white transition-colors">유형별 매물</Link>
              <Link to="/direct-trade" className="block hover:text-white transition-colors">직거래 매물</Link>
              <Link to="/auction" className="block hover:text-white transition-colors">경매 정보</Link>
              <Link to="/statistics" className="block hover:text-white transition-colors">부동산 통계</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">농지신탁</h4>
            <div className="space-y-2.5 text-xs">
              <Link to="/farmland-consult" className="block hover:text-white transition-colors">농지신탁 상담</Link>
              <Link to="/farmland-matching" className="block hover:text-white transition-colors">귀농귀촌 매칭</Link>
              <Link to="/my-land" className="block hover:text-white transition-colors">내 토지 관리</Link>
              <Link to="/loan" className="block hover:text-white transition-colors">대출 계산기</Link>
              <Link to="/consultation" className="block hover:text-white transition-colors">무료 상담</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">고객센터</h4>
            <div className="space-y-2.5 text-xs">
              <p className="text-slate-300 font-medium">1588-0000</p>
              <p>평일 09:00 ~ 18:00</p>
              <Link to="/alert-settings" className="block hover:text-white transition-colors">알림 설정</Link>
              <Link to="/mypage" className="block hover:text-white transition-colors">마이페이지</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">© 2025 땅꾼. 국토교통부 공공데이터 기반 서비스. 본 정보는 참고용이며 투자 판단의 책임은 이용자에게 있습니다.</p>
          <div className="flex gap-5 text-xs">
            <span className="cursor-pointer hover:text-white transition-colors">이용약관</span>
            <span className="cursor-pointer hover:text-white transition-colors">개인정보처리방침</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TYPES = [
  {
    key: '대지',
    title: '대지',
    subtitle: '건축용지',
    desc: '주택·상가 건축이 가능한 도심 핵심 토지',
    features: ['주택 건축', '상업시설', '오피스텔'],
    ltv: '70%',
    avgPrice: '㎡당 50~500만원',
    count: 7,
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-600 text-white',
    accent: 'text-blue-600',
  },
  {
    key: '임야',
    title: '임야',
    subtitle: '산림·임업용지',
    desc: '산림경영·레저·태양광 투자 목적 토지',
    features: ['산림경영', '휴양시설', '태양광'],
    ltv: '50%',
    avgPrice: '㎡당 2~15만원',
    count: 5,
    color: 'border-green-200 bg-green-50',
    badge: 'bg-green-700 text-white',
    accent: 'text-green-700',
  },
  {
    key: '농지',
    title: '농지',
    subtitle: '농업진흥지역',
    desc: '전·답·과수원 등 농업 목적 토지',
    features: ['경작', '비닐하우스', '주말농장'],
    ltv: '60%',
    avgPrice: '㎡당 5~50만원',
    count: 4,
    color: 'border-amber-200 bg-amber-50',
    badge: 'bg-amber-500 text-white',
    accent: 'text-amber-600',
  },
  {
    key: '공장부지',
    title: '공장부지',
    subtitle: '산업·제조업용지',
    desc: '공장·물류창고 운영 목적 산업단지 토지',
    features: ['제조업', '물류창고', '산업시설'],
    ltv: '65%',
    avgPrice: '㎡당 20~100만원',
    count: 4,
    color: 'border-slate-200 bg-slate-50',
    badge: 'bg-slate-600 text-white',
    accent: 'text-slate-600',
  },
];

const REGIONAL = [
  { label: '강원도', desc: '청정 자연 속 임야·전원부지', region: '강원' },
  { label: '제주도', desc: '관광지 인근 감귤밭·전원주택부지', region: '제주' },
  { label: '시골땅', desc: '저렴한 시골 대지·농지', region: '충청' },
  { label: '전원부지', desc: '전원생활 가능한 대지·임야 복합', region: '경기' },
  { label: '경상도', desc: '산업단지 인근 공장부지·대지', region: '경상' },
  { label: '전라도', desc: '비옥한 농지·간척지', region: '전라' },
];

function LandTypeHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        {/* 페이지 헤더 */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">토지 유형별 매물</h1>
            <p className="text-sm text-slate-500">원하는 토지 유형을 선택하여 맞춤 매물을 확인하세요</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 지목별 */}
          <section className="mb-12">
            <h2 className="text-base font-semibold text-slate-700 mb-5">지목별 매물</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TYPES.map((type) => (
                <div key={type.key}
                  onClick={() => navigate(`/land-type/${type.key}`)}
                  className={`bg-white rounded-lg border ${type.color} hover:shadow-md transition-all cursor-pointer overflow-hidden group`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-block text-xs px-2 py-0.5 rounded font-semibold ${type.badge} mb-2`}>{type.subtitle}</span>
                        <h3 className="text-lg font-bold text-slate-900">{type.title}</h3>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded font-medium">{type.count}건</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{type.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {type.features.map((f) => (
                        <span key={f} className="text-xs bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded">{f}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 rounded-md p-2.5">
                        <div className="text-slate-400 mb-0.5">LTV 한도</div>
                        <div className={`font-bold ${type.accent}`}>{type.ltv}</div>
                      </div>
                      <div className="bg-slate-50 rounded-md p-2.5">
                        <div className="text-slate-400 mb-0.5">평균 단가</div>
                        <div className="font-medium text-slate-600 text-[10px] leading-tight">{type.avgPrice}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 group-hover:bg-green-50 transition-colors">
                    <span className={`text-xs font-medium ${type.accent} group-hover:text-green-700`}>매물 보기 →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 지역별 */}
          <section>
            <h2 className="text-base font-semibold text-slate-700 mb-5">지역별 특화 매물</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {REGIONAL.map((r) => (
                <div key={r.label}
                  onClick={() => navigate(`/land-type/전체`, { state: { region: r.region } })}
                  className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-100 transition-colors">
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-green-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">{r.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandTypeHome;

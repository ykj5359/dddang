import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PriceTrendChart from '../components/PriceTrendChart';
import PblntfPricePanel from '../components/PblntfPricePanel';
import { fetchLandTrades, getSidoCodeFromAddress, formatPrice, formatArea } from '../api/landApi';

const TABS = ['실거래가', '가격트렌드', '토지정보', '경매정보'];

const TYPE_STYLE = {
  대지: 'bg-blue-50 text-blue-700 border-blue-200',
  임야: 'bg-green-50 text-green-700 border-green-200',
  농지: 'bg-amber-50 text-amber-700 border-amber-200',
  공장: 'bg-slate-100 text-slate-600 border-slate-200',
};

const SAMPLE_AUCTIONS = [
  { caseNo: '2024타경12345', court: '수원지방법원', appraisalPrice: 95000000, minBid: 66500000, bidDate: '2025-02-15', status: '진행중', area: '661㎡', address: '경기도 용인시 처인구' },
  { caseNo: '2024타경98765', court: '서울중앙지방법원', appraisalPrice: 1050000000, minBid: 735000000, bidDate: '2025-02-22', status: '진행중', area: '330㎡', address: '서울시 강남구 역삼동' },
];

function LandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('실거래가');

  const detail = {
    address: location.state?.address || '서울시 강남구 역삼동',
    price: location.state?.price || '980000000',
    area: location.state?.area || '330㎡',
    type: location.state?.type || '대지',
    date: location.state?.date || '2024-11',
    buildingCoverage: 60,
    floorAreaRatio: 200,
    zoning: '제2종일반주거지역',
    roadWidth: '6m 이상',
    shape: '정방형',
    slope: '평지',
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const sidoCode = getSidoCodeFromAddress(detail.address);
        const result = await fetchLandTrades({ sidoCode, numOfRows: 10 });
        setTrades(result.success && result.data.length > 0 ? result.data : getSample());
      } catch {
        setTrades(getSample());
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getSample = () => [
    { dealAmount: '9800', dealYear: '2024', dealMonth: '11', landArea: '33.0', landType: '대지', umdNm: '역삼동', ldCodeNm: '강남구' },
    { dealAmount: '8500', dealYear: '2024', dealMonth: '10', landArea: '28.5', landType: '대지', umdNm: '역삼동', ldCodeNm: '강남구' },
    { dealAmount: '7200', dealYear: '2024', dealMonth: '09', landArea: '25.0', landType: '대지', umdNm: '역삼동', ldCodeNm: '강남구' },
    { dealAmount: '11000', dealYear: '2024', dealMonth: '08', landArea: '40.0', landType: '대지', umdNm: '역삼동', ldCodeNm: '강남구' },
    { dealAmount: '6800', dealYear: '2024', dealMonth: '07', landArea: '22.0', landType: '대지', umdNm: '역삼동', ldCodeNm: '강남구' },
  ];

  const LAND_INFO = [
    { label: '용도지역', value: detail.zoning },
    { label: '도로 접면', value: detail.roadWidth },
    { label: '토지 형상', value: detail.shape },
    { label: '지세', value: detail.slope },
    { label: '지목', value: detail.type },
    { label: '거래 연월', value: detail.date },
    { label: '건폐율', value: `${detail.buildingCoverage}%` },
    { label: '용적률', value: `${detail.floorAreaRatio}%` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        {/* 페이지 헤더 */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <button type="button" onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-green-700 transition-colors mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              뒤로가기
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`inline-block text-xs px-2 py-0.5 rounded border font-medium mb-2 ${TYPE_STYLE[detail.type] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {detail.type}
                </span>
                <h1 className="text-xl font-bold text-slate-900">{detail.address}</h1>
              </div>
              <span className="text-xs text-slate-400 shrink-0 mt-1">{detail.date}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* 핵심 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: '거래금액', value: formatPrice(detail.price), highlight: true },
              { label: '면적', value: formatArea(detail.area.replace('㎡', '')) },
              { label: '건폐율', value: `${detail.buildingCoverage}%` },
              { label: '용적률', value: `${detail.floorAreaRatio}%` },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg p-4 text-center border ${item.highlight ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                <div className={`font-bold text-sm ${item.highlight ? 'text-green-700 text-base' : 'text-slate-800'}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button"
              onClick={() => navigate('/loan', { state: { price: detail.price, type: detail.type, address: detail.address } })}
              className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium text-sm transition-colors">
              대출 한도 계산
            </button>
            <button type="button"
              onClick={() => navigate('/consultation', { state: { address: detail.address } })}
              className="bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-medium text-sm border border-slate-200 transition-colors">
              상담 신청
            </button>
          </div>

          {/* 탭 */}
          <div className="flex border-b border-slate-200 mb-6">
            {TABS.map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeTab === tab
                    ? 'border-green-700 text-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* 실거래가 탭 */}
          {activeTab === '실거래가' && (
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800">인근 실거래가</h2>
                {loading && <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">위치</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">지목</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">면적</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">거래금액</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">거래일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        {[...Array(5)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-3.5 bg-slate-100 rounded animate-pulse" /></td>)}
                      </tr>
                    )) : trades.map((trade, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-medium text-slate-700">{trade.ldCodeNm} {trade.umdNm}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TYPE_STYLE[trade.landType || '대지'] || 'bg-slate-100'}`}>{trade.landType || '대지'}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 text-xs">{parseFloat(trade.landArea || 0).toFixed(1)}㎡</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-700">
                          {(parseInt(String(trade.dealAmount).replace(/,/g, ''), 10) * 10000).toLocaleString()}원
                        </td>
                        <td className="px-5 py-3 text-right text-slate-400 text-xs">{trade.dealYear}-{String(trade.dealMonth).padStart(2, '0')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '가격트렌드' && (
            <PriceTrendChart address={detail.address} landType={detail.type} currentPrice={parseInt(detail.price, 10)} />
          )}

          {activeTab === '토지정보' && (
            <div className="space-y-4">
              <PblntfPricePanel address={detail.address} area={detail.area} currentPrice={detail.price} />
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-800">토지 상세 정보</h2>
                </div>
                <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {LAND_INFO.map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-slate-700">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === '경매정보' && (
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800">인근 경매물건</h2>
              </div>
              <div className="p-5 space-y-3">
                {SAMPLE_AUCTIONS.map((a, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-medium">{a.status}</span>
                        <p className="text-sm font-semibold text-slate-800 mt-1.5">{a.address}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.caseNo} · {a.court}</p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">{a.bidDate}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-50 rounded-md p-2.5 text-center">
                        <div className="text-slate-400 mb-0.5">감정가</div>
                        <div className="font-semibold text-slate-700">{Math.floor(a.appraisalPrice / 10000).toLocaleString()}만</div>
                      </div>
                      <div className="bg-amber-50 rounded-md p-2.5 text-center">
                        <div className="text-slate-400 mb-0.5">최저입찰가</div>
                        <div className="font-semibold text-amber-600">{Math.floor(a.minBid / 10000).toLocaleString()}만</div>
                      </div>
                      <div className="bg-green-50 rounded-md p-2.5 text-center">
                        <div className="text-slate-400 mb-0.5">낙찰률</div>
                        <div className="font-semibold text-green-600">{Math.round((a.minBid / a.appraisalPrice) * 100)}%</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => navigate('/auction')}
                      className="w-full mt-3 text-xs text-slate-600 border border-slate-200 rounded-md py-2 hover:bg-slate-50 transition-colors">
                      경매 전체 보기 →
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 px-5 pb-4">※ 대법원 경매정보 기반 샘플 데이터입니다.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandDetail;

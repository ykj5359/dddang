import { useState } from 'react';
import { listings } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

const TABS = [
  { id: 'search',   label: '매물 검색' },
  { id: 'register', label: '매물 등록' },
  { id: 'profile',  label: '귀농 프로필' },
];

const LAND_TYPES = ['전체', '전', '답', '임야'];
const DEAL_TYPES = ['전체', '매매', '임대'];

function ListingCard({ listing }) {
  const [contacted, setContacted] = useState(false);
  const isSale = listing.dealType === '매매';

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-1.5">
          <span className={`badge ${LAND_TYPE_COLORS[listing.type] || 'bg-slate-100 text-slate-600'}`}>
            {listing.type}
          </span>
          <span className={`badge ${isSale ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'}`}>
            {listing.dealType}
          </span>
        </div>
        <span className="text-xs text-slate-400">{listing.createdAt}</span>
      </div>

      <p className="text-sm font-bold text-slate-800 mb-0.5">{listing.address}</p>
      <p className="text-xs text-slate-400 mb-2">{formatArea(listing.area)}</p>
      <p className="text-xs text-slate-600 bg-slate-50 rounded-xl px-3 py-2 mb-3 leading-relaxed">{listing.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">{isSale ? '매매가' : '월 임대료'}</p>
          <p className={`text-base font-black ${isSale ? 'text-primary-700' : 'text-purple-700'}`}>
            {isSale ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
          </p>
        </div>
        <button
          onClick={() => setContacted(true)}
          disabled={contacted}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            contacted
              ? 'bg-slate-100 text-slate-400 cursor-default'
              : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
          }`}
        >
          {contacted ? '✓ 요청됨' : '연락 요청'}
        </button>
      </div>
    </div>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({ address: '', type: '전', area: '', dealType: '매매', price: '', description: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-5">
          <span className="text-4xl">✅</span>
        </div>
        <p className="font-bold text-slate-900 text-lg mb-2">매물이 등록되었습니다</p>
        <p className="text-sm text-slate-400 mb-6">조건에 맞는 귀농인에게 자동으로 알림이 전송됩니다</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline">추가 등록</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">주소 *</label>
        <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="예: 경기 여주시 강천면 간매리 123" className="input-field" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">지목</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
            {['전', '답', '대', '임야', '과수원'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">거래 유형</label>
          <select value={form.dealType} onChange={(e) => setForm({ ...form, dealType: e.target.value })} className="input-field">
            <option>매매</option>
            <option>임대</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">면적 (㎡) *</label>
          <input type="number" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="예: 3300" className="input-field" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            {form.dealType === '매매' ? '매매가 (원)' : '월 임대료 (원)'} *
          </label>
          <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="예: 85000000" className="input-field" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">상세 설명</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="도로 접면, 수리 상황, 주변 환경 등" rows={3} className="input-field resize-none" />
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">연락처 *</label>
        <input type="tel" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="010-0000-0000" className="input-field" />
      </div>
      <button type="submit" className="w-full btn-primary py-4 text-sm">매물 등록하기</button>
    </form>
  );
}

function ProfileForm() {
  const [form, setForm] = useState({ region: '', minArea: '', maxArea: '', budget: '', type: [], dealType: '매매', memo: '' });
  const [saved, setSaved] = useState(false);

  const toggleType = (t) =>
    setForm((prev) => ({ ...prev, type: prev.type.includes(t) ? prev.type.filter((x) => x !== t) : [...prev.type, t] }));

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mb-5">
          <span className="text-4xl">🌱</span>
        </div>
        <p className="font-bold text-slate-900 text-lg mb-2">프로필이 저장되었습니다</p>
        <p className="text-sm text-slate-400 mb-6">조건에 맞는 매물이 등록되면 알림을 드립니다</p>
        <button onClick={() => setSaved(false)} className="btn-outline">수정하기</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-3.5 text-sm text-primary-700 font-medium">
        희망 조건을 입력하면 조건에 맞는 매물 등록 시 자동으로 알림을 드립니다.
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">희망 지역</label>
        <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
          placeholder="예: 충남, 전북, 경기 이천" className="input-field" />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">희망 지목 (복수 선택)</label>
        <div className="flex gap-2 flex-wrap">
          {['전', '답', '임야', '과수원'].map((t) => (
            <button key={t} type="button" onClick={() => toggleType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                form.type.includes(t)
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">최소 면적 (㎡)</label>
          <input type="number" value={form.minArea} onChange={(e) => setForm({ ...form, minArea: e.target.value })}
            placeholder="예: 1000" className="input-field" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">최대 면적 (㎡)</label>
          <input type="number" value={form.maxArea} onChange={(e) => setForm({ ...form, maxArea: e.target.value })}
            placeholder="예: 10000" className="input-field" />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">예산 (원)</label>
        <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
          placeholder="예: 100000000" className="input-field" />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">거래 유형</label>
        <div className="flex gap-2">
          {['매매', '임대', '모두'].map((d) => (
            <button key={d} type="button" onClick={() => setForm({ ...form, dealType: d })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                form.dealType === d
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">기타 희망사항</label>
        <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="예: 도로 접면 필요, 유기농 가능한 땅, 귀촌 주거 병행 등" rows={3}
          className="input-field resize-none" />
      </div>

      <button onClick={() => setSaved(true)} className="w-full btn-primary py-4 text-sm">프로필 저장</button>
    </div>
  );
}

export default function FarmingMatchPage() {
  const [activeTab, setActiveTab] = useState('search');
  const [filterType, setFilterType] = useState('전체');
  const [filterDeal, setFilterDeal] = useState('전체');
  const [filterRegion, setFilterRegion] = useState('');

  const filtered = listings.filter((l) => {
    if (filterType !== '전체' && l.type !== filterType) return false;
    if (filterDeal !== '전체' && l.dealType !== filterDeal) return false;
    if (filterRegion && !l.address.includes(filterRegion)) return false;
    return true;
  });

  return (
    <div>
      {/* ── Page header ── */}
      <div
        className="px-4 py-6"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)' }}
      >
        <p className="text-primary-300 text-xs font-semibold uppercase tracking-widest mb-1">농지 매칭 플랫폼</p>
        <h2 className="text-white text-xl font-black">귀농 매칭</h2>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white sticky top-[60px] z-30 border-b border-slate-200 px-4 py-2.5">
        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab-item-active' : 'tab-item'}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === 'search' && (
          <div>
            {/* Filters */}
            <div className="card mb-4 space-y-3">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">지목</p>
                <div className="flex gap-2 flex-wrap">
                  {LAND_TYPES.map((t) => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                        filterType === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">거래 유형</p>
                <div className="flex gap-2">
                  {DEAL_TYPES.map((d) => (
                    <button key={d} onClick={() => setFilterDeal(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                        filterDeal === d ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">지역 검색</p>
                <input type="text" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}
                  placeholder="예: 충남, 여주, 평창" className="input-field" />
              </div>
            </div>

            <p className="text-sm text-slate-500 mb-3 font-medium">
              총 <span className="font-black text-slate-900">{filtered.length}</span>건의 매물
            </p>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <p className="text-sm font-semibold">조건에 맞는 매물이 없습니다</p>
                </div>
              ) : (
                filtered.map((listing) => <ListingCard key={listing.id} listing={listing} />)
              )}
            </div>
          </div>
        )}

        {activeTab === 'register' && <RegisterForm />}
        {activeTab === 'profile' && <ProfileForm />}
      </div>
    </div>
  );
}

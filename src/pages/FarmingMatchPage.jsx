import { useState } from 'react';
import { listings } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

const TABS = [
  { id: 'search', label: '매물 검색' },
  { id: 'register', label: '매물 등록' },
  { id: 'profile', label: '귀농 프로필' },
];

const LAND_TYPES = ['전체', '전', '답', '임야'];
const DEAL_TYPES = ['전체', '매매', '임대'];

function ListingCard({ listing }) {
  const [contacted, setContacted] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`}>
            {listing.type}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            listing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {listing.dealType}
          </span>
        </div>
        <span className="text-xs text-gray-400">{listing.createdAt}</span>
      </div>
      <p className="text-sm font-semibold text-gray-900 mb-1">{listing.address}</p>
      <p className="text-xs text-gray-500 mb-2">{formatArea(listing.area)}</p>
      <p className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3">{listing.description}</p>
      <div className="flex items-center justify-between">
        <p className={`text-base font-bold ${listing.dealType === '매매' ? 'text-primary-700' : 'text-purple-700'}`}>
          {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
        </p>
        <button
          onClick={() => setContacted(true)}
          disabled={contacted}
          className={`text-sm px-4 py-2 rounded-xl font-medium transition-colors ${
            contacted ? 'bg-gray-100 text-gray-500 cursor-default' : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {contacted ? '연락 요청됨 ✓' : '연락 요청'}
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
        <span className="text-5xl mb-4 block">✅</span>
        <p className="font-bold text-gray-900 mb-2">매물이 등록되었습니다</p>
        <p className="text-sm text-gray-500 mb-6">조건에 맞는 귀농인에게 자동으로 알림이 전송됩니다</p>
        <button onClick={() => setSubmitted(false)} className="border border-primary-600 text-primary-600 px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors">
          추가 등록
        </button>
      </div>
    );
  }

  const field = (label, required, children) => (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}{required && ' *'}</label>
      {children}
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      {field('주소', true,
        <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="예: 경기 여주시 강천면 간매리 123"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300" />
      )}
      <div className="grid grid-cols-2 gap-3">
        {field('지목', false,
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-primary-400 bg-white">
            {['전', '답', '대', '임야', '과수원'].map((t) => <option key={t}>{t}</option>)}
          </select>
        )}
        {field('거래 유형', false,
          <select value={form.dealType} onChange={(e) => setForm({ ...form, dealType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-primary-400 bg-white">
            <option>매매</option>
            <option>임대</option>
          </select>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {field('면적 (㎡)', true,
          <input type="number" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="예: 3300"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300" />
        )}
        {field(form.dealType === '매매' ? '매매가 (원)' : '월 임대료 (원)', true,
          <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="예: 85000000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300" />
        )}
      </div>
      {field('상세 설명', false,
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="도로 접면, 수리 상황, 주변 환경 등" rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300 resize-none" />
      )}
      {field('연락처', true,
        <input type="tel" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="010-0000-0000"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300" />
      )}
      <button type="submit" className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
        매물 등록하기
      </button>
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
        <span className="text-5xl mb-4 block">🌱</span>
        <p className="font-bold text-gray-900 mb-2">프로필이 저장되었습니다</p>
        <p className="text-sm text-gray-500 mb-6">조건에 맞는 매물이 등록되면 알림을 드립니다</p>
        <button onClick={() => setSaved(false)} className="border border-primary-600 text-primary-600 px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors">
          수정하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 text-sm text-primary-700">
        희망 조건을 입력하면 조건에 맞는 매물 등록 시 자동으로 알림을 드립니다.
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">희망 지역</label>
        <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
          placeholder="예: 충남, 전북, 경기 이천"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">희망 지목 (복수 선택)</label>
        <div className="flex gap-2 flex-wrap">
          {['전', '답', '임야', '과수원'].map((t) => (
            <button key={t} type="button" onClick={() => toggleType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                form.type.includes(t) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">최소 면적 (㎡)</label>
          <input type="number" value={form.minArea} onChange={(e) => setForm({ ...form, minArea: e.target.value })}
            placeholder="예: 1000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">최대 면적 (㎡)</label>
          <input type="number" value={form.maxArea} onChange={(e) => setForm({ ...form, maxArea: e.target.value })}
            placeholder="예: 10000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">예산 (원)</label>
        <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
          placeholder="예: 100000000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">거래 유형</label>
        <div className="flex gap-2">
          {['매매', '임대', '모두'].map((d) => (
            <button key={d} type="button" onClick={() => setForm({ ...form, dealType: d })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                form.dealType === d ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200'
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">기타 희망사항</label>
        <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="예: 도로 접면 필요, 유기농 가능한 땅, 귀촌 주거 병행 등" rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 resize-none" />
      </div>
      <button onClick={() => setSaved(true)} className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
        프로필 저장
      </button>
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
    <div className="pb-4">
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="flex">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        {activeTab === 'search' && (
          <div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">지목</p>
                <div className="flex gap-2 flex-wrap">
                  {LAND_TYPES.map((t) => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        filterType === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200'
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">거래 유형</p>
                <div className="flex gap-2">
                  {DEAL_TYPES.map((d) => (
                    <button key={d} onClick={() => setFilterDeal(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        filterDeal === d ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200'
                      }`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">지역 검색</p>
                <input type="text" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}
                  placeholder="예: 충남, 여주, 평창"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-400" />
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              총 <span className="font-bold text-gray-900">{filtered.length}</span>건의 매물
            </p>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl block mb-3">🔍</span>
                  <p className="text-sm">조건에 맞는 매물이 없습니다</p>
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

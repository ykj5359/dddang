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
    <div style={{ background: 'white', borderRadius: 12, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`}>{listing.type}</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 600, background: listing.dealType === '매매' ? '#dbeafe' : '#ede9fe', color: listing.dealType === '매매' ? '#1d4ed8' : '#7c3aed' }}>{listing.dealType}</span>
        </div>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>{listing.createdAt}</span>
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{listing.address}</p>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>{formatArea(listing.area)}</p>
      <p style={{ fontSize: 13, color: '#4b5563', background: '#f9fafb', borderRadius: 8, padding: '8px 12px', marginBottom: 14 }}>{listing.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: listing.dealType === '매매' ? '#15803d' : '#7c3aed' }}>
          {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
        </p>
        <button
          onClick={() => setContacted(true)}
          disabled={contacted}
          style={{ fontSize: 13, padding: '8px 18px', borderRadius: 10, fontWeight: 600, border: 'none', cursor: contacted ? 'default' : 'pointer', background: contacted ? '#f3f4f6' : '#16a34a', color: contacted ? '#6b7280' : 'white' }}
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
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>✅</span>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>매물이 등록되었습니다</p>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>조건에 맞는 귀농인에게 자동으로 알림이 전송됩니다</p>
        <button onClick={() => setSubmitted(false)} style={{ border: '1px solid #16a34a', color: '#16a34a', padding: '10px 24px', borderRadius: 12, fontWeight: 600, background: 'white', cursor: 'pointer' }}>추가 등록</button>
      </div>
    );
  }

  const inputStyle = { width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: 'white' };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 };

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={labelStyle}>주소 *</label>
        <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="예: 경기 여주시 강천면 간매리 123" style={inputStyle} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>지목</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle}>
            {['전', '답', '대', '임야', '과수원'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>거래 유형</label>
          <select value={form.dealType} onChange={(e) => setForm({ ...form, dealType: e.target.value })} style={inputStyle}>
            <option>매매</option><option>임대</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>면적 (㎡) *</label>
          <input type="number" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="예: 3300" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{form.dealType === '매매' ? '매매가 (원)' : '월 임대료 (원)'} *</label>
          <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="예: 85000000" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>상세 설명</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="도로 접면, 수리 상황, 주변 환경 등" rows={3} style={{ ...inputStyle, resize: 'none' }} />
      </div>
      <div>
        <label style={labelStyle}>연락처 *</label>
        <input type="tel" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="010-0000-0000" style={inputStyle} />
      </div>
      <button type="submit" style={{ background: '#16a34a', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>
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
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>🌱</span>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>프로필이 저장되었습니다</p>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>조건에 맞는 매물이 등록되면 알림을 드립니다</p>
        <button onClick={() => setSaved(false)} style={{ border: '1px solid #16a34a', color: '#16a34a', padding: '10px 24px', borderRadius: 12, fontWeight: 600, background: 'white', cursor: 'pointer' }}>수정하기</button>
      </div>
    );
  }

  const inputStyle = { width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: 'white' };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#15803d' }}>
        희망 조건을 입력하면 조건에 맞는 매물 등록 시 자동으로 알림을 드립니다.
      </div>
      <div>
        <label style={labelStyle}>희망 지역</label>
        <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
          placeholder="예: 충남, 전북, 경기 이천" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>희망 지목 (복수 선택)</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['전', '답', '임야', '과수원'].map((t) => (
            <button key={t} type="button" onClick={() => toggleType(t)}
              style={{ padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: '1px solid', cursor: 'pointer', background: form.type.includes(t) ? '#16a34a' : 'white', color: form.type.includes(t) ? 'white' : '#4b5563', borderColor: form.type.includes(t) ? '#16a34a' : '#e5e7eb' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>최소 면적 (㎡)</label>
          <input type="number" value={form.minArea} onChange={(e) => setForm({ ...form, minArea: e.target.value })} placeholder="예: 1000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>최대 면적 (㎡)</label>
          <input type="number" value={form.maxArea} onChange={(e) => setForm({ ...form, maxArea: e.target.value })} placeholder="예: 10000" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>예산 (원)</label>
        <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="예: 100000000" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>거래 유형</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['매매', '임대', '모두'].map((d) => (
            <button key={d} type="button" onClick={() => setForm({ ...form, dealType: d })}
              style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: '1px solid', cursor: 'pointer', background: form.dealType === d ? '#16a34a' : 'white', color: form.dealType === d ? 'white' : '#4b5563', borderColor: form.dealType === d ? '#16a34a' : '#e5e7eb' }}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={labelStyle}>기타 희망사항</label>
        <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="예: 도로 접면 필요, 유기농 가능한 땅, 귀촌 주거 병행 등" rows={3}
          style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: 'white', resize: 'none' }} />
      </div>
      <button onClick={() => setSaved(true)} style={{ background: '#16a34a', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>
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
    <div>
      {/* 탭 바 */}
      <div className="pc-tabs">
        <div className="pc-tabs-inner">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === tab.id ? '2px solid #16a34a' : '2px solid transparent', color: activeTab === tab.id ? '#16a34a' : '#6b7280' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pc-container" style={{ paddingTop: 24 }}>
        {activeTab === 'search' && (
          <div className="pc-grid-2">
            {/* 왼쪽: 필터 패널 (고정) */}
            <div style={{ gridColumn: '2 / 3', gridRow: '1' }}>
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20, position: 'sticky', top: 72 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>🔍 필터</p>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>지목</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {LAND_TYPES.map((t) => (
                      <button key={t} onClick={() => setFilterType(t)}
                        style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid', cursor: 'pointer', background: filterType === t ? '#16a34a' : 'white', color: filterType === t ? 'white' : '#4b5563', borderColor: filterType === t ? '#16a34a' : '#e5e7eb' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>거래 유형</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {DEAL_TYPES.map((d) => (
                      <button key={d} onClick={() => setFilterDeal(d)}
                        style={{ flex: 1, padding: '8px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid', cursor: 'pointer', background: filterDeal === d ? '#16a34a' : 'white', color: filterDeal === d ? 'white' : '#4b5563', borderColor: filterDeal === d ? '#16a34a' : '#e5e7eb' }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>지역 검색</p>
                  <input type="text" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}
                    placeholder="예: 충남, 여주, 평창"
                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none' }} />
                </div>
                <div style={{ marginTop: 16, padding: '12px', background: '#f0fdf4', borderRadius: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#15803d' }}>{filtered.length}</span>
                  <span style={{ fontSize: 13, color: '#16a34a', marginLeft: 4 }}>건의 매물</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 매물 목록 */}
            <div style={{ gridColumn: '1 / 2', gridRow: '1', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: '#6b7280' }}>
                총 <strong style={{ color: '#111827' }}>{filtered.length}</strong>건의 매물
              </p>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🔍</span>
                  <p>조건에 맞는 매물이 없습니다</p>
                </div>
              ) : (
                filtered.map((listing) => <ListingCard key={listing.id} listing={listing} />)
              )}
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#111827' }}>매물 등록</h3>
            <RegisterForm />
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#111827' }}>귀농 프로필</h3>
            <ProfileForm />
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { farmingGuide, returnFarmingInfo } from '../data/dummyData';

const TABS = [
  { id: 'consult', label: '상담 신청' },
  { id: 'guide', label: '농지법 가이드' },
  { id: 'info', label: '귀농 정보' },
];

const TRUST_BADGES = [
  { icon: '⚡', label: '빠른 응답', desc: '1~2일 이내' },
  { icon: '🔒', label: '100% 무료', desc: '초기 상담' },
  { icon: '👨‍💼', label: '전문가 상담', desc: '농지 전문' },
];

const HELP_LIST = [
  '농지 처분 의무 통보를 받으셨나요?',
  '타지 거주자인데 농지를 보유 중이신가요?',
  '귀농하려는데 적합한 농지를 찾고 계신가요?',
  '농지신탁 절차가 궁금하신가요?',
  '농지 매각 또는 임대를 원하시나요?',
];

const CHECKLIST = [
  '귀농 교육 이수 (농업경영교육)',
  '농업경영계획서 작성',
  '농지취득자격증명 신청',
  '귀농 지원 사업 신청',
  '주거지 및 농지 확보',
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid #f3f4f6', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'white', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{item.title}</span>
        <span style={{ color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: '12px 18px', background: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7 }}>{item.content}</p>
        </div>
      )}
    </div>
  );
}

function ConsultForm() {
  const [form, setForm] = useState({ name: '', phone: '', issue: '처분의무', memo: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>📞</span>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>상담 신청이 완료되었습니다</p>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>영업일 기준 1~2일 내 연락드립니다</p>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#16a34a', marginBottom: 24 }}>{form.phone}</p>
        <button onClick={() => setSubmitted(false)} style={{ border: '1px solid #d1d5db', color: '#4b5563', padding: '10px 24px', borderRadius: 10, background: 'white', cursor: 'pointer', fontWeight: 600 }}>
          다시 신청
        </button>
      </div>
    );
  }

  const inputStyle = { width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: 'white' };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 };

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div><label style={labelStyle}>성함 *</label>
        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="홍길동" style={inputStyle} /></div>
      <div><label style={labelStyle}>연락처 *</label>
        <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" style={inputStyle} /></div>
      <div><label style={labelStyle}>상담 유형</label>
        <select value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} style={inputStyle}>
          <option value="처분의무">농지 처분 의무 해소</option>
          <option value="신탁">농지신탁 문의</option>
          <option value="임대">농지 임대 방법</option>
          <option value="귀농">귀농 준비 상담</option>
          <option value="매매">농지 매매 상담</option>
          <option value="기타">기타</option>
        </select></div>
      <div><label style={labelStyle}>문의 내용</label>
        <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="보유 토지 위치, 면적, 문의 사항 등을 적어주세요" rows={5}
          style={{ ...inputStyle, resize: 'none' }} /></div>
      <button type="submit" style={{ background: '#16a34a', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>
        무료 상담 신청하기
      </button>
      <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>개인정보는 상담 목적으로만 활용되며 제3자에게 제공되지 않습니다</p>
    </form>
  );
}

export default function ConsultPage() {
  const [activeTab, setActiveTab] = useState('consult');

  return (
    <div>
      {/* 배너 */}
      <div style={{ background: 'linear-gradient(135deg, #9e631a 0%, #7c4d18 100%)', padding: '36px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ color: '#f5d5a8', fontSize: 14, marginBottom: 6 }}>전문가 무료 상담</p>
          <h2 style={{ color: 'white', fontSize: 26, fontWeight: 700, marginBottom: 6 }}>농지 고민, 지금 해결하세요</h2>
          <p style={{ color: '#f5d5a8', fontSize: 14 }}>농지처분 의무 · 신탁 · 귀농 전문 컨설팅</p>
        </div>
      </div>

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

      <div className="pc-container" style={{ paddingTop: 28 }}>
        {activeTab === 'consult' && (
          <div className="pc-grid-2">
            {/* 왼쪽: 폼 */}
            <div>
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#111827' }}>상담 신청서</h3>
                <ConsultForm />
              </div>
            </div>

            {/* 오른쪽: 정보 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* 뱃지 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {TRUST_BADGES.map((item) => (
                  <div key={item.label} style={{ background: 'white', borderRadius: 12, border: '1px solid #f3f4f6', padding: '20px 12px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{item.icon}</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: '#6b7280' }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* 도움 대상 */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#14532d', marginBottom: 14 }}>이런 분들께 도움드립니다</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {HELP_LIST.map((text) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: 14, color: '#15803d', lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 프로세스 */}
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#111827' }}>상담 프로세스</p>
                {['신청서 작성', '담당자 배정', '1:1 전화 상담', '맞춤 솔루션 제안'].map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 3 ? 12 : 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#16a34a', flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 14, color: '#374151' }}>{step}</span>
                    {i < 3 && <div style={{ flex: 1, height: 0, borderTop: '1px dashed #d1d5db' }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="pc-grid-2">
            <div>
              <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>농지 취득·보유·처분에 관한 핵심 정보</p>
              {farmingGuide.map((item) => <AccordionItem key={item.id} item={item} />)}
              <div style={{ marginTop: 16, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 18 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#b91c1c', marginBottom: 6 }}>⚠️ 주의사항</p>
                <p style={{ fontSize: 13, color: '#b91c1c', lineHeight: 1.6 }}>
                  본 가이드는 일반적인 참고 정보이며 법적 효력이 없습니다. 구체적인 상담은 전문가에게 문의하세요.
                </p>
              </div>
            </div>
            <div>
              <div style={{ background: '#f0fdf4', borderRadius: 14, border: '1px solid #bbf7d0', padding: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#14532d', marginBottom: 12 }}>무료 상담이 필요하신가요?</p>
                <p style={{ fontSize: 14, color: '#15803d', lineHeight: 1.6, marginBottom: 16 }}>농지법 해석이 어려우시다면 전문가에게 바로 상담받으세요.</p>
                <button style={{ width: '100%', background: '#16a34a', color: 'white', padding: '12px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  onClick={() => {}}>상담 신청하기</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="pc-grid-2">
            <div>
              <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>귀농·귀촌 준비에 필요한 정보</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {returnFarmingInfo.map((item) => (
                  <div key={item.title} style={{ background: 'white', borderRadius: 12, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{item.title}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${item.badgeColor}`}>{item.badge}</span>
                        </div>
                        <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                      <span style={{ color: '#d1d5db', fontSize: 16, flexShrink: 0 }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#14532d', marginBottom: 16 }}>🌱 귀농 준비 체크리스트</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {CHECKLIST.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: 14, color: '#15803d' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

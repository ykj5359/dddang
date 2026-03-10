import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const INITIAL_CONSULTS = [
  { id: 1, name: '김민준', phone: '010-1234-5678', type: '농지 매입', region: '경기도 용인시', content: '농지 매입을 위한 투자 방법과 절차에 대해 상담을 원합니다.', date: '2026-03-10', status: '대기' },
  { id: 2, name: '이서연', phone: '010-2345-6789', type: '농지 대출', region: '충청남도 천안시', content: '농지 담보 대출 가능 금액과 금리에 대해 문의드립니다.', date: '2026-03-09', status: '처리중' },
  { id: 3, name: '박지호', phone: '010-3456-7890', type: '농지 임대', region: '전라북도 완주군', content: '유휴 농지를 임대하고 싶은데 절차가 어떻게 되는지 알고 싶습니다.', date: '2026-03-09', status: '완료' },
  { id: 4, name: '정우진', phone: '010-5678-9012', type: '경매 참여', region: '강원도 홍천군', content: '임야 경매에 처음 참여하려고 하는데 주의사항을 알고 싶습니다.', date: '2026-03-08', status: '대기' },
  { id: 5, name: '한지민', phone: '010-6789-0123', type: '농지 매입', region: '경상북도 안동시', content: '귀농을 계획 중인데 농지 선정 기준과 매입 방법에 대해 안내 부탁드립니다.', date: '2026-03-07', status: '처리중' },
  { id: 6, name: '강태양', phone: '010-7890-1234', type: '직거래', region: '제주도 서귀포시', content: '제주 토지를 직거래로 처분하고 싶습니다. 절차와 비용이 궁금합니다.', date: '2026-03-06', status: '완료' },
  { id: 7, name: '윤하늘', phone: '010-8901-2345', type: '농지 대출', region: '전라남도 나주시', content: '농지 취득 후 농업경영체 등록 시 대출 혜택이 있는지 문의합니다.', date: '2026-03-05', status: '대기' },
];

const STATUS_COLORS = {
  '대기': 'bg-amber-100 text-amber-700',
  '처리중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-green-100 text-green-700',
};

function AdminConsultations() {
  const [consults, setConsults] = useState(INITIAL_CONSULTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterType, setFilterType] = useState('전체');
  const [selected, setSelected] = useState(null);
  const [memo, setMemo] = useState('');

  const filtered = consults.filter((c) => {
    const matchSearch = c.name.includes(search) || c.region.includes(search);
    const matchStatus = filterStatus === '전체' || c.status === filterStatus;
    const matchType = filterType === '전체' || c.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const updateStatus = (id, status) => {
    setConsults((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  };

  const deleteConsult = (id) => {
    setConsults((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
  };

  const openDetail = (c) => {
    setSelected(c);
    setMemo('');
  };

  const counts = {
    대기: consults.filter((c) => c.status === '대기').length,
    처리중: consults.filter((c) => c.status === '처리중').length,
    완료: consults.filter((c) => c.status === '완료').length,
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">상담 관리</h1>
          <p className="text-sm text-slate-400 mt-0.5">총 {consults.length}건</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: '대기', count: counts.대기, color: 'border-amber-200 bg-amber-50', textColor: 'text-amber-700' },
            { label: '처리중', count: counts.처리중, color: 'border-blue-200 bg-blue-50', textColor: 'text-blue-700' },
            { label: '완료', count: counts.완료, color: 'border-green-200 bg-green-50', textColor: 'text-green-700' },
          ].map((s) => (
            <button key={s.label} type="button"
              onClick={() => setFilterStatus(filterStatus === s.label ? '전체' : s.label)}
              className={`rounded-xl border p-4 text-left transition-all shadow-sm ${s.color} ${filterStatus === s.label ? 'ring-2 ring-offset-1 ring-current' : ''}`}>
              <p className={`text-2xl font-bold ${s.textColor}`}>{s.count}</p>
              <p className={`text-xs font-medium ${s.textColor} mt-0.5`}>{s.label}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-3">
            <input type="text" placeholder="이름 또는 지역 검색"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400 w-48" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400">
              <option>전체</option>
              <option>농지 매입</option>
              <option>농지 대출</option>
              <option>농지 임대</option>
              <option>경매 참여</option>
              <option>직거래</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">신청자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">상담 유형</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">관심 지역</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">내용</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">신청일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{c.type}</td>
                    <td className="px-4 py-3 text-slate-500">{c.region}</td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-slate-500 truncate">{c.content}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{c.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => openDetail(c)}
                          className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">상세</button>
                        {c.status === '대기' && (
                          <button type="button" onClick={() => updateStatus(c.id, '처리중')}
                            className="text-xs px-2 py-1 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">처리</button>
                        )}
                        {c.status === '처리중' && (
                          <button type="button" onClick={() => updateStatus(c.id, '완료')}
                            className="text-xs px-2 py-1 rounded border border-green-200 text-green-600 hover:bg-green-50 transition-colors">완료</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-lg w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">상담 상세</h3>
                <button type="button" onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-0 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden mb-4">
                {[
                  { label: '신청자', value: selected.name },
                  { label: '연락처', value: selected.phone },
                  { label: '유형', value: selected.type },
                  { label: '지역', value: selected.region },
                  { label: '신청일', value: selected.date },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-slate-400 w-16 shrink-0">{item.label}</span>
                    <span className="text-sm font-medium text-slate-700 text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-1.5">상담 내용</p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 leading-relaxed border border-slate-200">
                  {selected.content}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-1.5">처리 메모</p>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="처리 내용이나 메모를 입력하세요..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400 resize-none"
                />
              </div>

              <div className="flex gap-2">
                {selected.status !== '처리중' && selected.status !== '완료' && (
                  <button type="button" onClick={() => { updateStatus(selected.id, '처리중'); setSelected({ ...selected, status: '처리중' }); }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">처리 시작</button>
                )}
                {selected.status === '처리중' && (
                  <button type="button" onClick={() => { updateStatus(selected.id, '완료'); setSelected({ ...selected, status: '완료' }); }}
                    className="flex-1 bg-green-700 text-white py-2 rounded-lg text-sm hover:bg-green-800">완료 처리</button>
                )}
                <button type="button" onClick={() => deleteConsult(selected.id)}
                  className="flex-1 border border-red-200 text-red-600 py-2 rounded-lg text-sm hover:bg-red-50">삭제</button>
                <button type="button" onClick={() => setSelected(null)}
                  className="flex-1 border border-slate-200 text-slate-500 py-2 rounded-lg text-sm hover:bg-slate-50">닫기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminConsultations;

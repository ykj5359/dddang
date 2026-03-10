import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const INITIAL_LANDS = [
  { id: 1, address: '경기도 용인시 처인구 포곡읍', type: '임야', area: '661㎡', price: '8,500만원', owner: '김민준', regDate: '2026-03-10', status: '승인대기' },
  { id: 2, address: '충청남도 천안시 동남구 광덕면', type: '전', area: '1,320㎡', price: '4,200만원', owner: '이서연', regDate: '2026-03-09', status: '승인완료' },
  { id: 3, address: '전라북도 완주군 삼례읍 삼례리', type: '답', area: '990㎡', price: '3,800만원', owner: '박지호', regDate: '2026-03-08', status: '승인완료' },
  { id: 4, address: '강원도 홍천군 화촌면 구성포리', type: '임야', area: '3,300㎡', price: '1,100만원', owner: '정우진', regDate: '2026-03-08', status: '승인대기' },
  { id: 5, address: '경상북도 안동시 풍산읍 소산리', type: '전', area: '825㎡', price: '6,200만원', owner: '한지민', regDate: '2026-03-07', status: '승인완료' },
  { id: 6, address: '제주도 서귀포시 표선면 성읍리', type: '대지', area: '231㎡', price: '22,000만원', owner: '강태양', regDate: '2026-03-07', status: '반려' },
  { id: 7, address: '전라남도 나주시 다시면 신평리', type: '답', area: '1,650㎡', price: '2,900만원', owner: '윤하늘', regDate: '2026-03-06', status: '승인대기' },
  { id: 8, address: '충청북도 청주시 상당구 문의면', type: '임야', area: '4,950㎡', price: '1,800만원', owner: '신예린', regDate: '2026-03-05', status: '승인완료' },
];

const STATUS_COLORS = {
  '승인대기': 'bg-amber-100 text-amber-700',
  '승인완료': 'bg-green-100 text-green-700',
  '반려': 'bg-red-100 text-red-600',
};

function AdminLands() {
  const [lands, setLands] = useState(INITIAL_LANDS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterType, setFilterType] = useState('전체');
  const [selected, setSelected] = useState([]);
  const [detailId, setDetailId] = useState(null);

  const filtered = lands.filter((l) => {
    const matchSearch = l.address.includes(search) || l.owner.includes(search);
    const matchStatus = filterStatus === '전체' || l.status === filterStatus;
    const matchType = filterType === '전체' || l.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const toggleSelect = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  const toggleAll = () => selected.length === filtered.length ? setSelected([]) : setSelected(filtered.map((l) => l.id));

  const approve = (id) => setLands((prev) => prev.map((l) => l.id === id ? { ...l, status: '승인완료' } : l));
  const reject = (id) => setLands((prev) => prev.map((l) => l.id === id ? { ...l, status: '반려' } : l));
  const deleteLand = (id) => { setLands((prev) => prev.filter((l) => l.id !== id)); setDetailId(null); };
  const deleteSelected = () => { setLands((prev) => prev.filter((l) => !selected.includes(l.id))); setSelected([]); };

  const detail = lands.find((l) => l.id === detailId);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">매물 관리</h1>
          <p className="text-sm text-slate-400 mt-0.5">총 {lands.length}건 · 표시 {filtered.length}건</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-3">
            <input type="text" placeholder="주소 또는 등록자 검색"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400 w-56" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400">
              <option>전체</option>
              <option>승인대기</option>
              <option>승인완료</option>
              <option>반려</option>
            </select>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400">
              <option>전체</option>
              <option>전</option>
              <option>답</option>
              <option>임야</option>
              <option>대지</option>
            </select>
            {selected.length > 0 && (
              <button type="button" onClick={deleteSelected}
                className="ml-auto px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                선택 삭제 ({selected.length})
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox"
                      checked={selected.length === filtered.length && filtered.length > 0}
                      onChange={toggleAll} className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">주소</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">지목</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">면적</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">가격</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">등록자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">등록일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggleSelect(l.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setDetailId(l.id)}
                        className="font-medium text-slate-800 hover:text-green-700 text-left transition-colors">
                        {l.address}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{l.type}</td>
                    <td className="px-4 py-3 text-slate-500">{l.area}</td>
                    <td className="px-4 py-3 font-medium text-green-700">{l.price}</td>
                    <td className="px-4 py-3 text-slate-500">{l.owner}</td>
                    <td className="px-4 py-3 text-slate-500">{l.regDate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {l.status === '승인대기' && (
                          <>
                            <button type="button" onClick={() => approve(l.id)}
                              className="text-xs px-2 py-1 rounded border border-green-200 text-green-600 hover:bg-green-50 transition-colors">승인</button>
                            <button type="button" onClick={() => reject(l.id)}
                              className="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors">반려</button>
                          </>
                        )}
                        {l.status !== '승인대기' && (
                          <button type="button" onClick={() => setLands((prev) => prev.map((x) => x.id === l.id ? { ...x, status: '승인대기' } : x))}
                            className="text-xs px-2 py-1 rounded border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors">재검토</button>
                        )}
                        <button type="button" onClick={() => deleteLand(l.id)}
                          className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 transition-colors">삭제</button>
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
        {detail && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">매물 상세</h3>
                <button type="button" onClick={() => setDetailId(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-0 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden mb-4">
                {[
                  { label: '주소', value: detail.address },
                  { label: '지목', value: detail.type },
                  { label: '면적', value: detail.area },
                  { label: '가격', value: detail.price },
                  { label: '등록자', value: detail.owner },
                  { label: '등록일', value: detail.regDate },
                  { label: '상태', value: detail.status },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-slate-400 w-16 shrink-0">{item.label}</span>
                    <span className="text-sm font-medium text-slate-700 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {detail.status === '승인대기' && (
                  <>
                    <button type="button" onClick={() => { approve(detail.id); setDetailId(null); }}
                      className="flex-1 bg-green-700 text-white py-2 rounded-lg text-sm hover:bg-green-800">승인</button>
                    <button type="button" onClick={() => { reject(detail.id); setDetailId(null); }}
                      className="flex-1 border border-red-200 text-red-600 py-2 rounded-lg text-sm hover:bg-red-50">반려</button>
                  </>
                )}
                <button type="button" onClick={() => deleteLand(detail.id)}
                  className="flex-1 border border-slate-200 text-slate-500 py-2 rounded-lg text-sm hover:bg-slate-50">삭제</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminLands;

import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const GRADE_COLORS = {
  '브론즈': 'bg-orange-100 text-orange-700',
  '실버': 'bg-slate-100 text-slate-600',
  '골드': 'bg-yellow-100 text-yellow-700',
};

const INITIAL_USERS = [
  { id: 1, name: '김민준', email: 'minjun@email.com', phone: '010-1234-5678', grade: '브론즈', joinDate: '2026-03-10', status: '활성' },
  { id: 2, name: '이서연', email: 'seoyeon@email.com', phone: '010-2345-6789', grade: '골드', joinDate: '2026-03-09', status: '활성' },
  { id: 3, name: '박지호', email: 'jiho@email.com', phone: '010-3456-7890', grade: '브론즈', joinDate: '2026-03-09', status: '활성' },
  { id: 4, name: '최수아', email: 'sua@email.com', phone: '010-4567-8901', grade: '실버', joinDate: '2026-03-08', status: '정지' },
  { id: 5, name: '정우진', email: 'woojin@email.com', phone: '010-5678-9012', grade: '브론즈', joinDate: '2026-03-07', status: '활성' },
  { id: 6, name: '한지민', email: 'jimin@email.com', phone: '010-6789-0123', grade: '골드', joinDate: '2026-03-06', status: '활성' },
  { id: 7, name: '강태양', email: 'taeyang@email.com', phone: '010-7890-1234', grade: '실버', joinDate: '2026-03-05', status: '활성' },
  { id: 8, name: '윤하늘', email: 'haneul@email.com', phone: '010-8901-2345', grade: '브론즈', joinDate: '2026-03-04', status: '활성' },
  { id: 9, name: '오지훈', email: 'jihun@email.com', phone: '010-9012-3456', grade: '브론즈', joinDate: '2026-03-03', status: '정지' },
  { id: 10, name: '신예린', email: 'yerin@email.com', phone: '010-0123-4567', grade: '골드', joinDate: '2026-03-02', status: '활성' },
];

function AdminUsers() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [selected, setSelected] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.includes(search) || u.email.includes(search);
    const matchStatus = filterStatus === '전체' || u.status === filterStatus;
    const matchGrade = filterGrade === '전체' || u.grade === filterGrade;
    return matchSearch && matchStatus && matchGrade;
  });

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((u) => u.id));
  };

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === '활성' ? '정지' : '활성' } : u));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDelete(null);
  };

  const deleteSelected = () => {
    setUsers((prev) => prev.filter((u) => !selected.includes(u.id)));
    setSelected([]);
  };

  const upgradeGrade = (id) => {
    const order = ['브론즈', '실버', '골드'];
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      const idx = order.indexOf(u.grade);
      return { ...u, grade: order[Math.min(idx + 1, 2)] };
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">회원 관리</h1>
          <p className="text-sm text-slate-400 mt-0.5">총 {users.length}명 · 표시 {filtered.length}명</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="이름 또는 이메일 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400 w-56"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
            >
              <option>전체</option>
              <option>활성</option>
              <option>정지</option>
            </select>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
            >
              <option>전체</option>
              <option>브론즈</option>
              <option>실버</option>
              <option>골드</option>
            </select>
            {selected.length > 0 && (
              <button type="button" onClick={deleteSelected}
                className="ml-auto px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
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
                      onChange={toggleAll}
                      className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">이름</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">이메일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">연락처</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">등급</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">가입일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                          {u.name[0]}
                        </div>
                        <span className="font-medium text-slate-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{u.email}</td>
                    <td className="px-4 py-3 text-slate-500">{u.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${GRADE_COLORS[u.grade]}`}>{u.grade}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{u.joinDate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        u.status === '활성' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => toggleStatus(u.id)}
                          className={`text-xs px-2 py-1 rounded border transition-colors ${
                            u.status === '활성'
                              ? 'border-red-200 text-red-600 hover:bg-red-50'
                              : 'border-green-200 text-green-600 hover:bg-green-50'
                          }`}>
                          {u.status === '활성' ? '정지' : '활성화'}
                        </button>
                        <button type="button" onClick={() => upgradeGrade(u.id)}
                          title="등급 업그레이드"
                          className="text-xs px-2 py-1 rounded border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors">
                          업
                        </button>
                        <button type="button" onClick={() => setConfirmDelete(u.id)}
                          className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 transition-colors">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <svg className="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          )}
        </div>

        {/* Delete Confirm Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
              <h3 className="font-bold text-slate-900 mb-2">회원 삭제</h3>
              <p className="text-sm text-slate-500 mb-5">이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConfirmDelete(null)}
                  className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm hover:bg-slate-50">취소</button>
                <button type="button" onClick={() => deleteUser(confirmDelete)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700">삭제</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;

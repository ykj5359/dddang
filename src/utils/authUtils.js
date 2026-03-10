export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '', text: '' };
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[!@#$%^&*]/.test(pw)) score += 1;
  if (score <= 1) return { score, label: '매우 약함', color: 'bg-red-400', text: 'text-red-500' };
  if (score === 2) return { score, label: '약함', color: 'bg-orange-400', text: 'text-orange-500' };
  if (score === 3) return { score, label: '보통', color: 'bg-yellow-400', text: 'text-yellow-500' };
  if (score === 4) return { score, label: '강함', color: 'bg-blue-400', text: 'text-blue-500' };
  return { score, label: '매우 강함', color: 'bg-green-500', text: 'text-green-600' };
};

export const formatPhone = (val) => {
  const n = val.replace(/[^0-9]/g, '');
  if (n.length <= 3) return n;
  if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`;
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
};

export const authStorage = {
  getUser: () => {
    try { return JSON.parse(localStorage.getItem('ddangkkun_user') || 'null'); }
    catch { return null; }
  },
  setUser: (user) => localStorage.setItem('ddangkkun_user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('ddangkkun_user'),
  getUsers: () => {
    try { return JSON.parse(localStorage.getItem('ddangkkun_users') || '[]'); }
    catch { return []; }
  },
  addUser: (user) => {
    const users = authStorage.getUsers();
    users.push(user);
    localStorage.setItem('ddangkkun_users', JSON.stringify(users));
  },
  findUser: (email) => authStorage.getUsers().find((u) => u.email === email) || null,
};

// 회원 등급 결정 (가입일 기준 샘플 로직)
export const getMemberGrade = (user) => {
  if (!user) return null;
  if (user.grade) return user.grade;
  return 'bronze'; // 기본 등급
};

export const GRADE_INFO = {
  bronze: { label: '일반', icon: '🥉', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', desc: '기본 실거래가 조회' },
  silver: { label: '실버', icon: '🥈', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', desc: '주변 가격변동 추가 조회' },
  gold:   { label: '골드', icon: '🥇', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200', desc: '공매·경매·토지계획정보 이용' },
};

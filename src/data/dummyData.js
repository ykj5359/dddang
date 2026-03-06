// 더미 데이터 (API 연동 전 UI 개발용)

export const recentLands = [
  {
    id: 1,
    address: '경기도 여주시 강천면 간매리 123',
    type: '전',
    area: 3300,
    price: 85000000,
    officialPrice: 42000,
    dealPrice: 92000,
    riskScore: 35,
    lat: 37.3042,
    lng: 127.6297,
  },
  {
    id: 2,
    address: '충남 홍성군 홍동면 운월리 456',
    type: '답',
    area: 6600,
    price: 120000000,
    officialPrice: 28000,
    dealPrice: 38000,
    riskScore: 15,
    lat: 36.5983,
    lng: 126.6628,
  },
  {
    id: 3,
    address: '전남 나주시 봉황면 옥곡리 789',
    type: '전',
    area: 1650,
    price: 45000000,
    officialPrice: 35000,
    dealPrice: 48000,
    riskScore: 60,
    lat: 35.0169,
    lng: 126.7107,
  },
];

export const listings = [
  {
    id: 1,
    address: '경기 여주시 강천면 간매리 123',
    type: '전',
    area: 3300,
    price: 85000000,
    dealType: '매매',
    description: '도로 인접, 수리 편리, 농업용 전기 가능',
    contact: '010-1234-5678',
    images: [],
    createdAt: '2026-03-01',
  },
  {
    id: 2,
    address: '충남 홍성군 홍동면 운월리 456',
    type: '답',
    area: 6600,
    price: 0,
    rentPrice: 500000,
    dealType: '임대',
    description: '수리 완비, 유기농 단지 인근, 귀농인 우대',
    contact: '010-9876-5432',
    images: [],
    createdAt: '2026-02-28',
  },
  {
    id: 3,
    address: '전북 완주군 구이면 항가리 321',
    type: '전',
    area: 4950,
    price: 95000000,
    dealType: '매매',
    description: '산 조망, 조용한 환경, 귀농 최적',
    contact: '010-5555-7777',
    images: [],
    createdAt: '2026-02-25',
  },
  {
    id: 4,
    address: '강원 평창군 봉평면 창동리 654',
    type: '전',
    area: 9900,
    price: 150000000,
    dealType: '매매',
    description: '평지, 관개 시설 완비, 전기 인입 완료',
    contact: '010-3333-4444',
    images: [],
    createdAt: '2026-02-20',
  },
];

export const myLands = [
  {
    id: 1,
    address: '경기도 여주시 강천면 간매리 123',
    type: '전',
    area: 3300,
    officialPrice: 42000,
    totalValue: 138600000,
  },
  {
    id: 2,
    address: '충북 충주시 엄정면 목계리 222',
    type: '임야',
    area: 9900,
    officialPrice: 8000,
    totalValue: 79200000,
  },
];

export const savedLands = [
  {
    id: 3,
    address: '전남 나주시 봉황면 옥곡리 789',
    type: '전',
    area: 1650,
    officialPrice: 35000,
    totalValue: 57750000,
  },
];

export const priceHistory = [
  { year: '2023', avgPrice: 75000 },
  { year: '2024', avgPrice: 82000 },
  { year: '2025', avgPrice: 88000 },
  { year: '2026', avgPrice: 92000 },
];

export const nearbyLivestock = [
  { id: 1, name: '한빛 양돈장', type: '돈사', distance: 280, lat: 37.3062, lng: 127.6320 },
  { id: 2, name: '초록 양계장', type: '계사', distance: 650, lat: 37.3010, lng: 127.6250 },
  { id: 3, name: '하늘 한우농장', type: '우사', distance: 920, lat: 37.3080, lng: 127.6180 },
];

export const newsItems = [
  {
    id: 1,
    title: '2026년 농지법 개정안 주요 내용 안내',
    date: '2026-03-05',
    category: '농지법',
  },
  {
    id: 2,
    title: '귀농·귀촌 지원사업 신청 접수 시작',
    date: '2026-03-03',
    category: '귀농지원',
  },
  {
    id: 3,
    title: '농지 실거래가 전년 대비 8.5% 상승',
    date: '2026-03-01',
    category: '시장동향',
  },
  {
    id: 4,
    title: '농지신탁 제도 활용으로 처분 의무 해소하는 방법',
    date: '2026-02-28',
    category: '농지신탁',
  },
];

export const farmingGuide = [
  {
    id: 1,
    title: '농지취득자격증명(농취증) 발급 방법',
    content: '농지를 취득하려면 농지취득자격증명을 발급받아야 합니다. 농업경영계획서를 작성하여 해당 농지 소재지 읍·면사무소에 신청하면 됩니다. 처리 기간은 통상 4일 이내입니다.',
  },
  {
    id: 2,
    title: '농지 처분 의무 및 이행 강제금',
    content: '비농업인이 농지를 취득한 경우 1년 이내에 처분해야 합니다. 기한 내 미처분 시 공시지가의 20%에 해당하는 이행강제금이 부과됩니다. 농지신탁이나 임대 등으로 합법적 보유가 가능합니다.',
  },
  {
    id: 3,
    title: '농지 임대차 관련 규정',
    content: '농지법에 따라 농지 임대차는 서면 계약이 원칙이며, 임대 기간은 최소 3년 이상입니다. 귀농·귀촌인이 임차하는 경우 별도 요건이 완화됩니다.',
  },
  {
    id: 4,
    title: '농지신탁이란?',
    content: '농지신탁은 농지 소유자가 신탁회사에 농지를 맡기고 신탁회사가 농지를 경작·관리하는 제도입니다. 자경 의무를 이행하지 못하는 경우에도 합법적으로 농지를 보유할 수 있습니다.',
  },
];

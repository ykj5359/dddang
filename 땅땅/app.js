// 햄버거 메뉴
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// 외부 클릭 시 메뉴 닫기
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// 상담 폼 제출
function submitForm(e) {
  e.preventDefault();
  document.getElementById('modal').classList.add('open');
}

// 모달 닫기
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// 스크롤 시 헤더 그림자
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.12)'
    : '0 2px 10px rgba(0,0,0,0.06)';
});

// 카드 클릭 인터랙션
document.querySelectorAll('.listing-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('매물 상세 페이지로 이동합니다.');
  });
  card.style.cursor = 'pointer';
});

// 검색 버튼
document.querySelector('.search-btn').addEventListener('click', () => {
  const region = document.querySelectorAll('.search-select')[0].value;
  const type = document.querySelectorAll('.search-select')[1].value;
  if (region === '지역 선택' && type === '토지 유형') {
    alert('지역 또는 토지 유형을 선택해주세요.');
    return;
  }
  alert(`검색 중: ${region} / ${type}`);
});

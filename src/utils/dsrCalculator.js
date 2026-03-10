// 월 상환액 계산 (원리금균등)
export const calcMonthly = (principal, annualRate, years) => {
  if (!principal || !annualRate || !years) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
};

// 총 이자 계산
export const calcTotalInterest = (principal, monthly, years) => {
  return Math.round(monthly * years * 12 - principal);
};

// 금액 축약 표기
export const fmtShort = (won) => {
  if (!won || !Number.isFinite(won)) return '0원';
  if (won >= 100000000) return `${(won / 100000000).toFixed(1)}억`;
  if (won >= 10000) return `${Math.floor(won / 10000).toLocaleString()}만`;
  return `${won.toLocaleString()}원`;
};

// DSR 계산
export const calcDSR = (annualIncome, monthlyPayments) => {
  if (!annualIncome) return 0;
  const monthlyIncome = annualIncome / 12;
  return Math.round((monthlyPayments / monthlyIncome) * 1000) / 10;
};

// DTI 계산
export const calcDTI = (annualIncome, monthlyLoanPayment, otherAnnualDebt = 0) => {
  if (!annualIncome) return 0;
  const annualLoan = monthlyLoanPayment * 12;
  return Math.round(((annualLoan + otherAnnualDebt) / annualIncome) * 1000) / 10;
};

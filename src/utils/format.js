export function formatPrice(price) {
  if (!price) return '협의';
  if (price >= 100000000) {
    const eok = Math.floor(price / 100000000);
    const man = Math.floor((price % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  return `${Math.floor(price / 10000).toLocaleString()}만원`;
}

export function formatArea(sqm) {
  const pyeong = Math.round(sqm / 3.3058);
  return `${sqm.toLocaleString()}㎡ (약 ${pyeong}평)`;
}

export const LAND_TYPE_COLORS = {
  전: 'bg-yellow-100 text-yellow-800',
  답: 'bg-blue-100 text-blue-800',
  대: 'bg-gray-100 text-gray-800',
  임야: 'bg-green-100 text-green-800',
  과수원: 'bg-orange-100 text-orange-800',
};

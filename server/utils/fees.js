export const categoryFees = {
  '21KM Half Marathon': 2500,
  '15KM Race': 2000,
  '10KM Race': 1500,
  "10KM CEO's Challenge": 5000,
  '5KM Family Fun Run': 1000
};

export function getCategoryFee(category) {
  return categoryFees[category] ?? null;
}

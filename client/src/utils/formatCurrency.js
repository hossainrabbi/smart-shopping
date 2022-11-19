const formatCurrency = new Intl.NumberFormat('bn-BD', {
  style: 'currency',
  currency: 'BDT',
  minimumFractionDigits: 2,
});

export default formatCurrency;

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'BDT',
  minimumFractionDigits: 2,
});

export default formatCurrency;

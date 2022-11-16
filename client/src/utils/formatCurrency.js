const formatCurrency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'BDT',
  minimumFractionDigits: 2,
});

export default formatCurrency;

function sortProductFilter(searchFilter, price) {
  if (price) {
    return searchFilter?.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
  }
  return searchFilter?.sort((a, b) =>
    a.productName > b.productName ? 1 : b.productName > a.productName ? -1 : 0
  );
}

export default sortProductFilter;

import React from 'react';
import Banner from '../../user/Banner/Banner';
import Header from '../../user/Header/Header';
import Products from '../../user/Products/Products';
import Support from '../../user/Support/Support';

const Home = () => {
  return (
    <div>
      <Header />
      <Support />
      <Products />
      <Banner />
    </div>
  );
};

export default Home;

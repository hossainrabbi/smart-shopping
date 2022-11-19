import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { slider } from '../../../data/home.data';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="home__slider"
    >
      {slider.map((item) => (
        <SwiperSlide key={item.id}>
          <Link to="/shop">
            <img
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              src={item.image}
              alt="slider"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Header;

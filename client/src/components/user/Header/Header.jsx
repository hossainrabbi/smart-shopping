import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { slider } from '../../../data/home.data';

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
      className="mySwiper"
    >
      {slider.map((item) => (
        <SwiperSlide key={item.id}>
          <img
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            src={item.image}
            alt="slider"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Header;

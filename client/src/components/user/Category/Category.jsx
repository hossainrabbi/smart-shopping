import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { getCategories } from '../../../redux/action/categories-action';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import './Category.scss';

const Category = () => {
  const { categories } = useSelector((store) => store.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Container className="pt-4">
      <ContentTitle title="All Categories" />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="categories"
      >
        {categories?.map((category) => (
          <SwiperSlide className="category__container" key={category._id}>
            <img src={category.categoryImage} alt={category.categoryName} />
            <h5 className="my-3">{category.categoryName}</h5>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Category;

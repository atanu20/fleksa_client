import React from 'react';
import './Slider.css';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';
import { NavLink } from 'react-router-dom';
import { banarlist, categoryList, path } from '../../data/fdata';

const CategorySlider = () => {
  SwiperCore.use([Autoplay, Navigation]);
  return (
    <>
      <div className="category_slider">
        <Swiper
          //   modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={'auto'}
          loop={true}
          //   autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {categoryList.map((v, ind) => (
            <SwiperSlide>
              <NavLink to={v.link} className="cat_nav_link">
                <div className="cate__slider">
                  <img src={`${path}/image/${v.image}`} alt="" />

                  <p>{v.title}</p>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="banar">
        <Swiper
          navigation={true}
          modules={[Autoplay, Navigation]}
          grabCursor={true}
          spaceBetween={5}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {banarlist.map((v, ind) => (
            <SwiperSlide>
              <NavLink to={v.link} className="banar_link">
                <div className="banar__slider">
                  <img src={`${path}/image/banar/${v.image}`} alt="" />
                  <div className="hero__text__div">
                    <h1>{v.title}</h1>
                    <NavLink to={v.link} className="btn btn-dark">
                      View
                    </NavLink>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CategorySlider;

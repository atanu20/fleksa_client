import React from 'react';
import './Slider.css';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { path } from '../../data/fdata';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const TopRate = ({ text, list, link, preload }) => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div className="top__rate">
        {list.length == 0 ? (
          <>
            <div className="text-center">
              <p>There is no items</p>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <div className="dd_flex">
                <h2>{text}</h2>

                <NavLink to="/restaurants">
                  <i class="bx bx-right-arrow-alt"></i>
                </NavLink>
              </div>

              <br />
              <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                loop={true}
                //   autoplay={{ delay: 3000 }}
              >
                {list?.map((val, ind) => {
                  return (
                    <>
                      {preload ? (
                        <>
                          <SkeletonTheme
                            baseColor="#0f0f0f"
                            highlightColor="#444"
                          >
                            <SwiperSlide key={ind}>
                              <div className="top_rate_nav_link">
                                <div className="top__slider">
                                  <Skeleton height={270} />
                                </div>
                              </div>
                            </SwiperSlide>
                          </SkeletonTheme>
                        </>
                      ) : (
                        <>
                          <SwiperSlide key={ind}>
                            <NavLink
                              to={`/food/${val.food_id}`}
                              className="top_rate_nav_link"
                            >
                              <div className="top__slider">
                                <img src={val.image} alt={val.title} />
                                <div className="top__icon__div">
                                  <NavLink
                                    to={`/food/${val.food_id}`}
                                    className="btn-red"
                                  >
                                    <i class="bx bx-cart-add"></i>
                                  </NavLink>
                                </div>
                              </div>
                            </NavLink>
                          </SwiperSlide>
                        </>
                      )}
                    </>
                  );
                })}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TopRate;

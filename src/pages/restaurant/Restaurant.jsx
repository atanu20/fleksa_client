import React from 'react';
import './Restaurant.css';
import { NavLink, useParams } from 'react-router-dom';
import CardItem from '../../component/slider/CardItem';
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { apilink } from '../../data/fdata';

const Restaurant = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [preload, setPreLoad] = useState(false);
  const { food } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getFavRestaurants = async () => {
    setPreLoad(true);
    const res = await axios.get(`${apilink}/api/v1/user/getFavRestaurants`);
    // console.log(res.data);
    if (res.data.success) {
      if (food?.length > 0) {
        let arr = res.data.result.filter(
          (v) =>
            v.title.toLowerCase().includes(food.toLowerCase()) ||
            v.name.toLowerCase().includes(food.toLowerCase()) ||
            v.description.toLowerCase().includes(food.toLowerCase())
        );
        setAllRestaurants(arr);
      } else {
        setAllRestaurants(res.data.result);
      }
    }
    setTimeout(() => {
      setPreLoad(false);
    }, 3000);
  };

  useEffect(() => {
    getFavRestaurants();
  }, []);

  return (
    <>
      <div className="resturant ">
        <div className="container-fluid mt-3">
          <div className="dd_flex">
            <h2>Best Items</h2>

            {/* <div className="filter">
              <div class="form-group">
                <select class="form-control" id="sel1">
                  <option value="" selected hidden>
                    --Filter--
                  </option>
                  <option value="all">All</option>
                  <option value="price">Sort By Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div> */}
          </div>
          {preload ? (
            <>
              <div className="row">
                {Array(allRestaurants.length)
                  .fill(1)
                  .map((v, ind) => {
                    return (
                      <>
                        <SkeletonTheme
                          baseColor="#f2f0eb"
                          highlightColor="#e0dcd1"
                        >
                          <div
                            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
                            key={ind}
                          >
                            <div className="card p-2">
                              <Skeleton height={200} />
                              <div className="p-2 card_text">
                                <Skeleton height={30} width="50%" />
                                <Skeleton height={25} width={100} />
                                <Skeleton height={25} width={50} />
                                <Skeleton height={25} />
                                <Skeleton height={25} />
                                <div className="row">
                                  <div className="col-6">
                                    <Skeleton height={40} />
                                  </div>
                                  <div className="col-6">
                                    <Skeleton height={40} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SkeletonTheme>
                      </>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              {allRestaurants.length > 0 ? (
                <>
                  <div className="row">
                    {allRestaurants.map((v) => {
                      return (
                        <>
                          <CardItem
                            title={v.title}
                            price={v.price}
                            sname={v.name}
                            tags={v.tags}
                            best={v.best}
                            description={v.description}
                            image={v.image}
                            f_id={v.food_id}
                            re_id={v.res_id}
                          />
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-3">
                    <h3>No Item Found</h3>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurant;

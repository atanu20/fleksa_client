import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import CardItem from '../../component/slider/CardItem';

const RestaurantDet = () => {
  const { resid } = useParams();
  const [foods, setFoods] = useState([]);
  const [restuDet, setRestuDet] = useState({});
  const [ratevalue, setRateValue] = useState({});

  const [preload, setPreLoad] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getAllFoodsByResId = async () => {
    setPreLoad(true);
    const res = await axios.get(
      `${apilink}/api/v1/restaurant/getAllItemsByResId/${resid}`
    );
    // console.log(res.data);
    if (res.data.success) {
      setFoods(res.data.result);
    }
    setTimeout(() => {
      setPreLoad(false);
    }, 3000);
  };

  const getRestuDetailsById = async () => {
    const res = await axios.get(
      `${apilink}/api/v1/restaurant/getRestuDetailsById/${resid}`
    );

    if (res.data.success && res.data.result.length > 0) {
      setRestuDet(res.data.result[0]);
    }
  };

  const getALlRestRating = async () => {
    const res = await axios.get(
      `${apilink}/api/v1/restaurant/getALlRestRating/${resid}`
    );
    console.log(res.data);
    if (res.data.success && res.data?.result.length > 0) {
      setRateValue(res.data.result[0]);
    }
  };

  useEffect(() => {
    if (resid) {
      getRestuDetailsById();
      getAllFoodsByResId();
      getALlRestRating();
    }
  }, []);
  return (
    <>
      <div className="resturant">
        <div className="container-fluid">
          <div className="row mt-2 mb-2">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="card p-3">
                <h3>{restuDet.name && restuDet.name}</h3>
                <h4>{restuDet.address && restuDet.address}</h4>
                <h4>{restuDet.phone && restuDet.phone}</h4>
                <div className="text-left">
                  {ratevalue.rating_val && (
                    <>
                      <span class="badge badge-warning text-light">
                        {ratevalue.rating_val.toFixed(1)}{' '}
                        <i class="bx bxs-star"></i>
                      </span>{' '}
                      &nbsp; {ratevalue.totalreview} reviews
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {preload ? (
            <>
              <div className="row">
                {Array(foods.length)
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
              {foods.length > 0 ? (
                <>
                  <div className="row">
                    {foods.map((v) => {
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

export default RestaurantDet;

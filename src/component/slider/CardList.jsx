import React from 'react';
import { path } from '../../data/fdata';
import CardItem from './CardItem';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardList = ({ allRestaurants, preload }) => {
  return (
    <>
      <div className="cardlist">
        <div className="pl-3 mb-4">
          <h2>Best Restaurants</h2>
        </div>
        <div className="container-fluid">
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
              <div className="row">
                {allRestaurants?.map((v) => {
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
          )}
        </div>
      </div>
    </>
  );
};

export default CardList;

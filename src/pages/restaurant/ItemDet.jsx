import React, { useEffect } from 'react';
import { apilink, path } from '../../data/fdata';
import TopRate from '../../component/slider/TopRate';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
const ItemDet = () => {
  const [allfoods, setAllFoods] = useState([]);
  const [foodById, setFoodById] = useState([]);
  const [qty, setQty] = useState(1);
  const { addtocartwithqty } = useContext(DataContext);
  const [preload, setPreLoad] = useState(false);
  const { foodid } = useParams();
  const alert = useAlert();
  const [ratevalue, setRateValue] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getAllFoods = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getAllFoods`);
    if (res.data.success) {
      setAllFoods(res.data.result);
    }
  };

  const getFoodById = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getFoodById/${foodid}`);
    // console.log(res.data);
    if (res.data.success) {
      setFoodById(res.data.result);
    } else {
      alert.error(res.data.msg);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  useEffect(() => {
    setPreLoad(true);

    getFoodById();
    setTimeout(() => {
      setPreLoad(false);
    }, 3000);
  }, [foodid]);

  const getratingbyFoodid = async (ffid) => {
    const res = await axios.get(
      `${apilink}/api/v1/user/getratingbyFoodid/${ffid}`
    );
    // console.log(res.data);
    if (res.data.success && res.data?.result.length > 0) {
      setRateValue(res.data.result[0].rating_val);
    }
  };

  useEffect(() => {
    if (foodid) {
      setRateValue('');
      getratingbyFoodid(foodid);
    }
  }, [foodid]);

  return (
    <>
      <div className="resturant">
        <div className="container mt-5 mb-5">
          {preload ? (
            <>
              <SkeletonTheme baseColor="#f2f0eb" highlightColor="#e0dcd1">
                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <Skeleton height={350} />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <Skeleton height={35} width="75%" />
                    <Skeleton height={25} width="50%" />
                    <Skeleton height={25} width={75} />
                    <Skeleton height={25} />
                    <Skeleton height={25} />

                    <Skeleton height={25} width={75} />
                    <div className="">
                      <Skeleton height={45} width={150} />
                      <Skeleton height={45} width={150} />
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            </>
          ) : (
            <>
              {foodById?.length > 0 && (
                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <img src={foodById[0].image} alt="" className="det_img" />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h1>{foodById[0].title}</h1>
                    <h5>{foodById[0].name}</h5>
                    {ratevalue && (
                      <span class="badge badge-warning text-light">
                        {ratevalue.toFixed(1)} <i class="bx bxs-star"></i>
                      </span>
                    )}
                    <p>{foodById[0].description}</p>
                    <h3>₹{foodById[0].price}.00 </h3>
                    <div className="">
                      <div class="form-group">
                        <select
                          class="form-control"
                          id="sel1"
                          style={{ width: '150px' }}
                          onChange={(e) => setQty(e.target.value)}
                          value={qty}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          addtocartwithqty(foodById[0].food_id, qty)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <TopRate text="Top Rated Dishs" link="movie" list={allfoods} />
      </div>
    </>
  );
};

export default ItemDet;

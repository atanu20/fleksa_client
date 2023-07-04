import React, { useEffect, useState } from 'react';
import { apilink, path } from '../../data/fdata';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import axios from 'axios';

const WishListCard = ({ wishdata }) => {
  const { addtocart } = useContext(DataContext);
  const [ratevalue, setRateValue] = useState('');

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
    if (wishdata?.fo_id) {
      getratingbyFoodid(wishdata?.fo_id);
    }
  }, []);

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card p-2">
          <img src={wishdata.image} alt="" />
          <NavLink to={`/food/${wishdata.fo_id}`} className="p-2 link_card">
            <h5>
              {wishdata.title} &nbsp;{' '}
              {ratevalue && (
                <span class="badge badge-warning text-light">
                  {ratevalue.toFixed(1)} <i class="bx bxs-star"></i>
                </span>
              )}
            </h5>
            <p className="mer-top">
              <b>{wishdata.name}</b>
            </p>
            <p className="m-0"> ₹{wishdata.price}.00</p>
            <p>{wishdata.description}</p>
          </NavLink>

          <button
            className="btn btn-dark m-1"
            onClick={() => addtocart(wishdata.fo_id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default WishListCard;

import React, { useEffect, useState } from 'react';
import { apilink, path } from '../../data/fdata';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';
const CardItem = ({
  title,
  price,
  tags,
  sname,
  best,
  image,
  description,
  f_id,
  re_id,
}) => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const alert = useAlert();
  const [ratevalue, setRateValue] = useState('');
  const { addtocart } = useContext(DataContext);

  const addwishlist = async (id) => {
    const data = {
      restu_id: re_id,
      fo_id: id,
    };
    const res = await axios.post(`${apilink}/api/v1/user/addwishlist`, data, {
      headers: {
        Authorization: atokon,
      },
    });
    if (res.data.success) {
      alert.success('Added to Wishlist');
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_fleksa_access_user_tokon_');
        localStorage.removeItem('_fleksa_access_user_login');
        console.clear();
        window.location.href = '/login';
      } else {
        alert.error(res.data.msg);
      }
    }
  };

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
    if (f_id) {
      getratingbyFoodid(f_id);
    }
  }, []);

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card p-2">
          <img src={image} alt="" />
          <NavLink to={`/food/${f_id}`} className="p-2 link_card">
            <h5>
              {title} &nbsp;{' '}
              {ratevalue && (
                <span class="badge badge-warning text-light">
                  {ratevalue.toFixed(1)} <i class="bx bxs-star"></i>
                </span>
              )}
            </h5>
            <NavLink to={`/restaurants/${re_id}`}>
              <p className="mer-top">
                <b>{sname}</b>
              </p>
            </NavLink>
            <p className="m-0"> ₹{price}.00</p>
            <p>{description}</p>
          </NavLink>
          <div className="d_flex">
            <button
              className="btn btn-dark m-1"
              onClick={() => addtocart(f_id)}
            >
              Add To Cart
            </button>
            <button
              className="btn btn-dark m-1"
              onClick={() => addwishlist(f_id)}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;

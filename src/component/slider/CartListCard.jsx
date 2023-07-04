import React from 'react';
import { path } from '../../data/fdata';
import { NavLink } from 'react-router-dom';

const CartListCard = ({
  cartd,
  handleDelete,
  increment,
  decrement,
  getQty,
  getSum,
}) => {
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card p-2">
          <img src={cartd.image} alt="" />
          <NavLink to={`/food/${cartd.food_id}`} className="p-2 link_card">
            <h5>
              {cartd.title} &nbsp;{' '}
              <span class="badge badge-warning text-light">
                4.5 <i class="bx bxs-star"></i>
              </span>
            </h5>
            <p className="mer-top">
              <b>{cartd.name}</b>
            </p>
            <p className="m-0">
              ₹<span>{cartd.price}</span>.00{' '}
              <span className="text-warning">x</span> {getQty(cartd.food_id)}{' '}
              &nbsp; ={' '}
              <span className="text-warning">
                ₹ {getSum(cartd.food_id, cartd.price)}.00
              </span>
            </p>
            <p>{cartd.description}</p>
          </NavLink>
          <div className="p-1">
            <div className="dd_flex">
              <div>
                <button
                  className="btn btn-dark"
                  onClick={() => increment(cartd.food_id)}
                >
                  <i class="bx bx-plus"></i>
                </button>
                <input
                  type="text"
                  readOnly
                  value={getQty(cartd.food_id)}
                  className="cart_inp"
                />
                <button
                  className="btn btn-dark"
                  onClick={() => decrement(cartd.food_id)}
                >
                  <i class="bx bx-minus"></i>
                </button>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(cartd.food_id)}
              >
                <i class="bx bx-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartListCard;

import React from 'react';
import CartListCard from '../../component/slider/CartListCard';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { path } from '../../data/fdata';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import Cookies from 'js-cookie';

const CartDetails = () => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const [inputAddres, setInputAddres] = useState('');

  const [products, setProducts] = useState([]);
  const [userAdd, setUserAdd] = useState([]);

  const { cart, setCart } = useContext(DataContext);
  const alert = useAlert();
  const [amount, setAmount] = useState('');
  const [udet, setUdet] = useState({});
  const [openpop, setOpenPop] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');
  const his = useHistory();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      his.push('/login');
    } else {
      setUdet(res.data.userInfo);
    }
  }, []);

  const getCartDetails = async () => {
    let data = JSON.stringify({ ids: Object.keys(cart.items) });
    const res = await axios.post(
      `${apilink}/api/v1/user/getCartDetails`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.data.success) {
      setProducts(res.data.result);
    } else {
      alert.error(res.data.msg);
    }
  };

  const getQty = (productId) => {
    return cart.items[productId];
  };
  const getSum = (productId, price) => {
    const sum = price * getQty(productId);

    return sum;
  };

  useEffect(() => {
    if (cart.Totalitems > 0) {
      getCartDetails();
    }
  }, [cart]);

  let total = 0;
  useEffect(() => {
    products.forEach((el) => {
      total = total + el.price * getQty(el.food_id);
      // console.log(total)
    });
    setAmount(total);
  }, [products]);

  const addAddress = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phone,
      address: addr,
    };

    const res = await axios.post(
      `${apilink}/api/v1/user/addUserAddress`,
      data,
      {
        headers: {
          Authorization: atokon,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      setOpenPop(false);
      getUserAddress();
    } else {
      alert.error(res.data.msg);
    }
  };

  const getUserAddress = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getUserAddress`, {
      headers: {
        Authorization: atokon,
      },
    });

    // console.log(res.data);
    if (res.data.success) {
      setUserAdd(res.data.result);
    } else {
      alert.error(res.data.msg);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  const onBuy = async (e) => {
    e.preventDefault();
    const data = {
      totalprice: amount > 500 ? amount : amount + 50,
      paymentmode: 'online',
      paymentemail: udet.email,
      addressid: inputAddres,
      products: products,
      cart: cart,
    };

    const res = await axios.post(`${apilink}/api/v1/user/buynow`, data, {
      headers: {
        Authorization: atokon,
      },
    });
    if (res.data.success) {
      localStorage.setItem('fleksapid', res.data.result.payment_request.id);
      window.open(res.data.result.payment_request.longurl, '_self');
    } else {
      alert.error(res.data.msg);
    }
  };

  return (
    <>
      <div className="resturant">
        <div className="container">
          <div className="dd_flex">
            <h2>Your Cart Details</h2>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Qty</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((val, ind) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink
                            to={`/food/${val.food_id}`}
                            className="cart_link_item"
                          >
                            <img
                              src={val.image}
                              alt=""
                              className="cart_sm_img"
                            />
                            <br />
                            <small>{val.title}</small>
                          </NavLink>
                        </td>
                        <td> ₹ {val.price}</td>
                        <td>{getQty(val.food_id)}</td>
                        <td>₹ {getSum(val.food_id, val.price)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row mt-3 mb-5">
            <div className="col-md-6 col-12"></div>
            <div className="col-md-6 col-12">
              <div className="card p-2">
                <div className="text-right">
                  <button
                    className="btn btn-dark"
                    onClick={() => setOpenPop(true)}
                  >
                    Add Address
                  </button>
                </div>
                <hr />
                <h3>Price : {amount} </h3>
                <h3>Delivery Fees : {amount > 500 ? 0 : 50}</h3>
                <h3>Total Amount : {amount > 500 ? amount : amount + 50}</h3>

                <p>Choose Address</p>
                <form onSubmit={onBuy}>
                  {userAdd?.map((v) => {
                    return (
                      <>
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="optradio"
                              value={v.add_id}
                              onChange={(e) => setInputAddres(e.target.value)}
                              required
                            />
                            {v.name} <br />
                            {v.phone} <br />
                            {v.address}
                          </label>
                        </div>
                      </>
                    );
                  })}
                  {userAdd.length > 0 && (
                    <button className="btn btn-primary m-3 mt-4">PayNow</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openpop && (
        <div className="modbox">
          <div className="smbox">
            <div className="cross" onClick={() => setOpenPop(false)}>
              <i class="bx bx-x"></i>
            </div>
            <form onSubmit={addAddress}>
              <div class="form-group">
                <label for="usr">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  class="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div class="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  class="form-control"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label>Full Address:</label>

                <textarea
                  name="address"
                  id=""
                  class="form-control"
                  rows="3"
                  placeholder="Enter Full Address"
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button className="btn btn-dark">Add Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;

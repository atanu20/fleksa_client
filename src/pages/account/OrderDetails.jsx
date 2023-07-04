import React, { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { apilink } from '../../data/fdata';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {
  const [rateshow, setRateshow] = useState(false);
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const [orderdetlist, setOrderdetlist] = useState([]);

  const his = useHistory();
  const { orderid } = useParams();
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
    }
  }, []);

  const getAllOrdersDetByOId = async () => {
    const res = await axios.get(
      `${apilink}/api/v1/user/getAllOrdersDetByOId/${orderid}`,
      {
        headers: {
          Authorization: atokon,
        },
      }
    );
    if (res.data.success) {
      setOrderdetlist(res.data.result);
    } else {
    }
  };

  useEffect(() => {
    getAllOrdersDetByOId();
  }, []);

  const handelrate = async (fid) => {
    setRateshow(true);
  };
  return (
    <>
      <div className="resturant">
        <div className="container mt-5 mb-5">
          <h2>Order Details</h2>

          <div className="row">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>Details</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Rate Now</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdetlist.map((val, ind) => {
                    return (
                      <>
                        <tr key={ind}>
                          <td>{val.od_id}</td>
                          <td>{new Date(val.od_date).toDateString()}</td>

                          <td>
                            <NavLink to={`/food/${val.foodid}`}>
                              <img src={val.image} className="cart_sm_img" />{' '}
                              <br />
                              <small>{val.title}</small>
                            </NavLink>
                          </td>
                          <td>₹ {val.price}.00</td>
                          <td>{val.foodqty}</td>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => handelrate(val.foodid)}
                            >
                              Rate
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {rateshow && (
        <div className="modbox">
          <div className="smbox p-5">
            <div className="cross" onClick={() => setRateshow(false)}>
              <i class="bx bx-x"></i>
            </div>
            <form>
              <div class="form-group">
                <select class="form-control" id="sel1">
                  <option value="" selected hidden>
                    --Rate Food--
                  </option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="text-center">
                <button className="btn btn-dark">Submit Rating</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;

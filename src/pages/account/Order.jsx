import React from 'react';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import Cookies from 'js-cookie';
import { useState } from 'react';

const Order = () => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const [orderlist, setOrderlist] = useState([]);

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
    }
  }, []);

  const getAllOrdersById = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getAllOrdersById`, {
      headers: {
        Authorization: atokon,
      },
    });
    if (res.data.success) {
      setOrderlist(res.data.result);
    } else {
    }
  };

  useEffect(() => {
    getAllOrdersById();
  }, []);

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
                    <th>Order Id</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Amount</th>
                    <th>Address</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {orderlist.map((val, ind) => {
                    return (
                      <>
                        <tr key={ind}>
                          <td>{val.ord_id}</td>
                          <td>{new Date(val.odate).toDateString()}</td>

                          <td>{val.orderstatus}</td>
                          <td>₹{val.totalamount}.00</td>
                          <td>
                            {val.name} <br /> {val.phone} <br /> {val.address}
                          </td>
                          <td>
                            <NavLink
                              to={`/orders/${val.ord_id}`}
                              className="btn btn-dark"
                            >
                              View
                            </NavLink>
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
    </>
  );
};

export default Order;

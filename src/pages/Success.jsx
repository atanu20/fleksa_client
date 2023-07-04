import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { useHistory, useLocation } from 'react-router-dom';
import { apilink } from '../data/fdata';
import axios from 'axios';
import Cookies from 'js-cookie';

const Success = () => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const { setCart } = useContext(DataContext);
  const his = useHistory();
  const fleksapid = localStorage.getItem('fleksapid');

  const loc = useLocation();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setCart({});
    const paydet = async () => {
      // console.log(loc.search)
      const str = loc.search;
      const myArr = str.split('=');
      const pyid = myArr[myArr.length - 1];
      console.log(pyid);
      console.log(fleksapid);
      if (fleksapid === pyid) {
        const res = await axios.get(`${apilink}/api/v1/user/success/${pyid}`, {
          headers: {
            Authorization: atokon,
          },
        });
        //    console.log(his)
        console.log(res.data);
      }
    };
    paydet();
  }, []);

  return (
    <>
      <div className="error">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 mx-auto">
              <h1>Order placed done</h1>
              <button
                className="btn btn-primary"
                onClick={() => his.push('/restaurants')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;

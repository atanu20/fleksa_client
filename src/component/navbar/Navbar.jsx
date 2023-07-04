import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { apilink, path } from '../../data/fdata';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
const Navbar = () => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const [showSearch, setShowSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [udet, setUdet] = useState({});
  const { cart } = useContext(DataContext);
  const [logou, setLogou] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setUdet(res.data.userInfo);
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove('_fleksa_access_user_tokon_');
    localStorage.removeItem('_fleksa_access_user_login');
    console.clear();
    window.location.href = '/login';
  };

  const getFavRestaurants = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getFavRestaurants`);
    if (res.data.success) {
      setAllRestaurants(res.data.result);
    }
  };

  useEffect(() => {
    getFavRestaurants();
  }, []);

  const searchHandel = (e) => {
    let se = e.target.value;
    setSearch(se);
    // console.log(allRestaurants);

    let arr = allRestaurants.filter(
      (v) =>
        v.title.toLowerCase().includes(se.toLowerCase()) ||
        v.name.toLowerCase().includes(se.toLowerCase()) ||
        v.description.toLowerCase().includes(se.toLowerCase())
    );

    if (se === '') {
      setFilterdata([]);
    } else {
      setFilterdata(arr);
    }

    // setFilterdata
  };

  return (
    <>
      <div className="navbar_box fixed-top">
        <div className="inn_navbar">
          <NavLink to="/" className="logo">
            <img
              src={`${path}/image/fleksa-logo.webp`}
              alt=""
              className="logo_img"
            />
          </NavLink>
          <div className="search">
            <div class="form-group has-search">
              <span class="bx bx-search-alt-2 form-control-feedback"></span>
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Search for Food"
                onChange={searchHandel}
                value={search}
              />
            </div>
            {filterdata.length > 0 && (
              <div className="serach_item">
                {filterdata?.map((v, ind) => {
                  return (
                    <>
                      <a href={`/food/${v.food_id}`} className="searchitem">
                        <img src={v.image} alt="" />
                        <div>
                          <p>{v.title}</p>
                          <small>{v.name}</small>
                        </div>
                      </a>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="rightlink">
            <NavLink to="/cart" className="cart">
              <i class="bx bx-cart"></i> Cart
              <div>{cart.Totalitems ? cart.Totalitems : 0}</div>
            </NavLink>
            {isLogin ? (
              <>
                <div class="dropdown">
                  <button class="dropbtn">
                    {udet?.name && udet.name.slice(0, 5)}
                  </button>
                  <div class="dropdown-content">
                    <NavLink to="/orders">Orders</NavLink>
                    <NavLink to="/wishlist">Wishlist</NavLink>

                    <p className="log_out" onClick={() => setLogou(true)}>
                      Logout <i class="bx bx-log-out"></i>{' '}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="search_bar fixed-top">
        <div className="search_bar_box">
          <div class="form-group has-search">
            <span class="bx bx-search-alt-2 form-control-feedback"></span>
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Search for Food"
              onChange={searchHandel}
              value={search}
            />
          </div>
          {filterdata.length > 0 && (
            <div className="serach_item">
              {filterdata?.map((v, ind) => {
                return (
                  <>
                    <a href={`/food/${v.food_id}`} className="searchitem">
                      <img src={v.image} alt="" />
                      <div>
                        <p>{v.title}</p>
                        <small>{v.name}</small>
                      </div>
                    </a>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {logou && (
        <div className="model_box">
          <div className="inner_model">
            <div className="cross" onClick={() => setLogou(false)}>
              <i class="bx bx-x"></i>
            </div>
            <h5>Are You Sure About Logout?</h5>
            <button className="btn btn-dark" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

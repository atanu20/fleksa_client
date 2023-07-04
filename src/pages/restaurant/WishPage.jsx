import React, { useEffect } from 'react';
import WishListCard from '../../component/slider/WishListCard';
import Cookies from 'js-cookie';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WishPage = () => {
  const atokon = Cookies.get('_fleksa_access_user_tokon_');
  const [wishlist, setWishlist] = useState([]);
  const [preload, setPreLoad] = useState(false);

  const alert = useAlert();
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

  const getallwishlist = async () => {
    setPreLoad(true);
    const res = await axios.get(`${apilink}/api/v1/user/getallwishlist`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setWishlist(res.data.result);
    } else {
      alert.error(res.data.msg);
    }
    setTimeout(() => {
      setPreLoad(false);
    }, 3000);
  };

  useEffect(() => {
    getallwishlist();
  }, []);

  return (
    <>
      <div className="resturant">
        <div className="container-fluid">
          <div className="dd_flex">
            <h2>Your WishList</h2>
          </div>
          {preload ? (
            <>
              <div className="row">
                {Array(wishlist.length)
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
                                <Skeleton height={30} width="75%" />
                                <Skeleton height={25} width={100} />
                                <Skeleton height={25} width={50} />
                                <Skeleton height={25} />
                                <Skeleton height={25} />
                                <Skeleton height={40} />
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
              {wishlist.length > 0 ? (
                <>
                  <div className="row">
                    {wishlist.map((v) => {
                      return (
                        <>
                          <WishListCard wishdata={v} />
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-3">
                    <h3>No Item Found</h3>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WishPage;

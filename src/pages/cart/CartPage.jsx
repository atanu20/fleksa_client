import React from 'react';
import CartListCard from '../../component/slider/CartListCard';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';
import { useAlert } from 'react-alert';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(DataContext);
  const alert = useAlert();
  const [amount, setAmount] = useState('');
  const [preload, setPreLoad] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getCartDetails = async () => {
    setPreLoad(true);
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

    setTimeout(() => {
      setPreLoad(false);
    }, 3000);

    // console.log(res.data);

    // fetch(`${apilink}/api/v1/user/getCartDetails`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ids: Object.keys(cart.items) }),
    // })
    //   .then((res) => res.json())
    //   .then((products) => {
    //     console.log(products);
    //   });
  };

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.Totalitems -= qty;
    setCart(_cart);
    const updatedProductsList = products.filter(
      (product) => product.food_id !== productId
    );
    setProducts(updatedProductsList);
  };

  const increment = (productId) => {
    const existingQty = cart.items[productId];
    if (existingQty === 5) {
      alert.error('Quantity never be greater than 5');
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQty + 1;
    _cart.Totalitems += 1;
    setCart(_cart);
  };

  const decrement = (productId) => {
    const existingQty = cart.items[productId];
    if (existingQty === 1) {
      alert.error('Quantity never be less than 1');
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQty - 1;
    _cart.Totalitems -= 1;
    setCart(_cart);
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
  // console.log(amount);

  return (
    <>
      <div className="resturant">
        <div className="container-fluid">
          <div className="dd_flex">
            <h2>Your CartList</h2>
          </div>
          {products.length > 0 ? (
            <>
              <div className="row">
                {products.map((v) => {
                  return (
                    <>
                      <CartListCard
                        cartd={v}
                        handleDelete={handleDelete}
                        increment={increment}
                        decrement={decrement}
                        getQty={getQty}
                        getSum={getSum}
                      />
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
          {products.length > 0 && (
            <div className="text-right p-4">
              <h3>Price : {amount} </h3>
              <h3>Delivery Fees : {amount > 500 ? 0 : 50}</h3>
              <h3>Total Amount : {amount > 500 ? amount : amount + 50}</h3>
              <NavLink to="/cart_details" className="btn btn-primary">
                Continue
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;

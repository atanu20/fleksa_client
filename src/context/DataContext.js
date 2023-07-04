import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const getLocalItmes = () => {
  let list = localStorage.getItem('fleksa_cart');
  // console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('fleksa_cart'));
  } else {
    return {};
  }
};

export const ConText = (props) => {
  const [cart, setCart] = useState(getLocalItmes());
  useEffect(() => {
    localStorage.setItem('fleksa_cart', JSON.stringify(cart));
  }, [cart]);

  const addtocart = (id) => {
    let GlobalCart = { ...cart };
    if (!GlobalCart.items) {
      GlobalCart.items = {};
    }
    if (GlobalCart.items[id]) {
      GlobalCart.items[id] += 1;
    } else {
      GlobalCart.items[id] = 1;
    }
    if (!GlobalCart.Totalitems) {
      GlobalCart.Totalitems = 0;
    }
    GlobalCart.Totalitems += 1;

    setCart(GlobalCart);
  };
  const addtocartwithqty = (id, qty) => {
    let GlobalCart = { ...cart };
    if (!GlobalCart.items) {
      GlobalCart.items = {};
    }
    let qt = Number(qty);
    if (GlobalCart.items[id]) {
      GlobalCart.items[id] += qt;
    } else {
      GlobalCart.items[id] = qt;
    }
    if (!GlobalCart.Totalitems) {
      GlobalCart.Totalitems = 0;
    }
    GlobalCart.Totalitems += qt;

    setCart(GlobalCart);
  };
  return (
    <>
      <DataContext.Provider
        value={{ cart, setCart, addtocart, addtocartwithqty }}
      >
        {props.children}
      </DataContext.Provider>
    </>
  );
};

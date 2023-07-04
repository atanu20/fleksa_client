import React, { useEffect, useState } from 'react';
import 'swiper/swiper.min.css';
import { Switch, Route, Router } from 'react-router-dom';

import Error from './pages/Error';

import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import Restaurant from './pages/restaurant/Restaurant';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import WishPage from './pages/restaurant/WishPage';
import CartPage from './pages/cart/CartPage';
import ItemDet from './pages/restaurant/ItemDet';
import CartDetails from './pages/cart/CartDetails';
import Order from './pages/account/Order';
import OrderDetails from './pages/account/OrderDetails';
import RestaurantDet from './pages/restaurant/RestaurantDet';
import { ConText } from './context/DataContext';
import Success from './pages/Success';

const App = () => {
  return (
    <>
      <ConText>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants" component={Restaurant} />
          <Route
            exact
            path="/restaurants/:resid"
            component={RestaurantDet}
          />{' '}
          //have to work
          <Route exact path="/foodtype/:food" component={Restaurant} />
          <Route exact path="/wishlist" component={WishPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/cart_details" component={CartDetails} />
          <Route exact path="/orders" component={Order} />
          <Route exact path="/orders/:orderid" component={OrderDetails} />
          <Route exact path="/food/:foodid" component={ItemDet} />
          <Route exact path="/restaurants/:resid" component={ItemDet} />
          <Route exact path="/success" component={Success} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </ConText>
    </>
  );
};

export default App;

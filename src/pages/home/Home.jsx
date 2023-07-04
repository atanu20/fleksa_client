import React from 'react';
import './Home.css';
import CategorySlider from '../../component/slider/CategorySlider';
import TopRate from '../../component/slider/TopRate';
import CardList from '../../component/slider/CardList';
import { useEffect } from 'react';
import axios from 'axios';
import { apilink } from '../../data/fdata';
import { useState } from 'react';

const Home = () => {
  const [allfoods, setAllFoods] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [preload, setPreLoad] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getAllFoods = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getAllFoods`);
    if (res.data.success) {
      setAllFoods(res.data.result);
    }
  };

  const getFavRestaurants = async () => {
    const res = await axios.get(`${apilink}/api/v1/user/getFavRestaurants`);
    if (res.data.success) {
      setAllRestaurants(res.data.result);
    }
  };

  useEffect(() => {
    setPreLoad(true);
    getAllFoods();
    getFavRestaurants();
    setTimeout(() => {
      setPreLoad(false);
    }, 3000);
  }, []);
  return (
    <>
      <div className="home">
        <CategorySlider />
        <TopRate text="Top Rated Dishs" link="movie" list={allfoods} />
        <CardList allRestaurants={allRestaurants} preload={preload} />
      </div>
    </>
  );
};

export default Home;

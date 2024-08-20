import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";



const HomePage = () => {

  

  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard/>
      <Track/>
      <Testimonial/>
      {/* <Loader/> */}
    </Layout>

  );
};

export default HomePage;

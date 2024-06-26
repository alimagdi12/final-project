import React, { useContext, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { GradientCircularProgress } from "../../components/loader/Loader.jsx";
import LoaderContext from "../../contexts/LoaderContext.jsx";
import Hero from "./components/Hero.jsx";
import Slider from "./components/Slider.jsx";
import CategoriesSection from "./components/CategoriesSection.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import bgImage from "../../../public/8038874_25098.jpg";
import "./Home.css";
import ProductsContext from "../../contexts/ProductsContext.jsx";
import CategoryContext from "../../contexts/CategoriesContext.jsx";

const datas = {
  strawberry:
    "The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)",
  banana:
    "A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.",
  apple:
    "The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.",
  orange:
    "The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.",
};

const Home = () => {
  const { setLoader } = useContext(LoaderContext);
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    setLoader(false);
  }, []);

  if (!products || !products.products || !categories.categories) {
    return (
      <Container>
        <GradientCircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Hero />
      <div
        
        className="Home"
        style={{
        
          paddingBottom: "30px",
          paddingTop: "1px",
          backgroundImage: `url(${bgImage})`,
          zIndex: "-1",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >

        <Slider />

        <CategoriesSection />
        
        <Box
          sx={{
            marginTop: "15px",
            display: {
              xs: "none",
              xl: "flex",
            },
          }}
        >
          <div id="scene" style={{ position: "relative" }}>
            <div id="left-zone">
              <ul className="list">
                {Object.entries(datas).map(([index, val], i) => (
                  <li key={index} className="item">
                    <input
                      type="radio"
                      id={"radio_" + index}
                      name="basic_carousel"
                      value={index}
                      defaultChecked={index === "strawberry"}
                    />
                    <label
                      htmlFor={"radio_" + index}
                      className={"label_" + index}
                    >
                      {index}
                    </label>
                    <div className={"content content_" + index}>
                      <span className="picto"></span>
                      <h1>{index}</h1>
                      <p>{val}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div id="middle-border"></div>
            <div id="right-zone"></div>
          </div>
        </Box>
        
        <ProductsSection />
      </div>
    </>
  );
};

export default Home;

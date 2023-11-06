import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ProductBar from "./ProductBar";
import Products from "./Products";

const Home = () => {
  const [category, setCategory] = useState("");
  return (
    <Box minH={"100vh"} bgColor={"rgb(241, 242, 244)"}>
      <ProductBar setCategory={setCategory} category={category} />
      <Products category={category} />
    </Box>
  );
};

export default Home;

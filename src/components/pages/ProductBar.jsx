import { Grid, HStack, Heading, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { productbar } from "../../hocs/constants";

const ProductBar = ({ setCategory, category }) => {
  const categoriesHandler = (name) => {
    setCategory(name);
    console.log(category);
  };
  return (
    <HStack
      p={["10px 3%"]}
      bgColor={"white"}
      m={["10px 2%"]}
      justifyContent={"space-between"}
      overflowX={"scroll"}
      style={{
        scrollbarWidth: "5px",
      }}
    >
      {productbar.map((item, index) => (
        <ProductBox
          key={index}
          imgsrc={item.imgsrc}
          name={item.name}
          categoriesHandler={categoriesHandler}
        />
      ))}
    </HStack>
  );
};

export default ProductBar;

function ProductBox({ imgsrc, name, categoriesHandler }) {
  return (
    <VStack
      // border={"2px solid black"}
      minWidth={["180px", "180px", "180px", "auto"]}
      p={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={() => categoriesHandler(name)}
    >
      <Image src={imgsrc} />
      <Heading size={"md"} fontWeight={"600"}>
        {name}
      </Heading>
    </VStack>
  );
}

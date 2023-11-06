import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  getAllProducts,
} from "../../redux/actions/productAction";

import { Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import { loadUser } from "../../redux/actions/userAction";

const Products = ({ category }) => {
  const { products, resultPerPage, productsCount } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  // console.log(category);

  const [currentPage, setcurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const [price, setPrice] = useState(0); // Initial value

  const handleSliderChange = (event, newPrice) => {
    setPrice(newPrice);
    setPrice(event.target.value);
  };

  // const keyword = match.params.keyword;
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getAllProducts(keyword, currentPage, category, price));
  }, [dispatch, keyword, currentPage, category, price]);
  // console.log(products);

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProducts(id));
    dispatch(loadUser());
  };

  return (
    <VStack width={"full"} p={["10px 2%"]}>
      {/* <HStack>
        <label
          style={{ marginRight: "10px", fontSize: "18px", fontWeight: "600" }}
          htmlFor="slider"
        >
          Filter By Price
        </label>
        <input
          style={{ width: "250px" }}
          type="range"
          id="slider"
          name="slider"
          min="0"
          max="200000"
          step="1"
          value={price}
          onChange={handleSliderChange}
        />
        <output>{price}</output>
      </HStack> */}
      <VStack>
        <Grid
          p={["10px 3%"]}
          bgColor={"white"}
          m={["10px 2%"]}
          width={"full"}
          templateColumns={[
            ,
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(5,1fr)",
          ]}
          gap={"3"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {products ? (
            products.map((item) => (
              <ProductCard
                title={item.title}
                imgsrc={item.image.url}
                price={item.price}
                description={item.description}
                category={item.category}
                tags={item.tags}
                id={item._id}
                key={item._id}
                deleteProductHandler={deleteProductHandler}
              />
            ))
          ) : (
            <Heading>No Product Found</Heading>
          )}
        </Grid>
      </VStack>

      <HStack justifyContent={"center"}>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"1st"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </HStack>
    </VStack>
  );
};

export default Products;

function ProductCard({
  deleteProductHandler,

  title,
  imgsrc,
  price,
  description,
  category,
  tags,
  id,
}) {
  return (
    <Card maxW="sm" boxShadow={"lg"} border={"1px solid gray"}>
      <CardBody>
        <VStack>
          <Image
            height={"180px"}
            width={"180px"}
            src={imgsrc}
            alt={id}
            borderRadius="lg"
            objectFit={"contain"}
            // border={"2px solid black"}
          />
        </VStack>

        <Stack mt="6" spacing="1">
          <Heading size="md">{title}</Heading>

          <Text color="blue.600" fontSize="lg" fontWeight={"bold"}>
            Price - {price}
          </Text>
          <Text fontWeight={"500"}>Description -{description}</Text>
          <Text fontWeight={"500"}>Category -{category}</Text>
          <Text fontWeight={"500"}>Tags -{tags}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup
          spacing="2"
          width={"full"}
          // border={"2px solid black"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link to={`/update/${id}`}>
            <Button variant="solid" colorScheme="blue">
              Update
            </Button>
          </Link>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => deleteProductHandler(id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

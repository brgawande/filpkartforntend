import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Toast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  updateProduct,
  updateProductPic,
  uploadProducts,
} from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { server } from "../../redux/store";

const Update = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setcategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  useEffect(() => {
    const id = params.id;
    const fetchproduct = async () => {
      try {
        const response = await fetch(`${server}/getproduct/${id}`);
        if (!response.ok) {
          throw new Error("Network Response was not Okay");
        }

        const data = await response.json();
        // console.log(data);
        setTitle(data.product.title);
        setPrice(data.product.price);
        setDescription(data.product.description);
        setTags(data.product.tags);
        setcategory(data.product.category);
        setImagePrev(data.product.image.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchproduct();
  }, []);

  const changeImagehandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(file);
      setImagePrev(reader.result);
    };
  };

  const id = params.id;

  const submitDetailsHandler = async (
    e,
    title,
    price,
    description,
    tags,
    category
  ) => {
    e.preventDefault();

    await dispatch(
      updateProduct(id, title, price, description, tags, category)
    );
  };

  const submitPicHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProductPic(id, myForm));
  };
  return (
    <VStack>
      <Box
        w={["95%", "75%", "75%", "55%"]}
        border={"1px solid gray"}
        p={"10px"}
        mt={"20px"}
        boxShadow={"lg"}
      >
        <Heading my={"4"} textAlign={"center"}>
          Update Products
        </Heading>
        <HStack>
          <Box flex={"1 1 200px"} h={"100%"}>
            <form onSubmit={(e) => submitPicHandler(e, image)}>
              <VStack my={"4"}>
                {imagePrev && (
                  <Image
                    height={"200px"}
                    width={"200px"}
                    objectFit={"contain"}
                    src={imagePrev}
                  />
                )}

                <label
                  htmlFor="image"
                  style={{
                    border: "1px solid blue",
                    padding: "10px 15px",
                    margin: "10px 0",
                  }}
                >
                  Choose Product Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  display={"none"}
                  id="image"
                  onChange={changeImagehandler}
                />
                <VStack my={"4"}>
                  <Button colorScheme="messenger" type="submit">
                    Update Product Pic
                  </Button>
                </VStack>
              </VStack>
            </form>
          </Box>
          <Box flex={"1 1 200px"}>
            <form
              onSubmit={(e) =>
                submitDetailsHandler(
                  e,
                  title,
                  price,
                  description,
                  tags,
                  category
                )
              }
            >
              <HStack
                // border={"2px solid black"}
                flexWrap={["wrap", "none"]}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                p={"20px"}
              >
                <Box flex={"1 1 200px"}>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="price"
                      placeholder={"Enter Product Price"}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="description"
                      placeholder={"Enter Product Description"}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="tags"
                      placeholder={"Enter Product Tags"}
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Select
                      placeholder={"Enter Product category"}
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      <option value="Mobiles">Mobiles</option>
                      <option value="Electronics">Electronics </option>
                      <option value="Tv & Appliances">Tv & Appliances </option>
                      <option value="Fashion">Fashion </option>
                      <option value="Beauty">Beauty </option>
                      <option value="Home & Kitchens">Home & Kitchens </option>
                      <option value="Furniture">Furniture </option>
                      <option value="Flights">Flights </option>
                      <option value="Grocery">Grocery </option>
                    </Select>
                    {/* <Input
                      type="text"
                      id="category"
                      placeholder="Enter  Product Category"
                    /> */}
                  </Box>
                </Box>
              </HStack>

              <VStack my={"4"}>
                <Button colorScheme="messenger" type="submit">
                  Update Product Details
                </Button>
              </VStack>
            </form>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Update;

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
  uploadProducts,
  updateProduct,
} from "../../redux/actions/productAction";
import toast from "react-hot-toast";
import Loader from "../layouts/Loader";

const UploadProducts = () => {
  const { loading, message, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setcategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImagehandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(file);
      setImagePrev(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("tags", tags);
    myForm.append("category", category);
    myForm.append("file", image);

    await dispatch(uploadProducts(myForm));
    setName("");
    setPrice("");
    setDescription("");
    setTags("");
    setcategory("");
    setImage("");
    setImagePrev("");

    // toast.success("Product Uploaded Successfuuly");
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch({ type: "clearError" });
  //   }
  //   if (message) {
  //     toast.success(message);
  //     dispatch({ type: "clearMessage" });
  //   }
  // }, [dispatch, error, message]);
  return (
    // get the current id of post
    <>
      {loading ? (
        <Loader />
      ) : (
        <VStack>
          <Box
            w={["95%", "75%", "75%", "55%"]}
            border={"1px solid gray"}
            p={"10px"}
            mt={"20px"}
            boxShadow={"lg"}
          >
            <Heading my={"4"} textAlign={"center"}>
              Upload Products
            </Heading>
            <form onSubmit={submitHandler}>
              <HStack
                // border={"2px solid black"}
                flexWrap={["wrap", "none"]}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                p={"20px"}
              >
                <Box flex={"1 1 200px"}>
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
                      style={{ border: "1px solid blue", padding: "10px 15px" }}
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
                  </VStack>
                </Box>

                <Box flex={"1 1 200px"}>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="price"
                      placeholder="Enter Product Price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="description"
                      placeholder="Enter Product Description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Input
                      type="text"
                      id="tags"
                      placeholder="Enter Minimum 2 Tags"
                      required
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Box>
                  <Box my={"4"}>
                    <Select
                      placeholder="Select Product Category"
                      required
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
                  Upload Product
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default UploadProducts;

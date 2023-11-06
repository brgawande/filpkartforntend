import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/getallproducts/${keyword}`);
    } else {
      navigate("/getallproducts");
    }
  };
  return (
    <VStack width={"100%"}>
      <form style={{ width: "100%" }} onSubmit={searchSubmitHandler}>
        <HStack
          justifyContent={"center"}
          width={"100%"}
          // border={"2px solid black"}
          position={"relative"}
        >
          <Input
            width={["100%"]}
            type="text"
            required
            placeholder="Search Product With Titles and Tags"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button position={"absolute"} zIndex={1000} right={0} type="submit">
            <SearchIcon />
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default Search;

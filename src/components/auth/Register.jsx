import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/userAction.js";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <VStack mt={"20px"}>
      <Heading my={"2"}>Register Form</Heading>
      <form onSubmit={submitHandler}>
        <Box my={"4"}>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box my={"4"}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box my={"4"}>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box my={"4"}>
          <Button type="submit">Register</Button>
        </Box>
        <Box my={"4"}>
          <Heading size={"md"}>Already Registered</Heading>
          <Link to={"/login"}>Login Here</Link>
        </Box>
      </form>
    </VStack>
  );
};

export default Register;

import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    dispatch(login(email, password));
  };
  return (
    <VStack mt={"20px"}>
      <Heading my={"2"}>Login Form</Heading>
      <form onSubmit={submitHandler}>
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
          <Button type="submit">LogIn</Button>
        </Box>
        <Box my={"4"}>
          <Heading size={"md"}>Not Yet Registered</Heading>
          <Link to={"/register"}>Register Here</Link>
        </Box>
      </form>
    </VStack>
  );
};

export default Login;

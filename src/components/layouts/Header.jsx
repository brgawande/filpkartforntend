import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import Search from "../pages/Search";

const Header = ({ isAuthenticated = false, user }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <HStack
      // border={"2px solid black"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={["0px 1%", "0px 3%"]}
      spacing={"30px"}
      boxShadow={"lg"}
    >
      <VStack
        height={"80px"}
        width={["150px", "200px"]}
        alignItems={"center"}
        justifyContent={"center"}
        objectFit={"cover"}
      >
        <Link to={"/"}>
          <Image
            objectFit={"cover"}
            src="https://cdn.worldvectorlogo.com/logos/flipkart.svg"
          />
        </Link>
      </VStack>
      <Search />

      <Box display={["none", "none", "flex", "flex"]} gap={"3"}>
        <Link to={"/upload"}>
          <Button>
            <StorefrontIcon style={{ marginRight: "10px" }} />
            Upload Products
          </Button>
        </Link>
        {user && (
          <Button textTransform={"capitalize"}>
            <AccountCircleOutlinedIcon style={{ marginRight: "10px" }} />
            {user.name}
          </Button>
        )}
        {isAuthenticated ? (
          <Button onClick={logoutHandler}>
            <LogoutIcon style={{ marginRight: "10px" }} />
            LogOut
          </Button>
        ) : (
          <Link to={"/login"}>
            <Button>
              <AccountCircleOutlinedIcon style={{ marginRight: "10px" }} />
              LogIn
            </Button>
          </Link>
        )}
      </Box>
      <Button onClick={onOpen} display={["flex", "flex", "none", "none"]}>
        <MenuOutlinedIcon />
      </Button>
      <SideBar
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        isAuthenticated={isAuthenticated}
        logoutHandler={logoutHandler}
      />
    </HStack>
  );
};

export default Header;

function SideBar({ isOpen, onClose, user, isAuthenticated, logoutHandler }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <VStack alignItems={"center"} spacing={"3"}>
              <Link to={"/upload"}>
                <Button>
                  <StorefrontIcon style={{ marginRight: "10px" }} />
                  Upload Products
                </Button>
              </Link>
              {user && (
                <Button textTransform={"capitalize"}>
                  <AccountCircleOutlinedIcon style={{ marginRight: "10px" }} />
                  {user.name}
                </Button>
              )}
              {isAuthenticated ? (
                <Button onClick={logoutHandler}>
                  <LogoutIcon style={{ marginRight: "10px" }} />
                  LogOut
                </Button>
              ) : (
                <Link to={"/login"}>
                  <Button>
                    <AccountCircleOutlinedIcon
                      style={{ marginRight: "10px" }}
                    />
                    LogIn
                  </Button>
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

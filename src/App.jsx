import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";
import toast, { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import UploadProducts from "./components/pages/UploadProducts";
import Register from "./components/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./components/layouts/Loader";
import { loadUser } from "./redux/actions/userAction.js";
import Update from "./components/pages/Update";
import Search from "./components/pages/Search";
import Products from "./components/pages/Products";
import { ProtectedRoute } from "protected-route-react";

function App() {
  const { loading, isAuthenticated, user, message, error } = useSelector(
    (state) => state.user
  );
  const { error: productError, message: productMessage } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);
  useEffect(() => {
    if (productError) {
      toast.error(productError);
      dispatch({ type: "clearError" });
    }
    if (productMessage) {
      toast.success(productMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, productMessage, productError]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Update />
                </ProtectedRoute>
              }
            />

            <Route
              path="/upload"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UploadProducts />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/getallproducts" element={<Products />} />
            <Route path="/getallproducts/:keyword" element={<Products />} />
          </Routes>
          <Toaster />
        </Router>
      )}
    </>
  );
}

export default App;

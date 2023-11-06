import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  { products: [], product: [] },
  {
    getAllProductRequest: (state) => {
      state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    getAllProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    uploadProductsRequest: (state) => {
      state.loading = true;
    },
    uploadProductsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    uploadProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getProductRequest: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    getProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductPicRequest: (state) => {
      state.loading = true;
    },
    updateProductPicSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProductPicFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state;
    },
  }
);

import axios from "axios";
import { server } from "../store.js";

export const getAllProducts =
  (keyword = "", currentPage = 1, category, price = [0, 200000]) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductRequest" });

      // const link = `${server}/getallproducts?keyword=${keyword}&page=${currentPage}&category=${category}`;
      let link = `${server}/getallproducts?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `${server}/getallproducts?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      if (price) {
        link = `${server}/getallproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      const { data } = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({ type: "getAllProductSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "getAllProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const { data } = await axios.delete(`${server}/deleteproduct/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "deleteProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};

export const uploadProducts = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "uploadProductsRequest" });
    const { data } = await axios.post(`${server}/uploadproduct`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: "uploadProductsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "uploadProductsFail",
      payload: error.response.data.message,
    });
  }
};

// export const getProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: "getProductRequest" });
//     const { data } = await axios.get(`${server}/getproduct/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // withCredentials: true,
//     });
//     dispatch({ type: "getProductSuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "getProductFail",
//       payload: error.response.data.message,
//     });
//   }
// };

export const updateProductPic = (id, formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductPicRequest" });
    const { data } = await axios.put(
      `${server}/updateproductpic/${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "updateProductPicSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProductPicFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  (id, title, price, description, tags, category) => async (dispatch) => {
    try {
      dispatch({ type: "updateProductRequest" });
      const { data } = await axios.put(
        `${server}/updateproduct/${id}`,
        {
          title,
          price,
          description,
          tags,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateProductSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

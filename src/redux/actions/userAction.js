import axios from "axios";
import { server } from "../store.js";

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(
      `${server}/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get(`${server}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

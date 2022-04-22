import axios from "axios";
import { URL_BACK } from "../helpers/constant";

const createSell = async (data, token) =>
  axios
    .post(`${URL_BACK}/createSell`, data, { headers: { 'Authorization': token } })
    .then((res) => res)
    .catch((error) => {
      if (!error.response) {
        return false;
      }
      return error.response.data;
  });

const getUserSells = async (id, token) =>
  axios
    .get(`${URL_BACK}/getUserSells/${id}`, { headers: { 'Authorization': token } })
    .then((res) => res.data)
    .catch((error) => {
      if (!error.response) {
        return false;
      }
      return error.response.data;
  });

export { createSell, getUserSells };

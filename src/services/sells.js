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

export { createSell };

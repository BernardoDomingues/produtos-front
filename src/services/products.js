import axios from "axios";
import { URL_BACK } from "../helpers/constant";

const listproducts = (pagination) =>
  axios
    .get(`${URL_BACK}/listProducts/${pagination}`)
    .then((res) => res.data.products)
    .catch((error) => {
      if (!error.response) {
        return false;
      }
      return error.response.data;
  });
export { listproducts };

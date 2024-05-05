import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BEARER_TOKEN } from "./entities/contant";

export const isTokenValid = () => {
  const token = Cookies.get(BEARER_TOKEN);

  if (token) {
    return true;
  }

  return false;
};

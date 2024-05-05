import Cookies from "js-cookie";
import { BEARER_TOKEN, USER_TOKEN } from "../core/entities/contant";
import { Margin, Resolution } from "react-to-pdf";
import { User } from "../core/entities/user";
import { DateTime } from "luxon";

export const currentUserFromCookies = (): User | null => {
  const userToken = Cookies.get(USER_TOKEN);
  const user = userToken ? (JSON.parse(userToken) as User) : null;
  return user;
};

export const removeUserFromCookies = () => {
  Cookies.remove(BEARER_TOKEN);
  Cookies.remove(USER_TOKEN);
};

export const options = {
  // default is `save`
  method: "open",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

export const formatDate = (param: string) => {
  const parsedDate = DateTime.fromISO(param);
  return parsedDate.toFormat("dd, MMMM yyyy");
};

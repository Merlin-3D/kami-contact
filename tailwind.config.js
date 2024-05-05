const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amaranth : 'Amaranth'
      },
      backgroundImage: {
        "all-background": "url(../public/assets/images/background-app.png)"
      },
      width: {
        "100vw-w-4": "calc(100vw - 75px)",
        "100vw-w-5": "calc(100vw - 99px)",
        "100vw-w-6": "calc(100vw - 175px)",
        "100vw-w-7": "calc(100vw - 319px)",
      },
      height: {
        "100vh-h-7": "calc(100vh - 108px)",
      },
      colors: {
        primary: {
          100: "#008000",
          90: "#94A3B8",
          80: "#0F172A",
          70: "#FAFBFC",
          80: "#25293B",
        },
        other: {
          0: "#E4CCFF",
          10: "#6F5191",
          20: "#F4AEFF",
          30: "#E544FF",
          40: "#FFDDA9",
          50: "#CD923A",
          60: "#CF972C",
          70: "#FFFFFF",
          80: "#64748B",
          90: "#53668E",
          100: "#2F394E"
        }
      }
    },
  },
  plugins: [],
});


import React from "react";
import { useNavigate } from "react-router-dom";
import { TitleApp } from "../components";
import { Spinner } from "@material-tailwind/react";

export default function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate("/auth");
    }, 2000);
  });

  return (
    <div className="flex justify-center items-center gap-x-2 h-full w-full">
      <Spinner className="h-10 w-10 text-white" color="green" />
      <span className="text-4xl font-semibold text-primary-80">Loading...</span>
    </div>
  );
}

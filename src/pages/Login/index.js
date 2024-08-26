import React from "react";
import Form from "../../components/Form";
import bgImage from "../../img/background.jpg";

export default function Login() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 sm:container sm:mx-auto px-20">
        <img
          src={bgImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
        />
        <Form />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg " />
      </div>
    </div>
  );
}

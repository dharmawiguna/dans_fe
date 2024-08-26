import React from "react";
import { Container } from "../Container";
import ilImg from "../../img/illustration.png";

export default function Header() {
  return (
    <Container className="flex flex-wrap ">
      <div className="flex items-center w-full lg:w-1/2">
        <div className="max-w-2xl mb-8">
          <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-500 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
            Empowering Your Career Journey.
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            Discover endless job opportunities tailored to your skills and
            aspirations, and take the next step in your career with confidence.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="">
          <img
            src={ilImg}
            className={"object-cover w-full"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
    </Container>
  );
}

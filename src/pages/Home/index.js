import React, { useEffect, useState } from "react";
import Login from "../Login";
import Landing from "../Landing";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken === null || getToken === undefined || getToken === "") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [getToken]);
  return (
    <div>
      {isLogin ? (
        <div>
          <Landing />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}

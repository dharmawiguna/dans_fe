import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo-dharma-dans.png";
import { LoginSocialFacebook } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { jwtDecode } from "jwt-decode";

export default function Form() {
  const navigate = useNavigate();
  const onSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const credentials = jwtDecode(credentialResponse.credential);
      const user = {
        email: credentials.email,
        name: credentials.name,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", credentialResponse.credential);
      navigate("/");
    }
  };

  const onError = () => {
    console.log("Login failed");
  };

  const handleFacebookLogin = (response) => {
    if (response) {
      const user = {
        email: response?.data?.email,
        name: response?.data?.name,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.accessToken);
      navigate("/");
    } else {
      console.log("Login Failed");
    }
  };

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const appId = process.env.REACT_APP_APP_FACEBOOK_ID;

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 shadow-2xl">
      <div className="flex items-center justify-center mb-3">
        <img src={logo} alt="logo" width={200} />
      </div>
      <h1 className="text-5xl font-semibold mb-5 text-gray-600">
        Welcome Back!
      </h1>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full flex justify-center">
          <GoogleLoginButton>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              prompt="consent"
              useOneTap={false}
            />
          </GoogleLoginButton>
        </div>
      </GoogleOAuthProvider>
      <div>
        <LoginSocialFacebook
          appId={appId}
          onResolve={handleFacebookLogin}
          onReject={(reject) => {
            console.log(reject);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import axiosInstance from "../../shared/configs/axiosConfig";

const GoogleLogin = () => {
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = initializeGoogleLogin;
    };

    const initializeGoogleLogin = () => {
      window.google.accounts.id.initialize({
        client_id:
          "1012046961164-u1uqo6oc23757f9ghab98ce0dnlok834.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    };

    loadGoogleScript();
  }, []);

  const handleGoogleSignIn = async (response) => {
    try {
      const { data: res } = await axiosInstance.post("/google", {
        token: response.credential,
      });

      console.log(res);
      if (res.isSuccess === true) {
        localStorage.setItem("jwtToken", res.token);
        const basicInfo = {
          fullName: res.member.fullName,
          email: res.member.email,
          phone: res.member.phone,
          role: res.member.role,
          nationalID: res.member.nationalID,
          street: res.member.street,
          birthDay: res.member.birthDay,
        };
        localStorage.setItem("userData", JSON.stringify(basicInfo));
        if (res.member.role === "CUSTOMER") {
          window.location.href = "/homecustomer";
        } else if (res.member.role === "OWNER") {
          window.location.href = "/homeowner";
        }
      } else {
        console.error("Google sign-in failed");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleLogin;

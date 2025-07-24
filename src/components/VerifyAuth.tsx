import { useEffect, useState } from "react";
import { verifySignIn } from "../utils/AuthServices";
import { useParams } from "react-router-dom";
import {useCookies} from "react-cookie"

const VerifyAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [message, setMessage] = useState("Verifying email. Please wait.");
  const { verification_string } = useParams();
  useEffect(() => {
    verifySignIn(verification_string).then((res) => {
      if (res) {
        setCookie("user", {
          verified : true,
        })
        window.location.href = "/vote";
      } else {
        setMessage("An error occurred. Please try again.");
      }
    });
  });

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyAuth;

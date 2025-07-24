import type React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import sendRequest from "../utils/requests";

const Vote: React.FC = () => {
  interface Contestants {
    headboy: object[];
    headgirl: object[];
    sportsboy: object[];
    sportsgirl: object[];
    dheadboy: object[];
    dheadgirl: object[];
    dsportsboy: object[];
    dsportsgirl: object[];
  }
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [contestants, setContestants] = useState<Contestants>()
  const [currentPos, setCurrentPos] = useState("Head Boy");

  useEffect(() => {
    if (!cookies.user.verified) {
        window.alert("Please verify your email first.")
        window.location.href = "/auth"
        return
    }
    sendRequest("get", "/contestants", undefined).then((res) => {
      setContestants(res.contestants)
    })
  }, [])

  return <div></div>;
};

export default Vote;

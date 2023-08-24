import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AuthWrapper({ children }) {
  const { isloading, error, user } = useAuth0();
  console.log(user);

  if (isloading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="loading-gif" />;
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;

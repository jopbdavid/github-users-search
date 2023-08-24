import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout, isAuthenticated, loginWithRedirect, user, isLoading } =
    useAuth0();

  return (
    <Wrapper>
      {isAuthenticated && user && user.picture && (
        <img src={user.picture} alt={user.name} />
      )}
      {isAuthenticated && user && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>{" "}
        </h4>
      )}
      {isAuthenticated && user ? (
        <button
          className="btn"
          onClick={() =>
            logout({
              logoutParams: { returnTo: "http://localhost:3000/login" },
            })
          }
        >
          Logout
        </button>
      ) : (
        <button className="btn" onClick={() => loginWithRedirect()}>
          {" "}
          Log In
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;

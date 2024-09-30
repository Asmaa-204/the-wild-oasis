import React, { useEffect } from "react";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;

  background-color: var(--color-grey-50);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) navigate("/login");
  }, [isPending, isAuthenticated]);

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  if (isAuthenticated) return children;
}

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import ToggleDarkMode from "./ToggleDarkMode";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <ToggleDarkMode />
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
      <Logout />
    </StyledHeaderMenu>
  );
}

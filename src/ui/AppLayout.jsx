import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import Header from "./Header";

const StylesAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  /* grid-template-columns: 0 1fr; */
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;
`;

export default function AppLayout() {
  return (
    <StylesAppLayout>
      <SideBar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StylesAppLayout>
  );
}

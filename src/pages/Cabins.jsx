import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CabinForm from "../features/cabins/CabinForm";

function Cabins() {
  const [showCabin, setShowCabin] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowCabin((state) => !state)}>
          Add new cabin
        </Button>
        {showCabin && <CabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

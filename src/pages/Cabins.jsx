import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/getCabins";

function Cabins() {
  useEffect(() => {
    async function fetchCabins() {
      const data = await getCabins();
      console.log(data);
    }
    fetchCabins();
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;

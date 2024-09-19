import { useQuery } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { getCabins } from "../../services/apiCabins";

export default function CabinTable() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

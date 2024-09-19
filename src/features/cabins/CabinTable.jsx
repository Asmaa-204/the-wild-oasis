import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const filterBy = searchParams?.get("discount") || "all";

  console.log(filterBy);

  if (isPending) return <Spinner />;

  let filteredCabins;

  if (filterBy === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filterBy === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterBy === "all") filteredCabins = cabins;

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const multiplier = direction === "asc" ? 1 : -1;
  filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * multiplier
  );
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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

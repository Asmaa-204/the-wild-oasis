import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useStays } from "./useStays";
import { useBookings } from "./useBookings";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { stays, isLoadingStays, numNights } = useStays();
  const { bookings, isLoadingBookings } = useBookings();
  const { cabins, isPending } = useCabins();

  if (isLoadingBookings || isLoadingStays || isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={stays}
        numCabins={cabins.length}
        numNights={numNights}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

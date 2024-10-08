import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useStays } from "./useStays";
import { useBookings } from "./useBookings";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { confirmedStays, isLoadingStays, numNights } = useStays();
  const { bookings, isLoadingBookings } = useBookings();
  const { cabins, isPending } = useCabins();

  if (isLoadingBookings || isLoadingStays || isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={confirmedStays}
        numCabins={cabins.length}
        numNights={numNights}
      />
      <TodayActivity />
      <DurationChart stays={confirmedStays} />
      <SalesChart bookings={bookings} numNights={numNights} />
    </StyledDashboardLayout>
  );
}

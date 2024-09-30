import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const numnights = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numnights).toISOString();

  const { data: bookings, isPending: isLoadingBookings } = useQuery({
    queryKey: ["bookings", `last-${numnights}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isLoadingBookings };
}

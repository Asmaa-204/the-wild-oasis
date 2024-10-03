import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useStays() {
  const [searchParams] = useSearchParams();
  const numNights = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numNights).toISOString();

  const { data: stays, isPending: isLoadingStays } = useQuery({
    queryKey: ["stays", `last-${numNights}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { confirmedStays, numNights, isLoadingStays };
}

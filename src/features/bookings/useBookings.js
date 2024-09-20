import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  const filter =
    !status || status === "all"
      ? null
      : { method: "eq", field: "status", value: status };

  const sortByData = searchParams.get("sortBy") || "startDate-asc";
  const [value, direction] = sortByData.split("-");
  const sortBy = { value, direction };

  const { data: bookings, isPending: isLoadingBookings } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoadingBookings };
}

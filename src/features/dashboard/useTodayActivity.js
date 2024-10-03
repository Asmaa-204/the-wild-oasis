import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isPending: isLoadingActivity } = useQuery({
    queryKey: ["today's-activity"],
    queryFn: getStaysTodayActivity,
  });
    
  return { activities, isLoadingActivity };
}

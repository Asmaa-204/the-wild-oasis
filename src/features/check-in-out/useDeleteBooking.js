import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking is successfully deleted`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeletingBooking, mutate };
}

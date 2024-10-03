import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("cabin is deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });

  return { isDeleting, mutate };
}

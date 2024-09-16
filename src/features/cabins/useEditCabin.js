import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isEditing } = useMutation({
    mutationFn: ({ updatedCabin, id }) => editCabin(updatedCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin edited successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { mutate, isEditing };
}

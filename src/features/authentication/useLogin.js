import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { login, isLogingIn };
}

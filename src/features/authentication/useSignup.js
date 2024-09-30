import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Successfully signed up. check the email to verify the accout"
      );
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { signup, isPending };
}

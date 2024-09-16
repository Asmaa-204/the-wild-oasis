import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CabinForm({ cabin }) {
  const { isCreating, mutate: createCabin } = useCreateCabin();
  const { isEditing, mutate: editCabin } = useEditCabin();

  const { id, ...editValues } = cabin || {};
  const isEditSession = Boolean(id);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  function onSubmit(data) {
    if (isEditSession) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      editCabin(
        { updatedCabin: { ...data, image }, id },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Can't be empty, make it at least 1",
            min: { value: 1, message: "Capacity can't be less than 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 2, message: "Price can't be less than 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating || isEditing}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreating || isEditing}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Create cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;

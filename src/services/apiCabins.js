import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Error getting cabins");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Error deleting cabin ${id}`);
  }
}

export async function createCabin(newCabin) {
  const hasImgPath = newCabin?.image?.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const image = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Error creating cabin`);
  }

  console.log(data);
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Error uploading cabin image. No cabin is created");
  }

  return data;
}

export async function editCabin(updatedCabin, id) {
  console.log(updatedCabin);
  const imgUploaded = typeof updatedCabin?.image === "string";
  const imageName = `${Math.random()}-${updatedCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );
  const image = imgUploaded
    ? updatedCabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedCabin, image })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Error editing cabin`);
  }

  if (!imgUploaded) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, updatedCabin?.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Error uploading cabin image. No cabin is Edited");
    }
  }

  return data;
}

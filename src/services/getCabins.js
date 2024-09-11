import supabase from "./supabase";

async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Error getting cabins");
  }
  return data;
}

export default getCabins
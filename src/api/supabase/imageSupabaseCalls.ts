import { supabase } from "./supabase";

/** Deletes one images row. Returns true when exactly one row went. */
export const deleteImageRecord = async (id: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('images')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('deleteImageRecord failed:', error);
    return false;
  }
  return (data?.length ?? 0) === 1;
};

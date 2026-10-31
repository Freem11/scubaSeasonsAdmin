import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";
import { supabase } from "../supabase";

export const getDiveSitesWithHeaders = async () => {

 const { data, error } = await supabase
  .from('diveSiteHeaderPhotos')
  .select(`
    id,
    user_id,
    dive_site_id,
    photo_path,
    selected,
    diveSites!dive_site_id (
      name
    )
  `);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data as unknown as DiveSiteWithHeader[];
  }
};

export const getDiveSitesHeadersBySiteId = async (diveSiteId: number) => {
  const { data, error } = await supabase
  .from("diveSiteHeaderPhotos")
    .select()
    .eq("dive_site_id", diveSiteId);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
      return data;
  }
};

export const clearDiveSitesHeadersBySiteId = async (diveSiteId: number) => {
const { error } = await supabase
  .from('diveSiteHeaderPhotos')
  .update({ selected: false })
  .eq('dive_site_id', diveSiteId);

if (error) {
  console.error('Error updating photos:', error);
} else {
  console.log('Successfully set selected to false for dive site:', diveSiteId);
}
};


/** The selected header row of a dive site, or null when the site has none. */
export const getExistingHeader = async (id: number): Promise<DiveSiteWithHeader | null> => {

  const { data, error } = await supabase
    .from("diveSiteHeaderPhotos")
    .select()
    .eq("dive_site_id", id)
    .eq("selected", true)

  if (error) {
    console.log("couldn't do it,", error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0] as unknown as DiveSiteWithHeader;
  }
    return null;
};


export const updateHeaderPhoto = async (id: number) => {
  const { data, error } = await supabase
    .from("diveSiteHeaderPhotos")
    .update({"selected": true})
    .eq("id", id)
    .select();

  if (error) {
    console.error("couldn't update header photo:", error);
    return null;
  }

  if (data && data.length > 0) {
    // If updating a single selected photo, return the first result
    return data[0] as unknown as DiveSiteWithHeader;
  }

  return null;
};
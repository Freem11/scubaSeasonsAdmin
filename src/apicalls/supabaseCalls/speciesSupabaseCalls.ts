import { Species, SpeciesWithImage } from "../../entities/species";
import { Photo } from "../../entities/photo";
import { supabase } from "../supabase";

export const getSpecies = async () => {

  const { data, error } = await supabase
    .from("species")
    .select("*")

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data as unknown as Species[];
  }
};


export const getSingleSpecies = async (species: string) => {
  const { data, error } = await supabase.rpc('get_single_species_with_images', {
    p_species: species
  });
  
  if (error) {
    console.log('couldn\'t do it GET_SINGLE_SPECIES,', error);
    return [];
  }

  if (data) {
    return data as unknown as SpeciesWithImage[];
  }
  
  return [];
};


export const getSpeciesPhotos = async (species: string): Promise<Photo[]> => {
  const { data, error } = await supabase
    .from("photos")
    .select()
    .eq("label", species)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
  return [];
};


/** `imageId` is null for a photo row that has no entry in public.images; the RPC receives it unchanged. */
export const updateSpeciesImage = async (speciesId: number, imageId: number | null) => {
  const { data, error } = await supabase.rpc('update_species_and_return_with_variants', {
    p_species_id: speciesId,
    p_image_id: imageId     
  });
  
  if (error) {
    console.log('couldn\'t do it UPDATE_SINGLE_SPECIES,', error);
    return [];
  }

  return data as unknown as SpeciesWithImage[];
};
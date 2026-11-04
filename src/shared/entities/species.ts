/** One row of public.species. `image_id` points to public.images; null = no header image. */
export type Species = {
  id:           number
  name:         string,
  descriptions: string,
  image_url:    string,
  created_at:   string
  image_id:     number | null
};

/**
 * A species row joined with its header image, as the RPCs
 * `get_single_species_with_images` and `update_species_and_return_with_variants` return it.
 * `public_domain` and `md` are columns of public.images.
 */
export type SpeciesWithImage = Species & {
  public_domain: string | null
  md:            string | null
};

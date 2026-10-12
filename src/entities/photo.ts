/**
 * One row of public.photos (the sea-life sightings table), with the column names
 * as the table spells them. `insertphoto` in photoSupabaseCalls.ts writes these columns.
 */
export type Photo = {
  id:         number
  created_at: string
  photoFile:  string
  label:      string
  dateTaken:  string
  latitude:   number
  longitude:  number
  month:      number | null
  UserID:     string
  userName:   string | null
  image_id:   number | null
};

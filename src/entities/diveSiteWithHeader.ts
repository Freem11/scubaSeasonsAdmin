export type DiveSiteWithHeader = {
  id: number
  user_id: string
  dive_site_id: number
  photo_path: string
  selected: boolean
  diveSites: { name: string }
};

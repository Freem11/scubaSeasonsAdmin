export type DiveSite = {
  id: number
  created_at: string
  name: string
  lat: number
  lng: number
  userid: string
  username: null | string
  newusername: string
};

export type DiveSiteWithUserName = {
  id:                   number
  name:                 string
  lat:                  number
  lng:                  number
  photo:                string
  userid:               string
  region:               string
  username:             string
  created_at:           string
  divesitebio:          string
  newusername:          string
  divesiteprofilephoto: string
};

export type DiveSiteBasic = {
  id:   number
  name: string
  lat:  number
  lng:  number
};

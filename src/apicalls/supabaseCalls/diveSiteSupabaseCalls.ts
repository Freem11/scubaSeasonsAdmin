import { supabase } from "../supabase";

export const diveSites = async (GPSBubble: any) => {

  let minLatx, maxLatx, minLngx, maxLngx;

  if (GPSBubble.minLat) {
    minLatx = GPSBubble.minLat;
    maxLatx = GPSBubble.maxLat;
    minLngx = GPSBubble.minLng;
    maxLngx = GPSBubble.maxLng;
  } else {
    minLatx = GPSBubble.southWest.latitude;
    maxLatx = GPSBubble.northEast.latitude;
    minLngx = GPSBubble.southWest.longitude;
    maxLngx = GPSBubble.northEast.longitude;
  }

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .gte('lat', minLatx)
  .gte('lng', minLngx)
  .lte('lat', maxLatx)
  .lte('lng', maxLngx)

if (error) {
  console.log("couldn't do it,", error)
  return([])
}

if (data) {
  return data
}
};

export const getSiteNamesThatFit = async (GPSBubble: any, value: string) => {

  if(value === "") {
    return [];
  }

  let minLatx, maxLatx, minLngx, maxLngx;

  if (GPSBubble.minLat) {
    minLatx = GPSBubble.minLat;
    maxLatx = GPSBubble.maxLat;
    minLngx = GPSBubble.minLng;
    maxLngx = GPSBubble.maxLng;
  } else {
    minLatx = GPSBubble.southWest.latitude;
    maxLatx = GPSBubble.northEast.latitude;
    minLngx = GPSBubble.southWest.longitude;
    maxLngx = GPSBubble.northEast.longitude;
  }

  const { data, error } = await supabase
    .from("diveSites")
    .select()
    .gte('lat', minLatx)
    .gte('lng', minLngx)
    .lte('lat', maxLatx)
    .lte('lng', maxLngx)
    .ilike("name", "%" + value + "%");

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};


export const insertDiveSite = async (values: any) => {

  const { data, error } = await supabase
  .from("diveSites")
  .insert([
    {
      name: values.name,
      lat: values.lat,
      lng: values.lng,
      UserID: values.UserID
    },
  ]);

if (error) {
  console.log("couldn't do it,", error);
}

if (data) {
  console.log(data);
}
};

export const getDiveSiteByName = async (value: string) => {

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .eq("name", value)

if (error) {
  console.log("couldn't do it 7,", error);
  return [];
}

if (data) {
  return data;
}
};

export const getDiveSiteByCoordinates = async (lat: number | undefined, lng: number | undefined) => {

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .eq("lat", lat)
  .eq("lng", lng)

if (error) {
  console.log("couldn't do it 2,", error);
  return [];
}

if (data) {
  return data;
}
};


export const updateDiveSite = async (lat: number | undefined, lng: number | undefined, photoFile: string | undefined) => {
  const { data, error } = await supabase
    .from('diveSites')
    .update({ diveSiteProfilePhoto: photoFile })
    .eq('lat', lat)
    .eq('lng', lng);

  if (error) {
    console.log('couldn\'t do it 3,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
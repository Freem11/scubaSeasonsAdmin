import { DiveSiteWithUserName } from "../../entities/diveSite";
import { GPSBubble } from "../../entities/GPSBubble";
import { Pagination } from "../../entities/pagination";
import { supabase } from "../supabase";

export const getDiveSitesBasic = async (bubble: GPSBubble) => {
  const { data, error } = await supabase
    .from('diveSites')
    .select('id,lat,lng,name')
    .gte('lat', bubble.minLat)
    .gte('lng', bubble.minLng)
    .lte('lat', bubble.maxLat)
    .lte('lng', bubble.maxLng);

  if (error || !data) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  return data as DiveSiteWithUserName[];
};

export const getDiveSitesWithUser = async (bubble: GPSBubble, filter?: Partial<DiveSiteWithUserName>, pagination?: Pagination) => {
  const builder = supabase.rpc('get_divesites_with_username', {
    max_lat: bubble.maxLat,
    min_lat: bubble.minLat,
    max_lng: bubble.maxLng,
    min_lng: bubble.minLng,
    userid:  filter?.userid ?? '',
  });

  if (pagination?.page) {
    builder.range(pagination.from(), pagination.to());
  }

  const { data, error } = await builder;

  if (error) {
    console.log('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    // console.log(data)
    return data;
  }
};

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

export const getDiveSitesByIDs = async (ids: number[]): Promise<DiveSiteWithUserName[]> => {
  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .in('id', ids);

  if (error || !data) {
    console.log('couldn\'t do it 7,', error);
    return [];
  }

  return data as DiveSiteWithUserName[];
};
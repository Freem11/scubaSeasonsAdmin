import { GPSBounds, MapArea } from "../../entities/GPSBubble";
import { supabase } from "../supabase";

/** A heat-point lookup: one species and one month inside the four bounds. No caller in this repo. */
type HeatPointQuery = GPSBounds & {
  animal: string
  month:  number
};

/**
 * The columns insertHeatPoint writes. The callers read them from a selected record through `?.`,
 * so each one can be undefined; supabase-js drops an undefined column from the payload. They pass
 * the month as the two-digit string cut from the date. `userName` is passed and not written.
 */
type HeatPointInsert = {
  animal:    string | undefined
  month:     string | undefined
  lat:       number | undefined
  lng:       number | undefined
  UserID:    string | undefined
  userName?: string | null
};

/** The row updateHeatPoint increments. No caller in this repo. */
type HeatPointWeight = {
  id:     number
  weight: number
};

export const heatPoints = async (area: GPSBounds, slider: string, animal: string) => {
  let animalVal;
  if (animal === "All") {
    animalVal = "";
  } else {
    animalVal = animal;
  }

  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .ilike("animal", "%" + animalVal + "%")
    .eq("month", slider)
    .gte("lat", area.minLat)
    .gte("lng", area.minLng)
    .lte("lat", area.maxLat)
    .lte("lng", area.maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getLoneHeatPoint = async (values: HeatPointQuery) => {
  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .eq("animal", values.animal)
    .eq("month", values.month)
    .gte("lat", values.minLat)
    .gte("lng", values.minLng)
    .lte("lat", values.maxLat)
    .lte("lng", values.maxLng)
    .limit(1);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertHeatPoint = async (values: HeatPointInsert) => {
  const { data, error } = await supabase.from("heatPoints").insert([
    {
      animal: values.animal,
      month: values.month,
      lat: values.lat,
      lng: values.lng,
      weight: 1,
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

export const updateHeatPoint = async (values: HeatPointWeight) => {
  const newWeight = values.weight + 1;

  const { data, error } = await supabase
    .from("heatPoints")
    .update({ weight: newWeight })
    .eq("id", values.id);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const multiHeatPoints = async (area: MapArea, animalArray: string[]) => {
  let minLat, maxLat, minLng, maxLng;

  if ('maxLat' in area) {
    minLat = area.minLat;
    maxLat = area.maxLat;
    minLng = area.minLng;
    maxLng = area.maxLng;
  } else {
    minLat = area.southWest.latitude;
    maxLat = area.northEast.latitude;
    minLng = area.southWest.longitude;
    maxLng = area.northEast.longitude;
  }

  let creatureList: string = "";
  if (animalArray.length === 0) {
    const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .ilike("animal", "%" + creatureList + "%")
    // .eq("month", slider)
    .gte("lat", minLat)
    .gte("lng", minLng)
    .lte("lat", maxLat)
    .lte("lng", maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }

  } else {
    animalArray.forEach((creature) => {
      if (creatureList === undefined) {
        creatureList = creature + ",";
      } else {
        creatureList = creatureList + creature + ",";
      }
    });
  
  let creatureListFinal;

  if (creatureList !== undefined) {
    creatureListFinal = creatureList.slice(0, -1);
  }

  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .filter('animal', 'in', '(' +  creatureListFinal + ')')
    // .eq("month", slider)
    .gte("lat", minLat)
    .gte("lng", minLng)
    .lte("lat", maxLat)
    .lte("lng", maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
}
 
};

export const picClickheatPoints = async (area: GPSBounds, animal: string) => {
  // console.log("HIHIHIH", GPSBubble, animal)
  let animalVal;
  if (animal === "All") {
    animalVal = "";
  } else {
    animalVal = animal;
  }

  // console.log("gogogog", GPSBubble, animalVal)

  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .ilike("animal", "%" + animalVal + "%")
    .gte("lat", area.minLat)
    .gte("lng", area.minLng)
    .lte("lat", area.maxLat)
    .lte("lng", area.maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getUpdateHeatPoints= async () => {
  const { error } = await supabase
  .from('heatPoints')
  .update({ UserID: 'dfc898dc-c02a-4f7e-b81f-48692ae6509a'})
  .eq('userName', 'Freem11')

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }
};
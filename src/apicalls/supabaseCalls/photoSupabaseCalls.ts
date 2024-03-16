import { supabase } from "../supabase";

export const getAnimalNames = async () => {
  const { data, error } = await supabase.from("photos").select("label");

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertphoto = async (values: any, monthID: number) => {
  const { data, error } = await supabase.from("photos").insert([
    {
      photoFile: values.photoFile,
      label: values.label,
      dateTaken: values.dateTaken,
      latitude: values.latitude,
      longitude: values.longitude,
      month: monthID,
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

export const getAnimalNamesThatFit = async (value: string) => {

  if(value === "") {
    return [];
  }

  const { data, error } = await supabase
    .from("photos")
    .select("label")
    .ilike("label", "%" + value + "%");

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getPhotosforAnchor = async (value: any) => {
  const { data, error } = await supabase
    .from("photos")
    .select()
    .ilike("label", "%" + value.animalVal + "%")
    // .eq("month", value.sliderVal)
    .gte("latitude", value.minLat)
    .gte("longitude", value.minLng)
    .lte("latitude", value.maxLat)
    .lte("longitude", value.maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getAnimalMultiSelect = async (text: string) => {
  const { data, error } = await supabase
    .from("photos")
    .select("id, label")
    .ilike("label", "%" + text + "%")
    .limit(10);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getPhotosforAnchorMulti = async (value: any) => {
  let creatureList: string = "";
  value.animalVal.forEach((creature: string) => {
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

  if (creatureListFinal === undefined) {
    creatureListFinal = "";
  }

  if (value.animalVal.length === 0 || value.animalVal === null) {
    const { data, error } = await supabase
      .from("photos")
      .select()
      // .ilike("userName", "%" + value.myCreatures + "%")
      // .eq("month", value.sliderVal)
      .ilike("label", "%" + creatureListFinal + "%")
      .gte("latitude", value.minLat)
      .gte("longitude", value.minLng)
      .lte("latitude", value.maxLat)
      .lte("longitude", value.maxLng)
      .order("id", { ascending: false });

    if (error) {
      console.log("couldn't do it 24,", error);
      return [];
    }

    if (data) {
      return data;
    }
  } else {
    const { data, error } = await supabase
      .from("photos")
      .select()
      .filter("label", "in", "(" + creatureListFinal + ")")
      // .ilike("userName", "%" + value.myCreatures + "%")
      // .eq("month", value.sliderVal)
      .gte("latitude", value.minLat)
      .gte("longitude", value.minLng)
      .lte("latitude", value.maxLat)
      .lte("longitude", value.maxLng)
      .order("id", { ascending: false });

    if (error) {
      console.log("couldn't do it 25,", error);
      return [];
    }

    if (data) {
      return data;
    }
  }
};

export const getPhotosforMapArea = async (value: any) => {
  const { data, error } = await supabase
    .from("photos")
    .select()
    .ilike("label", "%" + value.animal + "%")
    .gte("latitude", value.minLat)
    .gte("longitude", value.minLng)
    .lte("latitude", value.maxLat)
    .lte("longitude", value.maxLng);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getHistoData = async (values: any) => {
  if (values.animals) {
    const { data, error } = await supabase.rpc("histogram3", {
      animals: values.animals,
      max_lat: values.maxLat,
      min_lat: values.minLat,
      max_lng: values.maxLng,
      min_lng: values.minLng,
    });

    if (error) {
      console.log("couldn't do it,", error);
      return [];
    }

    if (data) {
      return data;
    }
  }
};

export const getRecentPhotos = async () => {
  const { data, error } = await supabase.rpc("three_randomz");

  if (error) {
    console.log("couldn't do it 28,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getMostRecentPhoto = async () => {
  const { data, error } = await supabase.rpc("maximum_value");

  if (error) {
    console.log("couldn't do it 29,", error);
    return [];
  }

  if (data) {
    return data;
  }
};


export const getUpdatePhotos= async () => {
  const { error } = await supabase
  .from('photos')
  .update({ userName: 'Evgeniy' })
  .eq('UserID', 'cd2a4c7f-28bc-4370-9a9c-1fb0717782ca')

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }
};


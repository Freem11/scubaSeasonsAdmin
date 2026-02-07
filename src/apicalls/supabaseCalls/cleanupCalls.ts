import { supabase } from "../supabase";

/**
 * Helper function to bypass Supabase's 1000-record limit.
 * Iterates through pages until all records are retrieved.
 */
const fetchAllRows = async (tableName, columnName) => {
  let allData = [];
  let from = 0;
  const PAGE_SIZE = 1000;

  while (true) {
    const { data, error } = await supabase
      .from(tableName)
      .select(columnName)
      .range(from, from + PAGE_SIZE - 1)
      .order('id', { ascending: true });

    if (error) {
      console.error(`Error fetching ${tableName}:`, error.message);
      // Return whatever data we managed to get before the error
      return allData;
    }

    if (!data || data.length === 0) break;

    allData = [...allData, ...data];

    // If the returned batch is smaller than the page size, we've reached the end
    if (data.length < PAGE_SIZE) break;
    
    from += PAGE_SIZE;
  }

  return allData;
};

// --- Exported Functions for Audit ---

export const getDiveSiteHeaderPhotoLinks = async () => {
  return await fetchAllRows('diveSites', 'diveSiteProfilePhoto');
};

export const getProfilePhotoLinks = async () => {
  return await fetchAllRows('UserProfiles', 'profilePhoto');
};

export const getDiveSiteReviewPhotoLinks = async () => {
  return await fetchAllRows('diveSiteReviewPhotos', 'photoPath');
};

export const getSeaLifePhotoLinks = async () => {
  const data = await fetchAllRows('photos', 'photoFile');
  console.log(`Fetched ${data.length} records from 'photos' table.`);
  return data;
};

export const getSeaLifeWaitPhotoLinks = async () => {
  return await fetchAllRows('photoWait', 'photoFile');
};
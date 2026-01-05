import { aws3 } from "../aws";
import {
    PutObjectCommand,
    DeleteObjectCommand,
    paginateListObjectsV2,
    ListObjectsV2CommandInput,
    ListObjectsV2Command
  } from "@aws-sdk/client-s3";

export const uploadphoto = async (file: any, fileName: string) => {
    const input = {
        "Body": file,
        "Bucket": "scubaseasons",
        "Key": fileName,
        "ContentType": "image/jpeg"
    }

    const command = new PutObjectCommand(input)
    const response = await aws3.send(command)
   
    if (response) {
        console.log(`Upload of photo: ${fileName} was sucessful`)
    }
  };
  
  export const removePhoto = async (values: any) => {

    const shortPath = values.fileName.split('/').pop();

    if(shortPath){
        const input = {
            "Bucket": "scubaseasons",
            "Key": shortPath
        }
    
        const command = new DeleteObjectCommand(input)
        const response = await aws3.send(command)
      
        if (response) {
            console.log(`Deletion of photo: ${shortPath} was sucessful`)
        }
    }
  
    };

    export interface PaginatedPhotoResult {
        keys: string[];
        nextContinuationToken: string | undefined;
      }
      
      export const listPhotos = async (
          pageSize: number, 
          continuationToken?: string
      ): Promise<PaginatedPhotoResult> => {
          
          const input: ListObjectsV2CommandInput = {
              Bucket: "scubaseasons",
              MaxKeys: pageSize, // Only request this many items
          };
      
          // If a token is provided, request the next page
          if (continuationToken) {
              input.ContinuationToken = continuationToken;
          }
      
          const command = new ListObjectsV2Command(input);
          
          try {
              const response = await aws3.send(command);
              
              // Extract the keys and filter out folders
              const photoKeys = response.Contents 
                  ? response.Contents
                      .filter(item => item.Key && !item.Key.endsWith('/'))
                      .map(item => item.Key as string)
                  : [];
                  
              // Return the keys and the token needed for the next request
              return {
                  keys: photoKeys,
                  nextContinuationToken: response.NextContinuationToken
              };
      
          } catch (error) {
              console.error("Error listing photos with pagination:", error);
              throw error;
          }
        };

const PAGE_SIZE = 1000; // Recommended maximum page size for R2 ListObjectsV2 for efficiency

/**
 * Fetches ALL object keys from the Cloudflare R2 bucket by automatically
 * handling pagination across all pages using the listPhotos function.
 * * NOTE: Since your cleanup logic strips paths from the DB keys, this function 
 * assumes your existing listPhotos function returns the FULL path keys from R2.
 * The comparison logic handles the matching file names.
 * * @returns A promise that resolves to an array of all non-folder object keys.
 */
// Assuming PAGE_SIZE is defined and listPhotos/PaginatedPhotoResult are imported
// in ../apicalls/cloudflareBucketCalls/cloudflareAWSCalls.ts

export const fetchAllBucketKeys = async (): Promise<string[]> => {
    let allKeys: string[] = [];
    let continuationToken: string | undefined = undefined;
    const PAGE_SIZE = 1000; // Assuming this is defined
    do {
        try {
            const result: PaginatedPhotoResult = await listPhotos(
                PAGE_SIZE, 
                continuationToken
            );
            
            const normalizedPageKeys = result.keys
                .filter((key): key is string => typeof key === 'string')
                
                // 🛑 APPLY IDENTICAL NORMALIZATION 🛑
                .map(fullKey => {
                    let key = fullKey;
                    
                    // 1. Remove all whitespace
                    key = key.replace(/\s/g, ''); 
                    
                    // 2. Strip path to get the filename
                    const parts = key.split("/");
                    key = parts.pop() || '';

                    // 3. Final, aggressive cleanup
                    key = key.replace(/[^a-z0-9._-]/gi, ''); 
                    
                    // 4. Final normalization chain
                    return key.trim().toLowerCase().normalize('NFC'); 
                })
                .filter(key => key.length > 0); 

            allKeys = allKeys.concat(normalizedPageKeys);
            continuationToken = result.nextContinuationToken;

        } catch (error) {
            console.error("Failed during paginated R2 key fetch:", error);
            throw error;
        }

    } while (continuationToken);

    return allKeys;
};
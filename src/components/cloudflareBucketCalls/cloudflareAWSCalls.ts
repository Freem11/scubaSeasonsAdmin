import { aws3 } from "../aws";
import {
    PutObjectCommand,
    DeleteObjectCommand,
  } from "@aws-sdk/client-s3";

export const uploadphoto = async (file: any, fileName: string) => {

    // console.log("got", file, fileName)

    const input = {
        "Body": file,
        "Bucket": "scubaseasons",
        "Key": fileName,
        "ContentType": "image/jpeg"
    }

    const command = new PutObjectCommand(input)
    const response = await aws3.send(command)
   
    if (response) {
        // console.log("cloudFlare", response)
        console.log(`Upload of photo: ${fileName} was sucessful`)
    //   return data.path
    }
  };
  
  export const removePhoto = async (values: any) => {

    let shortPath = values.fileName.split('/').pop();

    if(shortPath){
        const input = {
            "Bucket": "scubaseasons",
            "Key": shortPath
        }
    
        const command = new DeleteObjectCommand(input)
        const response = await aws3.send(command)
       
        // if (error) {
        //   console.log("couldn't upload,", error);
        // }
      
        if (response) {
            // console.log("cloudFlare", response)
            console.log(`Deletion of photo: ${shortPath} was sucessful`)
        }
    }
  
    };
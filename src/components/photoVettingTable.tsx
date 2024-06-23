import React, { useState, useEffect, Fragment } from "react";
import PhotoListItem from "./photoListItem";
import { photoWaits } from "../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import "./photoVetting.css"

const PhotoVettingTable = (props: any) => {
  const { animateFullScreenModal } = props;
  const [photoWait, setPhotoWait] = useState<any[]>([]);
  let photosToVett;

  useEffect(() => {
    const getPhotoWaits = async() => {
      photosToVett = await photoWaits();
      photosToVett ? setPhotoWait(photosToVett) : [];
    };

    getPhotoWaits();
  }, []);

  let list;
  if (photoWait && photoWait.length > 0) {
    list = photoWait && photoWait.map((photo) => {

      return (
        <Fragment key={photo.id}>
          <PhotoListItem
            id={photo.id}
            photoFile={photo.photoFile}
            animal={photo.label}
            date={photo.dateTaken}
            lat={photo.latitude}
            lng={photo.longitude}
            setPhotoWait={setPhotoWait}
            animateFullScreenModal={animateFullScreenModal}
          />
        </Fragment>
      );
    });
  } else {
    list = "";
  }

  return (
    <ul id="photoList">
      <div className="listHeader">
        <h3 style={{ width: "25%",  color: "white", fontSize: "2vw" }}>
          <strong>Photo</strong>
        </h3>
        <h3 style={{ width: "60%",  color: "white", fontSize: "2vw" }}>
          <strong>Information</strong>
        </h3>
        {/* <div style={{display: 'flex'}}> */}
        <h3 style={{ width: "12.5%",  color: "white", fontSize: "2vw" }}>
          <strong>Validate</strong>
        </h3>
        <h3 style={{ width: "12.5%", color: "white", fontSize: "2vw" }}>
          <strong>Reject</strong>
        </h3>
        {/* </div> */}
      </div>
      <div className="listZone">{list}</div>
    </ul>
  );
};

export default PhotoVettingTable;

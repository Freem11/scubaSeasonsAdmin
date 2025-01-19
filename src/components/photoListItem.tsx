import React, { useState, useEffect, useContext } from "react";
import { Input, Label } from "reactstrap";
import { photoWaits } from "../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertphoto } from "../apicalls/supabaseCalls/photoSupabaseCalls";
import { removePhoto } from "../apicalls/cloudflareBucketCalls/cloudflareAWSCalls";
import {
  grabPhotoWaitById,
  deletePhotoWait,
} from "../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertHeatPoint } from "../apicalls/supabaseCalls/heatPointSupabaseCalls";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./photoVetting.css";
import { SelectedPicContext } from "../contexts/selectPicContext";

const PhotoListItem = (props: any) => {
  const { id, photoFile, animal, date, lat, lng, setPhotoWait, animateFullScreenModal } = props;
  const { setSelectedPic } = useContext(SelectedPicContext);

  let photoById: any;

  const photoName = photoFile.split("/").pop();

  const ValidatePhoto = async (id: number) => {
    photoById = await grabPhotoWaitById(id);

    const monthID = photoById[0].dateTaken.slice(5, 7);

    insertHeatPoint({
      lat: formVals.lat,
      lng: formVals.lng,
      animal: formVals.animal,
      month: monthID,
      UserID: photoById[0].UserID,
      userName: photoById[0].userName,
    });

    const photoInfo = {
      photoFile: photoById[0].photoFile,
      label: formVals.animal,
      dateTaken: formVals.date,
      latitude: formVals.lat,
      longitude: formVals.lng,
      month: monthID,
      UserID: photoById[0].UserID,
      userName: photoById[0].userName,
    }

    photoById ? await insertphoto(photoInfo, monthID) : [];
    await deletePhotoWait(id);
    const photosToVett = await photoWaits();
    setPhotoWait(photosToVett);
  };

  const RejectPhoto = async (id: number) => {
    await removePhoto({ filePath: animal, fileName: photoFile });
    await deletePhotoWait(id);
    const photosToVett = await photoWaits();
    setPhotoWait(photosToVett);
  };

  const [formVals, setFormVals] = useState({
    id: id,
    key: id,
    photo: photoFile,
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
  });

  useEffect(() => {
    setFormVals({
      id: id,
      key: id,
      photo: photoFile,
      animal: animal,
      date: date,
      lat: lat,
      lng: lng,
    });
  }, [props]);

  const handleEdit = (e: any) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleModalOpen = (picture: string) => {
    setSelectedPic(picture)
    animateFullScreenModal()
  }

  return (
    <div className="listItemBody">
      <div className="photoContainer">
        <img 
          src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
          onClick={() => handleModalOpen(photoName)}
          width={"90%"}
          style={{
            borderRadius: "1vw",
            border: "1px solid grey",
            cursor: "pointer"
          }}
        />
      </div>
      <div className="infoBox">
        <div className="labelInputCombo">
          <Label className="labels">Animal: </Label>
          <Input
            id="inpt"
            onChange={handleEdit}
            onBlur={handleSubmit}
            name="animal"
            type="text"
            value={formVals.animal}
            style={{ textAlign: "center", borderTopLeftRadius: "0.7vw", borderTopRightRadius: "0.7vw"  }}
          ></Input>
        </div>
        <div className="labelInputCombo">
          <Label className="labels" style={{marginLeft: "-2px"}}>Date Taken: </Label>
          <Input
            id="inpt"
            onChange={handleEdit}
            onBlur={handleSubmit}
            name="date"
            type="date"
            // disabled={true}
            value={formVals.date && formVals.date.substring(0, 10)}
          ></Input>
        </div>
        <div className="labelInputCombo">
          <Label className="labels">Latitude: </Label>
          <Input
            id="inpt"
            onChange={handleEdit}
            onBlur={handleSubmit}
            name="lat"
            type="number"
            // disabled={true}
            value={formVals.lat}
          ></Input>
        </div>
        <div className="labelInputCombo">
          <Label className="labels">Longitude: </Label>
          <Input
            id="inpt"
            onChange={handleEdit}
            onBlur={handleSubmit}
            name="lng"
            type="number"
            // disabled={true}
            value={formVals.lng}
            style={{ borderBottomLeftRadius: "0.7vw", borderBottomRightRadius: "0.7vw"  }}
          ></Input>
        </div>
      </div>
      <div className="FABbox">
        <div className="FAB">
          <Fab color="primary" aria-label="add" style={{width: "5vw", height: "5vw"}}>
            <TaskAltIcon onClick={() => ValidatePhoto(id)} style={{width: "3vw", height: "3vw"}}/>
          </Fab>
        </div>
        <div className="FAB">
          <Fab color="secondary" aria-label="add" style={{width: "5vw", height: "5vw"}}>
            <HighlightOffIcon onClick={() => RejectPhoto(id)} style={{width: "3vw", height: "3vw"}}/>
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;

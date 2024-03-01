import { useState, useEffect, useContext } from "react";
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
import SelectedPicContext from "../contexts/selectPicContext";

const PhotoListItem = (props: any) => {
  const { id, photoFile, animal, date, lat, lng, setPhotoWait, animateFullScreenModal } = props;
  const { setSelectedPic } = useContext(SelectedPicContext);

  let photoById: any;

  let photoName = photoFile.split("/").pop();

  const ValidatePhoto = async (id: number) => {
    photoById = await grabPhotoWaitById(id);

    let monthID = photoById[0].dateTaken.slice(5, 7);

    insertHeatPoint({
      lat: formVals.lat,
      lng: formVals.lng,
      animal: formVals.animal,
      month: monthID,
      UserID: photoById[0].UserID,
      userName: photoById[0].userName,
    });

    let photoInfo = {
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
    let photosToVett = await photoWaits();
    setPhotoWait(photosToVett);
  };

  const RejectPhoto = async (id: number) => {
    await removePhoto({ filePath: animal, fileName: photoFile });
    await deletePhotoWait(id);
    let photosToVett = await photoWaits();
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

  const handleChange = (e: any) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const [imgHeigth, setImgHeigth] = useState<number>(0);
  const [imgWidth, setImgWidth] = useState<number>(0);

  const getImageDimensions = async () => {
    let containerWidth = document.getElementsByClassName("listItemBody")[0].clientWidth / 4;

    const img = new Image();
    img.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`
    const imageBitmap = await createImageBitmap(img)
    let ratio = imageBitmap.height/imageBitmap.width
    setImgWidth(containerWidth)
    setImgHeigth(containerWidth*ratio)

  };

  getImageDimensions()

  const handleModalOpen = (picture: string) => {
    setSelectedPic(picture)
    console.log(animateFullScreenModal)
    animateFullScreenModal()
  }

  return (
    <div className="listItemBody">
      <div
      className="photoContainer"
      onClick={() => handleModalOpen(photoName)}
        style={{
          backgroundImage: `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: imgWidth,
          height: imgHeigth,
          borderRadius: "1vw",
          border: "1px, solid grey",
          cursor: "pointer"
        }}
      ></div>
      <div className="infoBox">
            <div className="labelInputCombo">
               <Label className="labels">Animal: </Label>
               <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="animal"
                type="text"
                value={formVals.animal}
                style={{ textAlign: "center" }}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels" style={{marginLeft: "-2px"}}>Date Taken: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                onBlur={handleSubmit}
                name="lng"
                type="number"
                // disabled={true}
                value={formVals.lng}
              ></Input>
            </div>
          </div>
          <div className="FABbox">
             <div className="FAB">
               <Fab color="primary" aria-label="add">
                 <TaskAltIcon onClick={() => ValidatePhoto(id)} />
               </Fab>
             </div>
             <div className="FAB">
               <Fab color="secondary" aria-label="add">
                 <HighlightOffIcon onClick={() => RejectPhoto(id)} />
               </Fab>
             </div>
           </div>
    </div>
  );
};

export default PhotoListItem;

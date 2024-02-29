import { useState, useEffect } from "react";
import { Form, Input, Label } from "reactstrap";
import { photoWaits } from "../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertphoto } from "../apicalls/supabaseCalls/photoSupabaseCalls";
import { removePhoto } from "../apicalls/cloudflareBucketCalls/cloudflareAWSCalls";
import {
  grabPhotoWaitById,
  deletePhotoWait,
} from "../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import {
  insertHeatPoint,
} from "../apicalls/supabaseCalls/heatPointSupabaseCalls";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./photoVetting.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const PhotoListItem = (props: any) => {
  const { id, photoFile, animal, date, lat, lng, setPhotoWait } = props;

  let photoById: any;

  let photoName =  photoFile.split('/').pop();

  const ValidatePhoto = async (id: number) => {
    photoById = await grabPhotoWaitById(id);

    let monthID = photoById[0].dateTaken.slice(5,7);

    insertHeatPoint({
      lat: photoById[0].latitude,
      lng: photoById[0].longitude,
      animal: photoById[0].label,
      month: monthID,
      UserID: photoById[0].UserID,
      userName: photoById[0].userName,
    });

    photoById ? await insertphoto(photoById[0], monthID) : [];
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

  return (
    <li
      id={id}
      key={id}
      className="photoLI"
      style={{ listStyleType: "none" }}
    >
      <div id="photoContainer">
        <Form id="photoValidator">
          <div className="imageBox">
            <Gallery>
              <div style={{borderRadius: "10px"}}>
                <Item
                  original={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                  thumbnail={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                  width="992"
                  height="558"
                >
                  {({ ref, open }) => (
                    <img
                      style={{
                        width: "175px",
                        height: "100px",
                        marginLeft: "0%",
                        borderRadius: "10px 0px 0px 10px",
                        objectFit: "cover",
                      }}
                      ref={ref}
                      onClick={open}
                      src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                    />
                  )}
                </Item>
              </div>
            </Gallery>
          </div>
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
                style={{ textAlign: "left" }}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Date Taken: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="date"
                type="date"
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
        </Form>
      </div>
    </li>
  );
};

export default PhotoListItem;

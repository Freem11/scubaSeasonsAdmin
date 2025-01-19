import { useContext, useState } from "react";
import { FormGroup, Button } from "reactstrap";
import "./fullScreenModal.css";
import { SelectedPicContext } from "../contexts/selectPicContext";
import CloseIcon from "@mui/icons-material/Close";

const FullScreenModal = (props: any) => {
  const { animateFullScreenModal } = props;
  const { selectedPic } = useContext(SelectedPicContext);
  const [imgHeigth, setImgHeigth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const getImageDimensions = async () => {
    if (!selectedPic) {
      return;
    }

    const screenWidthInital = window.innerWidth;
    const screenHeitghInital = window.innerHeight;

    const img = new Image();
    img.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${selectedPic}`
    const imageBitmap = await createImageBitmap(img)
    const ratio = imageBitmap.height/imageBitmap.width
    const inverseRatio = imageBitmap.width/imageBitmap.height

    let newWidth;
    let newHeigth;

    if (imageBitmap.height > imageBitmap.width) {
       newHeigth = screenHeitghInital * 0.96
       newWidth =  screenHeitghInital * 0.96 * inverseRatio
    } else {
      newWidth = screenWidthInital * 0.96
      newHeigth = screenWidthInital * 0.96 * ratio
    }

    if(newHeigth > screenHeitghInital){
      setImgHeigth(screenHeitghInital*0.96)
      setImgWidth((screenHeitghInital*0.96)*inverseRatio)
    } else if (newWidth > screenWidthInital){
      setImgWidth(screenWidthInital*0.96)
      setImgHeigth((screenWidthInital*0.96)*ratio)
    } else {
      setImgWidth(newWidth)
      setImgHeigth(newHeigth)
    }
  };

  getImageDimensions()

  return (
    <div
      className="bodyDiv"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: selectedPic ? `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${selectedPic})` : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: imgWidth,
        height: imgHeigth,
      }}
    >
      <div className="closerDiv">
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => animateFullScreenModal()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", width: "2vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>
    </div>
  );
};

export default FullScreenModal;

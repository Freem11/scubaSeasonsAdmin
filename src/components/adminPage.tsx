import * as React from "react";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { animated, useSpring } from "react-spring";
import DiveSiteVetting from "./diveSiteVetting";
import PhotoVettingTable from "./photoVettingTable";
import SelectedPicContext from "../contexts/selectPicContext";
import FullScreenModal from "../modals/fullScreenModal";
import "./adminPage.css";

const AdminPage = React.memo(() => {
  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function BasicTabs(props: any) {
    const { animateFullScreenModal } = props;
    const [value, setValue] = useState<number>(0);

    const handleChange = () => {
      if (value === 0) {
        setValue(1);
      } else {
        setValue(0);
      }
    };


    return (
      <Box sx={{ width: "100%", height: "100vh"}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Animal Photo Validation" {...a11yProps(0)} />
            <Tab label="Dive Site Validation" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PhotoVettingTable animateFullScreenModal={animateFullScreenModal}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DiveSiteVetting />
        </TabPanel>
      </Box>
    );
  }

  const [fullScreenModalYCoord, setFullScreenModalYCoord] =
  useState<number>(0);

  const [selectedPic, setSelectedPic] = useState<string | null>(null);
  const fullScreenModalRef = useRef(null);
  let screenHeightInital = window.innerHeight;
  const [windowHeight, setWindowHeight] = useState(screenHeightInital);

  window.addEventListener("resize", trackScreen);

  function trackScreen() {
    setWindowHeight(window.innerHeight);
    setFullScreenModalYCoord(0);
  }
  const moveFullScreenModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${fullScreenModalYCoord}px,0)` },
  });

  const animateFullScreenModal = () => {
    let elements = document.getElementsByClassName("fullScreenModalDiv");
    if (elements.length === 0) {
      return;
    }
    let modalHeigth = elements[0].clientHeight;

    if (fullScreenModalYCoord === 0) {
      setFullScreenModalYCoord(
        -windowHeight + (windowHeight - modalHeigth) / 2
      );
    } else {
      setFullScreenModalYCoord(0);
    }
  };

  return (
    <SelectedPicContext.Provider value={{ selectedPic, setSelectedPic }}>
      <BasicTabs animateFullScreenModal={animateFullScreenModal}/>
      <animated.div
        hidden={!(selectedPic && selectedPic !== "")}
        className="fullScreenModalDiv"
        style={moveFullScreenModal}
        ref={fullScreenModalRef}
        onClick={() => setFullScreenModalYCoord(0)}
      >
        <FullScreenModal animateFullScreenModal={animateFullScreenModal} />
      </animated.div>
    </SelectedPicContext.Provider>
  );
});

export default AdminPage;

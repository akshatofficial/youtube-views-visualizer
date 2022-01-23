import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import $ from "jquery";
import ShowToast from "../Utils/Toast/Toast";
import { ERROR } from "../Utils/Toast/Types";
const Display = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [link, setLink] = useState("");

  const [duration, setDuration] = useState(null);

  const [views, setViews] = useState(0);
  const [viewsPtr, setViewsPtr] = useState(0);

//   const [viewsDisplay, setViewsDisplay] = useState("")

//   useEffect(() => {
    
//   }, viewsPtr);

  function fetchViews() {
    let video_id = link.split("v=")[1];
    let ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
      //   ShowToast(ERROR, "Please enter a valid link.");
      //   return;
    }
    // video_id = "cCbnSHs9AZE";
    console.log(video_id);

    $.getJSON(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=AIzaSyC8SPY0rwntZU3u-4Llc5hW9lZTXQZzbss`,
      function (data) {
        // console.log("viewCount: " + data.items[0].statistics.viewCount);
        setViews(data.items[0].statistics.viewCount);
        setViewsPtr((prevState) => prevState + 1);
      }
    );
  }

  const handleClick = () => {
    setViews(0);
    setViewsPtr(0);
    if (link.length < 1) {
      ShowToast(ERROR, "Video link is required!");
      return;
    }

    console.log(duration);
    if (duration === null) {
      ShowToast(ERROR, "In between duration is required!");
      return;
    }

    setInterval(fetchViews, 10000);
    fetchViews();
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          name="link"
          label="Enter the Link"
          style={{ margin: "5px" }}
          fullWidth
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <FormControl fullWidth>
          <InputLabel id="duration-select-label">Duration(min.)</InputLabel>
          <Select
            labelId="duration-select-label"
            id="duration-select"
            value={duration}
            label="Duaration(min.)"
            onChange={(e) => setDuration(e.target.value)}
          >
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Start
        </Button>
      </div>

      <div className="display">
          Views: {views}
      </div>
    </>
  );
};

export default Display;

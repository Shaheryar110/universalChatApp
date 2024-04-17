import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CountryCode } from "../Constant/code";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [cc, setCc] = useState("en");

  return (
    <div className="chat">
      <div className="chatInfo">
        <span style={{ color: "white", fontSize: "20px" }}>
          {data.user?.displayName}
        </span>
        {data.user?.displayName && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Language"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              sx={{
                borderBottom: "1px solid white",
                color: "white",
              }}
            >
              {CountryCode.map((data, index) => {
                return (
                  <MenuItem key={index} value={data.code}>
                    {data.code}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>
      <Messages />
      <Input cc={cc} />
    </div>
  );
};

export default Chat;

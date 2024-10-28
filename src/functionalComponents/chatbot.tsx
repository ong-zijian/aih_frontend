import React, { useState } from "react";
import Chats from "./chats";
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { askQuestion, askScamQuestion } from "../axios/callOpenAI";

interface ResponseBotObject {
  answer: string;
}

const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  //const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({ answer: "" });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const [options, setOptions] = useState<string>("");

  // setting next step when there's response and option click
  const setNextStep = (response: string) => {
    //setStep(prevState => prevState + 1);
    console.log("Sent user response", response);
    setSendUserResponse(response);
    setUserResponse("");

    if (options!==""){
      if (options==="How to use digibank"){
        askQuestion(response).then((response) => {
          setBotResponse(response);
        });
      } else if (options==="How to spot scams"){
        askScamQuestion(response).then((response) => {
          setBotResponse(response);
        });
      }
    } else {  
      console.log("No options selected");
    }
  };

  // const optionClick = (e: React.MouseEvent<HTMLElement>) => {
  //   let option = e.currentTarget.dataset.id;
  //   if (option) {
  //     setOptions(option);
  //     console.log("Options", option);
  //   }
  // };
  const optionClick = (option: string) => {
    console.log("Option clicked:", option);
    setOptions(option); // Update the selected option in state
  };

  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4" align="center" sx={{color: "#393e46", mt: 2}}>Chatbot</Typography>
      </Box>
      <Box>
        <Typography variant="h6" align="center" sx={{ color: "#393e46", mt: 2 }}>
          Choose a language
        </Typography>
        <FormControl component="fieldset" sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <RadioGroup
            row
            value={language}
            onChange={handleLanguageChange}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="zh" control={<Radio />} label="中文" />
            <FormControlLabel value="ta" control={<Radio />} label="தமிழ்" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Box 
          sx={{
            width: "80vw", height: "60vh", display: "flex", 
            flexDirection: "column", justifyContent: "space-between", 
            border: "0.5px solid #d8d8d8", 
            p: 2, borderRadius: 2
          }}
        >
          <Chats
            userResponse={userResponse}
            botResponse={botResponse}
            sendUserResponse={sendUserResponse}
            optionClick={optionClick}
            language={language}
          />
          <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined" value={userResponse} onChange={handleInputChange} placeholder="Write your questions here"
              sx={{width: "92%",border: "0.5px solid #e5dfdf", borderRadius: 1,"&:focus": { outline: "none"},}}/>
            <Button type="submit" 
              sx={{background: "#e5dfdf", color: "#393e46",borderRadius: 1, b: 2,
              "&:hover": {opacity: 0.8}}}>
            Send</Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;

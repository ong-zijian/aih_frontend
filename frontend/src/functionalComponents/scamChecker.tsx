import React, { useState } from "react";
import ScamCheckerChats from "./scamCheckerChats";
import { Box, TextField, Button, Typography } from "@mui/material";
import { predictScam } from "../axios/predictScam";

interface ResponseBotObject {
  predicted_label: string;
}

const ScamChecker: React.FC = () => {
    const [userResponse, setUserResponse] = useState<string>("");
    //const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({ predicted_label: "" });
    const [sendUserResponse, setSendUserResponse] = useState<string>("");
    const [messageCount, setMessageCount] = useState(0); 

    // const  testPredictScam = async (message: string) => {
    //     //const messages = "This is a test message";
    //     const response = await predictScam(message);
    //     console.log("Test route", response);
    // }
  

    const explanation: Record<'spam' | 'ham' | 'smishing', string> = {
        "spam": "it is a spam message and you should just ignore it.",
        "ham": "it is a legitimate message and you can safely respond to it.",
        "smishing": "it is a scam message sent via SMS. Do not click on any links or respond to the message."
    };
    // Setting next step when there's a response and option click
    const setNextStep = (response: string) => {
        console.log("Sent user response", response);
        setSendUserResponse(response);
        setUserResponse("");

        // Type assertion to ensure `response` is one of the keys of `explanation`
        predictScam(response).then((predictedLabel) => {
        console.log("test", predictedLabel)
        const explanationMessage = explanation[predictedLabel.predicted_label as keyof typeof explanation];
        const defaultMessage = {
            predicted_label: `#${messageCount}\n\nYour message category is ${predictedLabel.predicted_label}. This means that ${explanationMessage}\n\nDo check again with other sources like ScamShield to verify and help add to the database of scams.\nVisit [ScamShield](https://www.scamshield.gov.sg/) for more information.`
        };
        setBotResponse(defaultMessage);
        setMessageCount((count) => count + 1);
        });
    };

    const optionClick = (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
        setNextStep(option);
        }
    };

    // event handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNextStep(userResponse);
    };

  return (
    <Box>
      <Box>
        <Typography variant="h4" align="center" sx={{color: "#393e46", mt: 2}}>Scam Checker</Typography>
      </Box>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Box 
          sx={{
            width: "70vw", height: "80vh", display: "flex", 
            flexDirection: "column", justifyContent: "space-between", 
            border: "0.5px solid #d8d8d8", 
            p: 2, borderRadius: 2
          }}
        >
          <ScamCheckerChats
            userResponse={userResponse}
            botResponse={botResponse}
            sendUserResponse={sendUserResponse}
            optionClick={optionClick}
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

export default ScamChecker;

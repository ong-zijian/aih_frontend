import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks";


interface Props {
  userResponse: string;
  botResponse: { predicted_label: string };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

const ScamCheckerChats: React.FC<Props> = (props) => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);


  // Initial message handling
  useEffect(() => {
    if (messages.length === 0) {
      setMessages((prevMessages) => [
        {
          purpose: "introduction",
          message: "Hi there. I am here to help you check if the text is likely a scam. Please paste your text below.",
          sender: "bot",
        },
      ]);
    }
  }, [messages.length]);

  // Push the user's response to messages if available and not already present
  useEffect(() => {
    if (props.sendUserResponse && !messages.some(msg => msg.message === props.sendUserResponse && msg.sender === "user")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: props.sendUserResponse, sender: "user" },
      ]);
    }
  }, [props.sendUserResponse, messages]);

  // Push the bot's answer if available and not already present
  useEffect(() => {
    if (props.botResponse.predicted_label && !messages.some(msg => msg.message === props.botResponse.predicted_label && msg.sender === "bot")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: props.botResponse.predicted_label,
          sender: "bot",
        },
      ]);
    }
  }, [props.botResponse, messages]);

  // Enable autoscroll after each message
  useEffect(() => {
    if (dummyRef.current && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Box ref={bodyRef} sx={{ overflowY: "scroll", marginBottom: 2 }}>
      
      {messages.map((chat, index) => (
        <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
          <Box 
            sx={{ 
              maxWidth: 400, 
              padding: 1, 
              borderRadius: 2, 
              overflowWrap: "break-word", 
              alignSelf: chat.sender === "bot" ? "flex-start" : "flex-end", 
              bgcolor: chat.sender === "bot" ? "#090088" : "#e5dfdf", 
              color: chat.sender === "bot" ? "#f7f7f7" : "#393e46" 
            }}
          >
            <Typography sx={{ textAlign: "left" }}>
              <ReactMarkdown children={chat.message} remarkPlugins={[remarkBreaks]}/>
            </Typography>
          </Box>
          {chat.options ? (
            <Box sx={{ display: "flex", alignItems: "center", background: "white" }}>
              <Typography variant="h6" sx={{ margin: "0.7em 0.7em 0.9em 0.3em", transform: "rotate(90deg)" }}>
                <i className="far fa-hand-pointer"></i>
              </Typography>
              {chat.options.map(option => (
                <Typography
                  onClick={e => props.optionClick(e)}
                  data-id={option}
                  key={option}
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    bgcolor: "#393e46",
                    color: "#f7f7f7",
                    marginRight: 1,
                    "&:hover": {
                      opacity: 0.7,
                      cursor: "pointer",
                    },
                  }}
                >
                  {option}
                </Typography>
              ))}
            </Box>
          ) : null}
          <div ref={dummyRef} style={{ padding: "0.5em 0" }} />
        </Box>
      ))}
    </Box>
  );
};

export default ScamCheckerChats;

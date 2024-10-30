import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks";

interface Props {
  userResponse: string;
  botResponse: { answer: string };
  sendUserResponse: string;
  optionClick: (option: string) => void; 
  language: string;
  //resetChat: boolean;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chats: React.FC<Props> = (props) => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const greetings: { [key: string]: string } = {
    en: "Hi there. Hope you have a nice day. Do you want to know more about how to use digibank or how to spot scams?",
    zh: "你好。希望你今天过得愉快。您想了解如何使用数字银行还是如何识别骗局？",
    ta: "அருமை! டிஜிபேங்க் பற்றி நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?"
  };

  const greetingsDigibank: { [key: string]: string } = {
    en: "Great! What do you want to know about digibank?",
    zh: "太好了！关于数字银行您想了解什么？",
    ta: "அருமை! இது டிஜிபேங்கை எவ்வாறு பயன்படுத்த வேண்டும் என்று ஒரு வழிகாட்டு."
  };

  const greetingsScams: { [key: string]: string } = {
    en: "Great! What do you want to know about scams or phishing?",
    zh: "太好了！关于诈骗或网络钓鱼，您想了解哪些信息？",
    ta: "அருமை! மோசடிகள் அல்லது ஃபிஷிங் பற்றி நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?"
  };

  const options: { [key: string]: Array<string> } = {
    en: ["How to use digibank", "How to spot scams"],
    zh: ["如何使用数字银行", "如何识别骗局"],
    ta: ["டிஜிபேங்கை எப்படி பயன்படுத்துவது", "மோசடிகளை எப்படி கண்டறியுவது"]
  };

  const endings: { [key: string]: string } = {
    en: "Ask another question or select an option.",
    zh: "提出另一个问题或选择一个选项。",
    ta: "மற்றொரு கேள்வியை கேட்க அல்லது ஒரு விருப்பத்தைத் தேர்வு செய்க."
  };

  // Initial message handling
  useEffect(() => {
    if (messages.length === 0) {
      setInitialMessage(props.language);
    }
  }, [messages.length, props.language]);

  // Update the initial message based on language change
  useEffect(() => {
    setMessages([]);
    setInitialMessage(props.language);
  }, [props.language]);

  // useEffect(() => {
  //   if (props.resetChat) {
  //     resetChatToInitialState(props.language);
  //   }
  // }, [props.resetChat]);

  const setInitialMessage = (language: string) => {
    const initialMessage = greetings[language] || greetings.en; // Fallback to English if language is not found
    setMessages([
      {
        purpose: "introduction",
        message: initialMessage,
        options: options[language] || options.en, // Fallback to English if language is not found
        sender: "bot",
      },
    ]);
  };

  // Reset chat to the initial state when the language is changed
const resetChatToInitialState = (language: string) => {
  console.log("Resetting chat to initial state");

  // First, clear the messages
  setMessages([]);

  // Then, after clearing, set the initial message with the new language
  setTimeout(() => {
    setInitialMessage(language); // Set the initial message in the selected language
  }, 0); // Small delay to ensure the state is cleared first
};

  // Handle user option click
  const handleOptionClick = (option: string) => {
    const greetingMessage =
      option === "How to use digibank" || option === "如何使用数字银行" || option === "டிஜிபேங்கை எப்படி பயன்படுத்துவது"
        ? greetingsDigibank[props.language] || greetingsDigibank.en
        : greetingsScams[props.language] || greetingsScams.en;
  
    // Add user's option selection to the messages
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: option,
        sender: "user",
      },
      {
        message: greetingMessage,
        sender: "bot",
      },
    ]);
  
    // Call the optionClick prop with the clicked option
    props.optionClick(option);
  };

  useEffect(() => {
    resetChatToInitialState(props.language);
  }, [props.language]);
  
  useEffect(() => {
    if (props.sendUserResponse && !messages.some(msg => msg.message === props.sendUserResponse && msg.sender === "user")) {
      setMessages(prevMessages => [
        ...prevMessages,
        { message: props.sendUserResponse, sender: "user" },
      ]);
    }
    // Ensure that this useEffect runs only when sendUserResponse changes
  }, [props.sendUserResponse]);
  
  useEffect(() => {
    if (props.botResponse.answer && !messages.some(msg => msg.message === props.botResponse.answer && msg.sender === "bot")) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          message: props.botResponse.answer + "\n\n" + endings[props.language] || endings.en, // Adding endings based on language
          options: options[props.language] || options.en, // Adding options based on language
          sender: "bot",
        },
      ]);
    }
    // Ensure this only runs when the bot's response changes
  }, [props.botResponse, props.language]);

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
              color: chat.sender === "bot" ? "#f7f7f7" : "#393e46",
            }}
          >
            <Typography sx={{ textAlign: "left" }}>
              <ReactMarkdown children={chat.message} remarkPlugins={[remarkBreaks]} />
            </Typography>
          </Box>
          {chat.options ? (
            <Box sx={{ display: "flex", alignItems: "center", background: "white" }}>
              <Typography variant="h6" sx={{ margin: "0.7em 0.7em 0.9em 0.3em", transform: "rotate(90deg)" }}>
                <i className="far fa-hand-pointer"></i>
              </Typography>
              {chat.options.map(option => (
                <Typography
                  onClick={() => handleOptionClick(option)}
                  key={option}
                  sx={{
                    mt: 1,
                    padding: 1,
                    borderRadius: 2,
                    bgcolor: "#090088",
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

export default Chats;

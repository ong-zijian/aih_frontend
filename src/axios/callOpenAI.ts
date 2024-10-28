import axios from "./axios";

export const askQuestion = async (question: string) => {
    const data = {
        question: question,
    };

    const response = await axios.post("/ask", data);

    console.log(response.data); 
    return response.data;
};

export const askScamQuestion = async (question: string) => {
    const data = {
        question: question,
    };

    const response = await axios.post("/ask_scam_phishing", data);

    console.log(response.data); 
    return response.data;
};

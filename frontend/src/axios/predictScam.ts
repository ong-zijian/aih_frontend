import axios from "./axios";

export const predictScam = async (message: string) => {
    const data = {
        message: message,
    };

    const response = await axios.post("/predict_scam", data);

    console.log(response.data); 
    return response.data;
};

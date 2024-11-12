# AIH Project
As part of our AI and Humanity course, this project aims to develop a chatbot for the migrant workers to increase their knowledge of Digibank and also get them more in-tuned with their knowledge of scams and how to detect it.

This project is built with React Typescipt and uses OpenAI and Google Vertex Agent to build it.

## Frontend
Run the frontend like any normal react project.

1. Change to the right directory: `cd frontend`
2. Install the dependencies: `npm i`
3. Start the frontend: `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

!! Note: to enter the application, fill in the password: AIHpw2024!

## Backend
This is the backend for calling the 2 agents and also the model for scam detection.

1. Create a virtual environment (recommended): `python -m venv venv`
2. Activate the venv: `venv\Scripts\activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Set API key: `set OPENAI_API_KEY=<your-openai-key>`
5. Start the application: `python app.py`

Call the backend application from [http://localhost:5000](http://localhost:5000).

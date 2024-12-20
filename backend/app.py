import os
import joblib
# import faiss
# import sklearn

from flask_cors import CORS
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings  # Updated import

from langchain_community.vectorstores import FAISS

#from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

tfidf = joblib.load('tfidf_vectorizer.pkl')
rf_classifier = joblib.load('rf_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

label_mapping_inverse = {
    0: 'ham',
    1: 'smishing',
    2: 'spam'
}

def load_langchain_components(txt_file_path):
    # Load the data
    loader = TextLoader(file_path=txt_file_path, encoding="utf-8")
    data = loader.load()

    # Split the text into chunks
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    data = text_splitter.split_documents(data)

    # Create the embedding class
    embeddings = OpenAIEmbeddings(openai_api_key=os.environ['OPENAI_API_KEY'])

    # Create FAISS index from scratch every time
    vectorstore = FAISS.from_documents(data, embeddings)

    # Set up the language model and memory
    llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

    # Create the conversation chain
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        memory=memory
    )

    return conversation_chain

# Load each set of components for each file path
conversation_chain = load_langchain_components('data/POSB_Digibank_Resource.txt')
scam_phishing_conversation_chain = load_langchain_components('data/Scams_malware_phishing.txt')

@app.route('/ask', methods=['POST'])
def ask():
    query = request.json.get('question')
    if not query:
        return jsonify({"error": "Question is required."}), 400

    full_query = "Given the query below, search for the answer. If the query has only 1 answer, return the answer. Else if the query has multiple answers, follow up with another question providing the options in numbers and await for the option to be selected, then give the answer in the next prompt. Return the answer in a concise manner and in the same language as the query. Query: " + query
    result = conversation_chain({"question": full_query})
    answer = result["answer"]

    return jsonify({"answer": answer})


@app.route('/ask_scam_phishing', methods=['POST'])
def ask_scam_phishing():
    query = request.json.get('question')
    if not query:
        return jsonify({"error": "Question is required."}), 400

    full_query = "Given the query below, search for the answer and keep response concise, if there are points, return those parts in bullet points. If the query is asking for you to check if it sounds like scam, then help to determine it based on what you can infer. Return the answer back in the same language as the query. ' Query: " + query
    result = scam_phishing_conversation_chain({"question": full_query})
    answer = result["answer"]

    return jsonify({"answer": answer})


@app.route('/predict_scam', methods=['POST'])
def predict():
    # Get the input message from the request
    data = request.json
    input_message = data.get('message', '')

    # Check if input message is empty
    if not input_message:
        return jsonify({"error": "No message provided"}), 400

    input_tfidf = tfidf.transform([input_message])  # This will output a vector with features
    y_pred_encoded = rf_classifier.predict(input_tfidf)

    # Inverse encode the prediction to get the original label from the 0,1,2 encoding
    predicted_label = label_encoder.inverse_transform(y_pred_encoded)
    return jsonify({"predicted_label": label_mapping_inverse[predicted_label[0]]})

if __name__ == '__main__':
    # for local development 
    # app.run(host="0.0.0.0", port=5000, debug=True)
    # for production
    pass

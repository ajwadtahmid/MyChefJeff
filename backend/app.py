# source venv/bin/activate

import logging
import pathlib
import textwrap
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import google.generativeai as genai
from IPython.display import display, Markdown

#init generative AI model
genai.configure(api_key='GOOGLE_API_KEY_HERE')
model = genai.GenerativeModel('gemini-1.5-flash')

#config Flask app
app = Flask(__name__)
cors = CORS(app, origins='*')
chat = model.start_chat(history=[])

#config logging
logging.basicConfig(filename="chat_logs.log", level=logging.INFO, format='%(asctime)s - %(message)s')

def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

def get_recipe(message):
    prompt = f'You are MyChefJeff, an AI-driven chef. Find a recipe for: {message}'
    response = ai_chat(prompt)
    return response

def get_budget_plan(message):
    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with a budget of: {message}'
    response = ai_chat(prompt)
    return response

def ai_chat(message):
    response = chat.send_message(message)
    return response

@app.route('/api/message', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    message = data.get('message', '')

    #log incoming message
    logging.info(f'User: {message}')

    #process message
    response = ai_chat(message)

    #log AI response
    logging.info(f'AI: {response}')

    return jsonify({'response': response})

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
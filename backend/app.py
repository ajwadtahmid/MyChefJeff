# source venv/bin/activate

import pathlib
import textwrap
from flask import Flask, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from IPython.display import display, Markdown

genai.configure(api_key='GOOGLE_API_KEY_HERE')
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from Flask!'})

def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


chat = model.start_chat(history=[])

def ai_chat(message):
    response = chat.send_message(message)
    return response

# resp = ai_chat("Create a meal prep plan for a college student")
# print(resp.text)
# resp = ai_chat("Make something with high protein and without nuts")
# print(resp.text)


if __name__ == '__main__':
    app.run(debug=True)
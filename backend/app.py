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
model_j = genai.GenerativeModel('gemini-1.5-flash',
# Set the `response_mime_type` to output JSON
generation_config={"response_mime_type": "application/json"})


#config Flask app
app = Flask(__name__)
cors = CORS(app, origins='*')
chat = model.start_chat(history=[])

#user_info
user_height = 175
user_weight = 150
user_allergies = ["nuts", "shellfish"]
user_budget = 500


def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


def init_run(user_height, user_weight, user_budget, user_allergies):
    prompt = """List 10 ingredients that does not contain
    these allergens {user_allergies}. Using this JSON schema:
        Ingredients = {"ingredients": str}
    Return a `list[Ingredients]`
    """
    response = model.generate_content(prompt)

    ingredients_list = [item["ingredients"] for item in response.text]

    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with a weekly budget of: {user_budget} and that do not contain any of the ingredients, {ingredients_list}'

    response = model.generate_content(prompt)

    return ingredients_list, response


def ai_chat(message):
    global chat
    response = chat.send_message(message)
    return response


@app.route('/get_recipe', methods=['POST'])
def get_recipe():
    data = request.get_json()
    message = data.get('message')

    prompt = f'You are MyChefJeff, an AI-driven chef. Find a recipe for: {message}'
    response = ai_chat(prompt)
    return jsonify({"response": response}), 200


@app.route('/get_budget_plan', methods=['POST'])
def get_budget_plan():
    data = request.get_json()
    message = data.get('message')

    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with a budget of: {message}'
    response = ai_chat(prompt)
    return jsonify({"response": response}), 200


@app.route('/prepare_meal_plan', methods=['POST'])
def prepare_meal_plan():
    data = request.get_json()
    message = data.get('message')

    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with these ingredients : {message}'
    response = ai_chat(prompt)
    return jsonify({"response": response}), 200

@app.route('/api/message', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    message = data.get('message', '')
    message_type = data.get('type', 'general')

    #log incoming message
    logging.info(f'User: {message}')

    #process message
    response = ai_chat(message)

    #log AI response
    logging.info(f'AI: {response}')

    # Process message based on type
    if message_type == 'Plan':
        response = prepare_meal_plan(message)
    elif message_type == 'Budget':
        response = get_budget_plan(message)
    elif message_type == 'Recipie':
        response = get_recipe(message)
    else:
        response = ai_chat(message)

    return jsonify({'response': response})

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
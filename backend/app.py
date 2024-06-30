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
genai.configure(api_key='AIzaSyCDvk2x357mxzRVo2f0INMdj2D6HbS9ftE')
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
user_allergies = {"nuts", "shellfish"}
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
    return response.text


def get_recipe(message):

    prompt = f'You are MyChefJeff, an AI-driven chef. Find one recipe for: {message}. Do not exceed 600 charecters.'
    response = ai_chat(prompt)
    response


def get_budget_plan(message):

    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with a budget of: {message}. Make it a list and do not exceed 600 charecters.'
    response = ai_chat(prompt)
    return response


def prepare_meal_plan(message):

    prompt = f'You are MyChefJeff, an AI-driven chef. Create a weekly meal plan with these ingredients : {message}. Keep it concise'
    response = ai_chat(prompt)
    return response


@app.route('/api/message', methods=['POST'])
def chat_endpoint():
    try:
        data = request.get_json()
        message = data.get('message', '')
        message_type = data.get('type', 'general')

        # Log incoming message
        logging.info(f'User: {message}')

        # Process message based on type
        if message_type == 'recipe':
            response = get_recipe(message)
        elif message_type == 'budget':
            response = get_budget_plan(message)
        else:
            response = ai_chat(message)

        # Log AI response
        logging.info(f'AI: {response}')

        # Return JSON response
        return jsonify({'response': response}), 200

    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500


if __name__ == '__main__':
    app.run(port=8000, debug=True)
 #source venv/bin/activate

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


def to_markdown(text):
    """
    Converts text to Markdown format.

    Args:
    text (str): Text content to convert.

    Returns:
    IPython.display.Markdown: Markdown formatted text.
    """
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


def ai_chat(message, reset=False):
    """
    Sends a message to the AI model for processing.

    Args:
    message (str): User message to send to the AI.
    reset (bool, optional): Whether to reset the chat history of the AI model. Defaults to False.

    Returns:
    str: Response from the AI model.
    """
    global chat
    if reset:
        chat = model.start_chat(history=[])
        
    response = chat.send_message(message)
    return response.text


def get_recipe(message):
    """
    Generates a recipe based on user's request.

    Args:
    message (str): User's request for a recipe.

    Returns:
    str: Response from the AI model containing the recipe.
    """
    prompt = f'You are MyChefJeff, an AI-driven chef. Find one recipe for: {message}. Be short and concise, but provide a price breakdown.'
    response = ai_chat(prompt)
    response


def get_budget_plan(message):
    """
    Generates a meal plan based on user's budget.

    Args:
    message (str): User's budget for the meal plan.

    Returns:
    str: Response from the AI model containing the meal plan.
    """
    prompt = f'You are MyChefJeff, an AI-driven chef. Create a meal plan with a budget of: {message}. Be short and concise.'
    response = ai_chat(prompt)
    return response


def prepare_meal_plan(message):
    """
    Generates a weekly meal plan based off of user's choice of ingredients.

    Args:
    message (str): User's choice of ingredients.

    Returns:
    str: Response from the AI model containing the meal plan.
    """
    prompt = f'You are MyChefJeff, an AI-driven chef. Create a weekly meal plan with these ingredients : {message}. Keep it concise'
    response = ai_chat(prompt)
    return response


@app.route('/api/message', methods=['POST'])
def chat_endpoint():
    """
    Endpoint for handling incoming chat messages from the frontend.

    This function processes incoming JSON data containing a message,
    message type, and optionally a reset flag. Depending on the message type,
    it delegates processing to specific functions: get_recipe, get_budget_plan,
    or ai_chat. It logs incoming messages and AI responses.

    Returns a JSON response containing the AI's generated response or an error
    message if an exception occurs during processing.

    Returns:
    JSON: A JSON object containing the AI's response or an error message.
    """
    try:
        data = request.get_json()
        message = data.get('message', '')
        message_type = data.get('type', 'general')
        reset = data.get('reset', False)

        # Log incoming message
        logging.info(f'User: {message}')

        # Process message based on type and reset status
        if message_type == 'recipe':
            response = get_recipe(message)
        elif message_type == 'budget':
            response = get_budget_plan(message)
        else:
            response = ai_chat(message, reset=reset)

        # Log AI response
        logging.info(f'AI: {response}')

        # Return JSON response
        return jsonify({'response': response}), 200

    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
// @ts-nocheck
const vscode = require('vscode');
const openai = require('openai');

api_key = "YOUR_API_KEY_HERE"
model = "text-davinci-002"

openai.api_key = api_key

function get_recommendation(error_messages) {
    prompt = "Troubleshoot the following errors:\n"
    for (error_message of error_messages) {
        prompt += error_message + "\n"
    }
    response = openai.Completion.create(engine=model, prompt=prompt, max_tokens=1024)
    recommendation = response["choices"][0]["text"]
    return recommendation
}



function activate(context) {
    console.log('Congratulations, your extension "gpt-error-fix-recommender-42" is now active!');

    api_key = vscode.window.showInputBox({
        prompt: "Please enter your OpenAI API key:",
        placeHolder: "API key"
    })

    openai.api_key = api_key

    let disposable = vscode.commands.registerCommand('gpt-error-fix-recommender-42.recommendFix', function () {
        error_messages = vscode.window.createOutputChannel("error").display.slice(-10)
        recommendation = get_recommendation(error_messages)
        vscode.window.showInformationMessage(recommendation)
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}

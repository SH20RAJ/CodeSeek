const { OpenAI } = require("openai");

/**
 * This is a test file for DeepSeek API connection.
 * To use this file:
 * 1. Add your API key below
 * 2. Run with Node.js: node connect.js
 */

async function main() {
  // Add your API key here
  const apiKey = "YOUR_API_KEY_HERE";

  if (apiKey === "YOUR_API_KEY_HERE") {
    console.error("Please add your DeepSeek API key to this file before running.");
    return;
  }

  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com/v1/",
    apiKey: apiKey,
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "deepseek-chat",
    });

    console.log("API Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("API Error:", error.message);
  }
}

main();

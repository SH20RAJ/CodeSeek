const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1/",
  apiKey: "sk-68664ab00493458793483e10b250d7b8",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();

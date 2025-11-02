require("dotenv").config();
const axios = require("axios");

(async () => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not found in .env");
    console.log("Loaded API Key:", apiKey);

    // Optional test GET request
    await axios
      .get("https://example.com")
      .then(() => console.log("Example.com test GET succeeded"));

    // Test Groq API call
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Hello! It seems like you are a student of Piyush Academy, right? I'm here to help you with any questions or concerns you may have, so feel free to ask! What's on your mind today?",
          },
          { role: "user", content: "Hello AI!" },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      " Groq AI Reply:",
      response.data?.choices?.[0]?.message?.content || "No reply"
    );
  } catch (err) {
    console.error(" Groq API Error:", err.response?.data || err.message);
  }
})();

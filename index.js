const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

console.log(" Groq Key Loaded:", process.env.GROQ_API_KEY ? "Yes" : "No");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/scripts", express.static(path.join(__dirname, "public", "scripts")));
app.use("/styles", express.static(path.join(__dirname, "public", "styles")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "about.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "services.html"));
});

app.get("/achievements", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "achievements.html"));
});

app.get("/business", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "business.html"));
});

app.get("/clients", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "clients.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "skills.html"));
});

app.get("/certifications", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "certifications.html"));
});

app.get("/testimonials", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "testimonials.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "contact.html"));
});

app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "blog.html"));
});

// Chatbot API
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a helpful AI assistant representing **Piyush Katyayan**, the Founder of Piyush Academy.

Here’s some background about him that you must use in your responses:

- Full Name: **Piyush Katyayan**
- Profession: **Tech Community Leader, Microsoft Certified Trainer, and Serial Entrepreneur**
- Founder of: **Piyush Academy**, **GoLocal Bazar**, and **RoboAviate**
- Experience: **17+ years** in Information Technology
- Expertise: **Cloud Computing, Azure, AWS, DevOps, Data Engineering, Full Stack Development, and Corporate Training**
- Location: **Jamshedpur, Jharkhand, India**
- Achievements: Trained **2500+ professionals**, **Speaker & Mentor** in AI and Startup events.
- Services: Career Coaching, Corporate Training, IT Consulting, Project Management, and Educational Consulting.
- Website: **https://piyushacademy.com**

When users ask about Piyush Sir, his academy, or his expertise, always respond professionally and clearly using this data.
            `,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data?.choices?.[0]?.message?.content;
    res.json({
      reply: aiReply || "Sorry, I couldn't fetch an answer right now.",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.json({ reply: "Sorry, something went wrong with the AI service." });
  }
});

app.get("/index", (req, res) => res.redirect("/"));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "templates", "index.html"));
});

app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);

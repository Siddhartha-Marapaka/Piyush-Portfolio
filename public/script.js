const API_URL = "/api/chat";

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  const messagesDiv = document.getElementById("chatMessages");

  const userDiv = document.createElement("div");
  userDiv.className = "msg user";
  userDiv.textContent = message;
  messagesDiv.appendChild(userDiv);
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "msg bot";
  typing.textContent = "Typing...";
  messagesDiv.appendChild(typing);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    typing.remove();

    const botDiv = document.createElement("div");
    botDiv.className = "msg bot";
    botDiv.textContent = data.reply || "No reply from AI.";
    messagesDiv.appendChild(botDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    console.error(err);
    typing.textContent = "⚠️ Error connecting to server";
  }
}
